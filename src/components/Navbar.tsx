import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Acasă', path: '/' },
  { label: 'Servicii', path: '/servicii' },
  { label: 'Despre', path: '/despre' },
  { label: 'Certificări', path: '/certificari' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-copper focus:text-void focus:font-semibold focus:rounded"
      >
        Sari la conținut
      </a>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          height: '72px',
        }}
      >
        <div className="content-max-width flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl font-medium tracking-wide"
            style={{ color: '#f5f0eb' }}
          >
            CESS
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative font-body text-sm tracking-wide transition-colors duration-300 group"
                style={{
                  color: location.pathname === link.path ? '#c9a87c' : '#94a3b8',
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: '#c9a87c' }}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden lg:inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-6 py-3 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: '#c9a87c',
              color: '#000000',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4b896'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,124,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#c9a87c'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Consultație Gratuită
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={24} color="#f5f0eb" />
            ) : (
              <Menu size={24} color="#f5f0eb" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-display text-2xl transition-colors duration-300"
              style={{
                color: location.pathname === link.path ? '#c9a87c' : '#f5f0eb',
                animationDelay: `${i * 0.08}s`,
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-4 font-body text-sm font-semibold uppercase tracking-[0.1em] px-8 py-4"
            style={{ backgroundColor: '#c9a87c', color: '#000000' }}
            onClick={() => setMobileOpen(false)}
          >
            Consultație Gratuită
          </Link>
        </div>
      )}
    </>
  )
}
