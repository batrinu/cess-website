import { useEffect, useState } from 'react'
import { ArrowUp, ChevronDown } from 'lucide-react'
import Container from '@/components/site/Container'
import ActionLink from '@/components/site/ActionLink'
import Reveal from '@/components/site/Reveal'
import { cn } from '@/lib/utils'

const sections = [
  {
    id: 'informatii-generale',
    title: '1. Informații generale',
    content:
      'Prezentul document conține termenii și condițiile generale de utilizare a site-ului cess.ro, operat de CESS TRUST S.R.L., CUI 37449212, înregistrată la Registrul Comerțului sub nr. J2017001194133, cu sediul social în Strada Viitorului 4, Bloc 4B, Constanța.',
  },
  {
    id: 'acceptarea-termenilor',
    title: '2. Acceptarea termenilor',
    content:
      'Prin accesarea și utilizarea acestui site, acceptați în totalitate termenii și condițiile prezentate. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați site-ul.',
  },
  {
    id: 'drepturi-de-autor',
    title: '3. Drepturi de autor',
    content:
      'Conținutul acestui site (texte, imagini, logo-uri, elemente de grafică web) este proprietatea CESS TRUST S.R.L. și este protejat de legislația română și internațională privind drepturile de autor. Reproducerea, distribuirea sau utilizarea fără acordul prealabil scris este strict interzisă.',
  },
  {
    id: 'utilizarea-site-ului',
    title: '4. Utilizarea site-ului',
    content:
      'Utilizatorii se obligă să nu utilizeze site-ul în scopuri ilegale, să nu încerce să acceseze zone restricționate, să nu introducă conținut malițios și să respecte legislația în vigoare.',
  },
  {
    id: 'limitarea-raspunderii',
    title: '5. Limitarea răspunderii',
    content:
      'CESS TRUST S.R.L. nu își asumă răspunderea pentru eventualele erori sau omisiuni în conținutul site-ului. Informațiile prezentate au caracter informativ și nu constituie consultanță juridică sau financiară.',
  },
  {
    id: 'linkuri-externe',
    title: '6. Linkuri externe',
    content:
      'Site-ul poate conține link-uri către site-uri terțe. CESS TRUST S.R.L. nu își asumă răspunderea pentru conținutul acestora.',
  },
  {
    id: 'modificari',
    title: '7. Modificări',
    content:
      'Ne rezervăm dreptul de a modifica prezentul termeni și condiții în orice moment. Modificările vor fi publicate pe această pagină.',
  },
  {
    id: 'legea-aplicabila',
    title: '8. Legea aplicabilă',
    content:
      'Prezentul document este guvernat de legislația română. Orice dispută va fi soluționată de instanțele competente din România.',
  },
] as const

export default function Termeni() {
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
            <h1 className="display-2 text-on-dark">Termeni și Condiții</h1>
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
                    Aveți întrebări despre termenii de utilizare?
                  </p>
                  <p className="mt-1 font-body text-sm text-ink-muted">
                    Contactați echipa CESS TRUST S.R.L. pentru clarificări sau o discuție inițială.
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
