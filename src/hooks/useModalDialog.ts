import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ')

const IGNORED_TAGS = new Set(['SCRIPT', 'STYLE', 'LINK', 'META', 'NOSCRIPT', 'TEMPLATE'])

interface InertSnapshot {
  hadInert: boolean
  prevAriaHidden: string | null
  count: number
}

const inertCounts = new WeakMap<HTMLElement, InertSnapshot>()
let scrollLockCount = 0
let prevBodyOverflow = ''

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      el.getAttribute('aria-hidden') !== 'true' &&
      !el.closest('[inert]') &&
      (el.offsetParent !== null || el.getClientRects().length > 0),
  )
}

function findBodyChild(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element
  while (current && current.parentElement !== document.body) {
    current = current.parentElement
  }
  return current
}

export interface UseModalDialogOptions {
  isOpen: boolean
  dialogRef: RefObject<HTMLElement | null>
  initialFocusRef?: RefObject<HTMLElement | null>
  returnFocusRef?: RefObject<HTMLElement | null>
  onClose: () => void
}

/**
 * Manages modal dialog accessibility: body scroll lock, background inerting,
 * initial focus placement, Tab/Shift+Tab focus trapping, Escape dismissal,
 * and focus restoration on close.
 */
export function useModalDialog({
  isOpen,
  dialogRef,
  initialFocusRef,
  returnFocusRef,
  onClose,
}: UseModalDialogOptions) {
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return undefined
    const dialog = dialogRef.current
    if (!dialog) return undefined

    const previousFocus =
      returnFocusRef?.current ??
      (document.activeElement instanceof HTMLElement ? document.activeElement : null)

    if (scrollLockCount === 0) {
      prevBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    scrollLockCount += 1

    const focusInitial = () => {
      const target = initialFocusRef?.current ?? getFocusableElements(dialog)[0] ?? dialog
      target.focus()
    }

    // Move focus into the dialog before marking background elements inert/aria-hidden.
    focusInitial()

    const topAncestor = findBodyChild(dialog)
    const lockedElements: HTMLElement[] = []

    for (const child of Array.from(document.body.children)) {
      if (
        !(child instanceof HTMLElement) ||
        child === topAncestor ||
        IGNORED_TAGS.has(child.tagName)
      ) {
        continue
      }

      const existing = inertCounts.get(child)
      if (existing) {
        existing.count += 1
      } else {
        inertCounts.set(child, {
          hadInert: child.inert,
          prevAriaHidden: child.getAttribute('aria-hidden'),
          count: 1,
        })
        child.inert = true
        child.setAttribute('aria-hidden', 'true')
      }
      lockedElements.push(child)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusableElements(dialog)
      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      if (focusable.length === 1) {
        event.preventDefault()
        focusable[0].focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement instanceof HTMLElement ? document.activeElement : null

      if (event.shiftKey) {
        if (active === first || !active || !dialog.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else if (active === last || !active || !dialog.contains(active)) {
        event.preventDefault()
        first.focus()
      }
    }

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target
      if (target instanceof HTMLElement && !dialog.contains(target)) {
        focusInitial()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)

      for (const el of lockedElements) {
        const snapshot = inertCounts.get(el)
        if (!snapshot) continue
        snapshot.count -= 1
        if (snapshot.count <= 0) {
          inertCounts.delete(el)
          el.inert = snapshot.hadInert
          if (snapshot.prevAriaHidden === null) {
            el.removeAttribute('aria-hidden')
          } else {
            el.setAttribute('aria-hidden', snapshot.prevAriaHidden)
          }
        }
      }

      scrollLockCount = Math.max(0, scrollLockCount - 1)
      if (scrollLockCount === 0) {
        document.body.style.overflow = prevBodyOverflow
      }

      if (previousFocus && previousFocus.isConnected) {
        previousFocus.focus()
      }
    }
  }, [isOpen, dialogRef, initialFocusRef, returnFocusRef])
}
