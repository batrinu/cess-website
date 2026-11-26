import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="https://wa.me/+40723926446"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactează-ne pe WhatsApp"
      aria-hidden={!visible || undefined}
      tabIndex={visible ? undefined : -1}
      className={cn(
        'group fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1.5 transition-all duration-500 sm:bottom-6 sm:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <span className="rounded-[2px] bg-wa-bg px-2.5 py-1 font-body text-xs font-semibold text-wa-ink shadow-sm">
        Contactează-ne!
      </span>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-wa-bg text-wa-ink shadow-md transition-transform duration-200 group-hover:scale-105 group-hover:shadow-lg">
        <MessageCircle size={24} strokeWidth={2.2} className="text-wa-ink" aria-hidden="true" />
      </span>
    </a>
  )
}
