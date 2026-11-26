import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Container from '@/components/site/Container'
import ActionLink from '@/components/site/ActionLink'
import { useModalDialog } from '@/hooks/useModalDialog'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Acasă', path: '/' },
  { label: 'Servicii', path: '/servicii' },
  { label: 'Despre', path: '/despre' },
  { label: 'Certificări', path: '/certificari' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

function isRouteActive(pathname: string, linkPath: string) {
  if (linkPath === '/blog') {
    return pathname === '/blog' || pathname.startsWith('/blog/')
  }
  return pathname === linkPath
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const toggleBtnRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const drawerCloseBtnRef = useRef<HTMLButtonElement>(null)

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false)
      }
    }
    mql.addEventListener('change', handleMediaChange)
    return () => mql.removeEventListener('change', handleMediaChange)
  }, [])

  useModalDialog({
    isOpen: mobileOpen,
    dialogRef: drawerRef,
    initialFocusRef: drawerCloseBtnRef,
    returnFocusRef: toggleBtnRef,
    onClose: closeMobile,
  })

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2 focus:bg-navy focus:text-on-dark focus:font-semibold focus:rounded-[2px]"
      >
        Sari la conținut
      </a>

      <nav
        aria-label="Navigare principală"
        className={cn(
          'fixed inset-x-0 top-0 z-[60] border-b transition-colors duration-300',
          scrolled
            ? 'border-rule bg-alabaster/95 shadow-[0_8px_30px_rgba(20,29,38,0.06)] backdrop-blur-md'
            : 'border-transparent bg-alabaster',
        )}
      >
        <Container className="flex h-[72px] items-center justify-between md:h-20">
          <Link
            to="/"
            className="font-display text-[1.95rem] font-medium leading-none tracking-[-0.04em] text-navy"
          >
            CESS
          </Link>

          <div className="hidden items-center gap-5 md:flex xl:gap-8">
            {navLinks.map((link) => {
              const isActive = isRouteActive(location.pathname, link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group relative inline-flex min-h-[44px] items-center whitespace-nowrap font-body text-sm tracking-wide transition-colors duration-200',
                    isActive ? 'font-medium text-navy' : 'text-ink-muted hover:text-navy',
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute bottom-2 left-0 h-[2px] bg-copper transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full',
                    )}
                  />
                </Link>
              )
            })}
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            <ActionLink
              href="https://app.cess.ro"
              target="_blank"
              variant="secondary"
              className="hidden min-h-[44px] whitespace-nowrap px-4 py-2.5 lg:inline-flex"
            >
              Demo Aplicație
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only"> (se deschide într-o filă nouă)</span>
            </ActionLink>
            <ActionLink
              to="/contact"
              className="min-h-[44px] whitespace-nowrap px-5 py-2.5"
            >
              Consultație Gratuită
            </ActionLink>
          </div>

          <button
            ref={toggleBtnRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-navy md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Închide meniul' : 'Deschide meniul'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </Container>
      </nav>

      {mobileOpen
        ? createPortal(
            <div
              ref={drawerRef}
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigare principală"
              tabIndex={-1}
              className="fixed inset-0 z-[70] flex flex-col bg-alabaster text-ink md:hidden"
            >
              <div className="border-b border-rule">
                <Container className="flex h-[72px] items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="font-display text-[1.95rem] font-medium leading-none tracking-[-0.04em] text-navy"
                  >
                    CESS
                  </span>
                  <button
                    ref={drawerCloseBtnRef}
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center text-navy"
                    onClick={closeMobile}
                    aria-label="Închide meniul"
                  >
                    <X size={24} aria-hidden="true" />
                  </button>
                </Container>
              </div>

              <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-10">
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => {
                    const isActive = isRouteActive(location.pathname, link.path)
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'inline-flex min-h-[44px] items-center font-display text-3xl transition-colors duration-200',
                          isActive ? 'text-copper-ink' : 'text-ink hover:text-navy',
                        )}
                        onClick={closeMobile}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <ActionLink
                    href="https://app.cess.ro"
                    target="_blank"
                    variant="secondary"
                    className="w-full"
                    onClick={closeMobile}
                  >
                    Demo Aplicație
                    <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> (se deschide într-o filă nouă)</span>
                  </ActionLink>
                  <ActionLink
                    to="/contact"
                    className="w-full"
                    onClick={closeMobile}
                  >
                    Consultație Gratuită
                  </ActionLink>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
