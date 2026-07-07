import { Link } from 'react-router'
import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react'

const quickLinks = [
  { label: 'Servicii', path: '/servicii' },
  { label: 'Despre noi', path: '/despre' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

const legalLinks = [
  { label: 'Termeni și condiții', path: '/termeni' },
  { label: 'Politica de confidențialitate', path: '/confidentialitate' },
  { label: 'Politica Cookie', path: '/cookie' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000000' }}>
      {/* Top area */}
      <div className="content-max-width pt-24 md:pt-32 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Brand */}
          <div>
            <Link to="/" className="font-display text-2xl font-medium" style={{ color: '#f5f0eb' }}>
              CESS
            </Link>
            <p className="font-body text-sm mt-3" style={{ color: '#94a3b8' }}>
              Centrul Externalizat pentru Servicii Suport Administrative și Legale
            </p>
            <p
              className="font-body text-xs font-semibold uppercase mt-4"
              style={{ color: '#c9a87c', letterSpacing: '0.08em' }}
            >
              CREATIVITATE. EFICIENȚĂ. TEHNOLOGIE.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase mb-4" style={{ color: '#f5f0eb', letterSpacing: '0.08em' }}>
              Linkuri utile
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-sm transition-colors duration-300 hover:underline"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a87c' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase mb-4" style={{ color: '#f5f0eb', letterSpacing: '0.08em' }}>
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-sm transition-colors duration-300 hover:underline"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a87c' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase mb-4" style={{ color: '#f5f0eb', letterSpacing: '0.08em' }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+40723926446"
                  className="font-body text-sm flex items-center gap-2 transition-colors duration-300"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a87c' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
                >
                  <Phone size={14} />
                  +40 723 926 446
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@cess.ro"
                  className="font-body text-sm flex items-center gap-2 transition-colors duration-300"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a87c' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
                >
                  <Mail size={14} />
                  contact@cess.ro
                </a>
              </li>
              <li>
                <span className="font-body text-sm flex items-start gap-2" style={{ color: '#94a3b8' }}>
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  Strada Viitorului 4, Bloc 4B, Constanța
                </span>
              </li>
              <li className="flex items-center gap-4 pt-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61578833986926"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a87c' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/company/108608033/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a87c' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
                >
                  <Linkedin size={18} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="content-max-width">
        <div style={{ borderTop: '1px solid #262626' }} />
      </div>

      {/* Bottom bar */}
      <div className="content-max-width py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <img
              src="/eu-pnrr-logo.png"
              alt="PNRR - Finanțat de Uniunea Europeană"
              className="h-10 w-auto object-contain"
            />
            <span className="font-body text-xs text-center sm:text-left" style={{ color: '#94a3b8' }}>
              PNRR. Finanțat de Uniunea Europeană – Următoarea Generație UE
            </span>
          </div>
          <span className="font-body text-xs" style={{ color: '#94a3b8' }}>
            © 2025 CESS TRUST S.R.L. CUI: 37449212
          </span>
          <a
            href="https://amiedwmsolutions.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs transition-colors duration-300"
            style={{ color: '#94a3b8' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#c9a87c' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
          >
            CESS.ro Creat cu drag de Amied Wm Solutions
          </a>
        </div>

        {/* ANPC Badges — image + text links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
          <a
            href="https://reclamatiisal.anpc.ro/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/anpc-sol.png"
              alt="ANPC SOL - Soluționarea alternativă a litigiilor"
              className="h-12 w-auto object-contain"
            />
          </a>
          <a
            href="https://consumer-redress.ec.europa.eu/index_ro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/anpc-litigii.png"
              alt="ANPC - European Online Dispute Resolution"
              className="h-12 w-auto object-contain"
            />
          </a>
        </div>

        {/* ANPC Text Link Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <a
            href="https://reclamatiisal.anpc.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs font-semibold uppercase tracking-wider px-4 py-2 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              color: '#c9a87c',
              border: '1px solid #c9a87c',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c9a87c'
              e.currentTarget.style.color = '#000000'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#c9a87c'
            }}
          >
            Soluționarea alternativă a litigiilor
          </a>
          <a
            href="https://consumer-redress.ec.europa.eu/index_ro"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs font-semibold uppercase tracking-wider px-4 py-2 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              color: '#c9a87c',
              border: '1px solid #c9a87c',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c9a87c'
              e.currentTarget.style.color = '#000000'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#c9a87c'
            }}
          >
            Soluționarea online a litigiilor
          </a>
        </div>
      </div>
    </footer>
  )
}
