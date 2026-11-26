import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowUp, ChevronDown } from 'lucide-react'
import Container from '@/components/site/Container'
import ActionLink from '@/components/site/ActionLink'
import Reveal from '@/components/site/Reveal'
import { cn } from '@/lib/utils'

interface LegalSection {
  id: string
  title: string
  content: ReactNode
}

const sections: LegalSection[] = [
  {
    id: 'cine-suntem',
    title: '1. Cine suntem',
    content:
      'CESS TRUST S.R.L., CUI 37449212, cu sediul în Strada Viitorului 4, Bloc 4B, Constanța, România, email: contact@cess.ro, telefon: +40 723 926 446. Suntem operator de date cu caracter personal înregistrat la ANSPDRC.',
  },
  {
    id: 'ce-date-colectam',
    title: '2. Ce date colectăm',
    content:
      'Colectăm următoarele categorii de date: date de identificare (nume, prenume), date de contact (email, telefon, adresă), date profesionale (funcție, companie), date tehnice (adresă IP, tip browser, sistem de operare), și orice alte date pe care ni le furnizați voluntar prin formularul de contact.',
  },
  {
    id: 'scopurile-prelucrarii',
    title: '3. Scopurile prelucrării',
    content:
      'Datele sunt prelucrate în următoarele scopuri: furnizarea serviciilor solicitate, comunicarea cu dvs., transmiterea de informații și newslettere (cu consimțământ), îmbunătățirea serviciilor, respectarea obligațiilor legale.',
  },
  {
    id: 'temeiul-legal',
    title: '4. Temeiul legal',
    content:
      'Prelucrarea datelor se bazează pe: executarea unui contract sau la cererea dvs. premergătoare încheierii acestuia, consimțământul dvs., obligații legale, interese legitime.',
  },
  {
    id: 'stocarea-datelor',
    title: '5. Stocarea datelor',
    content:
      'Datele sunt stocate pe servere securizate în Uniunea Europeană. Păstrăm datele doar atât timp cât este necesar pentru scopurile prelucrării sau cât ne obligă legea.',
  },
  {
    id: 'securitatea-datelor',
    title: '6. Securitatea datelor',
    content:
      'Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor împotriva accesului neautorizat, pierderii sau distrugerii.',
  },
  {
    id: 'drepturile-tale',
    title: '7. Drepturile tale',
    content:
      'Conform Regulamentului (UE) 2016/679 (GDPR), aveți următoarele drepturi: dreptul de acces, dreptul la rectificare, dreptul la ștergerea datelor ("dreptul de a fi uitat"), dreptul la restricționarea prelucrării, dreptul la portabilitatea datelor, dreptul la opoziție, dreptul de a nu face obiectul unei decizii bazate exclusiv pe prelucrarea automată. Pentru exercitarea acestor drepturi, contactați-ne la contact@cess.ro.',
  },
  {
    id: 'cookie-uri',
    title: '8. Cookie-uri',
    content: (
      <>
        Site-ul utilizează cookie-uri. Pentru mai multe informații, consultați{' '}
        <Link
          to="/cookie"
          className="font-medium text-copper-ink underline underline-offset-4 hover:text-navy"
        >
          Politica Cookie
        </Link>
        .
      </>
    ),
  },
  {
    id: 'modificari',
    title: '9. Modificări',
    content:
      'Ne rezervăm dreptul de a actualiza această politică. Modificările vor fi publicate pe această pagină cu data actualizării.',
  },
]

export default function Confidentialitate() {
  const [activeSection, setActiveSection] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)

      let current = ''
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            current = s.id
          }
        }
      }
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
      el.scrollIntoView({ behavior, block: 'start' })
    }
  }

  const scrollToTop = () => {
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'
    window.scrollTo({ top: 0, behavior })
  }

  return (
    <div>
      {/* Hero */}
      <section
        data-surface="dark"
        className="bg-navy text-on-dark pt-28 pb-14 md:pt-36 md:pb-16"
      >
        <Container>
          <div className="max-w-3xl">
            <h1 className="display-2 text-on-dark">Politica de Confidențialitate</h1>
            <p className="mt-4 font-body text-base text-on-dark-muted">
              CESS TRUST S.R.L.
            </p>
            <p className="mt-2 font-body text-sm text-on-dark-muted tabular-nums">
              Ultima actualizare: ianuarie 2025
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <div className="bg-alabaster text-ink">
        <Container className="py-12 md:py-20">
          {/* Mobile / Tablet jump index */}
          <div className="lg:hidden mb-8">
            <details className="group border border-rule bg-vellum p-4">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between font-body text-sm font-semibold uppercase tracking-[0.12em] text-navy">
                <span>Cuprins</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-navy transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <ul className="mt-3 space-y-1 border-t border-rule pt-3">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(s.id)}
                      className="w-full min-h-[40px] py-1.5 text-left font-body text-sm text-ink-muted hover:text-navy tabular-nums"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,720px)] lg:justify-center lg:gap-16">
            {/* Sticky sidebar TOC (desktop) */}
            <nav className="hidden lg:block" aria-label="Cuprins">
              <ul className="sticky top-28 space-y-1 border-t border-rule pt-4">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(s.id)}
                      aria-current={activeSection === s.id ? 'true' : undefined}
                      className={cn(
                        'min-h-[40px] w-full border-l-2 py-2 pl-3 text-left font-body text-sm transition-colors tabular-nums',
                        activeSection === s.id
                          ? 'border-copper font-semibold text-navy'
                          : 'border-transparent text-ink-muted hover:text-navy',
                      )}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Main prose column */}
            <div className="min-w-0 max-w-[68ch] tabular-nums">
              {sections.map((s, index) => (
                <div key={s.id}>
                  {index > 0 && <hr className="my-10 border-0 border-t border-rule md:my-12" />}
                  <Reveal>
                    <section id={s.id} className="scroll-mt-28">
                      <h2 className="font-display text-2xl md:text-3xl text-ink mb-4">
                        {s.title}
                      </h2>
                      <p className="font-body text-base leading-8 text-ink-muted">
                        {s.content}
                      </p>
                    </section>
                  </Reveal>
                </div>
              ))}

              {/* Editorial contact bar */}
              <div className="mt-16 flex flex-col gap-4 border-t border-rule pt-10 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-xl text-ink">
                    Aveți solicitări privind datele personale?
                  </p>
                  <p className="mt-1 font-body text-sm text-ink-muted">
                    Echipa CESS TRUST S.R.L. răspunde solicitărilor GDPR direct și transparent.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <ActionLink to="/contact">Contactează-ne</ActionLink>
                  <a
                    href="tel:+40723926446"
                    className="inline-flex min-h-[48px] items-center font-body text-sm font-medium text-navy underline underline-offset-4 hover:text-copper-ink tabular-nums"
                  >
                    +40 723 926 446
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Back to top button (mobile) */}
      {showBackToTop && (
        <button
          type="button"
          data-surface="dark"
          onClick={scrollToTop}
          className="fixed bottom-5 left-4 z-40 inline-flex h-11 items-center gap-2 rounded-[2px] border border-rule-dark bg-navy px-4 font-body text-xs font-semibold uppercase tracking-[0.08em] text-on-dark shadow-lg lg:hidden"
          aria-label="Înapoi sus"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
          <span>Sus</span>
        </button>
      )}
    </div>
  )
}
