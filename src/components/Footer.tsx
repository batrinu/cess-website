import { Link } from 'react-router'
import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react'
import Container from '@/components/site/Container'

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
    <footer className="bg-navy text-on-dark" data-surface="dark">
      <Container>
        <h2 className="sr-only">Informații și navigare</h2>

        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              to="/"
              className="inline-block font-display text-2xl font-medium tracking-[-0.03em] text-on-dark"
            >
              CESS
            </Link>
            <p className="mt-3 max-w-[38ch] font-body text-sm leading-6 text-on-dark-muted">
              Centrul Externalizat pentru Servicii Suport Administrative și Legale
            </p>
            <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.08em] text-copper-light">
              CREATIVITATE. EFICIENȚĂ. TEHNOLOGIE.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-on-dark">
              Linkuri utile
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-block py-1 font-body text-sm text-on-dark-muted underline-offset-4 transition-colors duration-200 hover:text-on-dark hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-on-dark">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-block py-1 font-body text-sm text-on-dark-muted underline-offset-4 transition-colors duration-200 hover:text-on-dark hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-on-dark">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="tel:+40723926446"
                  className="inline-flex items-center gap-2.5 py-1 font-body text-sm tabular-nums text-on-dark-muted transition-colors duration-200 hover:text-on-dark"
                >
                  <Phone size={15} className="shrink-0 text-copper-light" aria-hidden="true" />
                  <span>+40 723 926 446</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@cess.ro"
                  className="inline-flex items-center gap-2.5 py-1 font-body text-sm text-on-dark-muted transition-colors duration-200 hover:text-on-dark"
                >
                  <Mail size={15} className="shrink-0 text-copper-light" aria-hidden="true" />
                  <span>contact@cess.ro</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 py-1 font-body text-sm leading-6 text-on-dark-muted">
                  <MapPin size={15} className="mt-1 shrink-0 text-copper-light" aria-hidden="true" />
                  <span>Strada Viitorului 4, Bloc 4B, Constanța</span>
                </span>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61578833986926"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pagina de Facebook CESS"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-rule-dark text-on-dark-muted transition-colors hover:border-copper-light hover:text-on-dark"
                >
                  <Facebook size={18} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/company/108608033/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pagina de LinkedIn CESS"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-rule-dark text-on-dark-muted transition-colors hover:border-copper-light hover:text-on-dark"
                >
                  <Linkedin size={18} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rule-dark pt-8 pb-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <img
                src="/eu-pnrr-logo.png"
                alt="PNRR - Finanțat de Uniunea Europeană"
                className="h-10 w-auto object-contain"
              />
              <span className="text-center font-body text-xs text-on-dark-muted sm:text-left">
                PNRR. Finanțat de Uniunea Europeană – Următoarea Generație UE
              </span>
            </div>
            <span className="font-body text-xs tabular-nums text-on-dark-muted">
              © 2026 CESS TRUST S.R.L. CUI: 37449212
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
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

          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://reclamatiisal.anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 font-body text-xs text-on-dark-muted underline underline-offset-4 transition-colors hover:text-on-dark"
            >
              Soluționarea alternativă a litigiilor
            </a>
            <a
              href="https://consumer-redress.ec.europa.eu/index_ro"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 font-body text-xs text-on-dark-muted underline underline-offset-4 transition-colors hover:text-on-dark"
            >
              Soluționarea online a litigiilor
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
