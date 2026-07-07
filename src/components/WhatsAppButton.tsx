import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

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
      className={
        'fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1 transition-all duration-500 ' +
        (visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none')
      }
      aria-label="Contactează-ne pe WhatsApp"
    >
      <span
        className="font-body text-xs font-medium px-2 py-1 rounded"
        style={{
          backgroundColor: '#25D366',
          color: '#ffffff',
        }}
      >
        Contactează-ne!
      </span>
      <div
        className="rounded-full p-3.5 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        style={{ backgroundColor: '#25D366' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <MessageCircle size={28} color="#ffffff" fill="#ffffff" />
      </div>
    </a>
  )
}
