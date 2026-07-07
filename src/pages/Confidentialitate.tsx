import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ArrowUp } from 'lucide-react'

const sections = [
  { id: 'cine-suntem', title: '1. Cine suntem' },
  { id: 'ce-date-colectam', title: '2. Ce date colectăm' },
  { id: 'scopurile-prelucrarii', title: '3. Scopurile prelucrării' },
  { id: 'temeiul-legal', title: '4. Temeiul legal' },
  { id: 'stocarea-datelor', title: '5. Stocarea datelor' },
  { id: 'securitatea-datelor', title: '6. Securitatea datelor' },
  { id: 'drepturile-tale', title: '7. Drepturile tale' },
  { id: 'cookie-uri', title: '8. Cookie-uri' },
  { id: 'modificari', title: '9. Modificări' },
]

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  )
}

export default function Confidentialitate() {
  const [activeSection, setActiveSection] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeroVisible(true)
  }, [])

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

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Hero */}
      <div
        ref={heroRef}
        className="flex items-center justify-center"
        style={{
          backgroundColor: '#000000',
          minHeight: '40vh',
        }}
      >
        <div className="text-center px-4">
          <h1
            className="font-display font-normal"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#f5f0eb',
              lineHeight: 1.1,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Politica de Confidențialitate
          </h1>
          <p
            className="font-body text-base mt-4"
            style={{
              color: '#94a3b8',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            CESS TRUST S.R.L.
          </p>
          <p
            className="font-body mt-2"
            style={{
              fontSize: '0.75rem',
              color: 'rgba(148,163,184,0.6)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            Ultima actualizare: ianuarie 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ backgroundColor: '#f5f0eb' }}>
        <div className="content-max-width relative">
          {/* Sticky sidebar TOC (desktop only) */}
          <nav
            className="hidden lg:block"
            style={{
              position: 'fixed',
              width: '240px',
              left: 'calc(50% - 640px)',
              top: '100px',
            }}
          >
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSection(s.id)}
                    className="font-body text-sm text-left w-full transition-colors duration-300"
                    style={{
                      color: activeSection === s.id ? '#c9a87c' : '#64748b',
                      fontWeight: activeSection === s.id ? 500 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== s.id) {
                        e.currentTarget.style.color = '#c9a87c'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== s.id) {
                        e.currentTarget.style.color = '#64748b'
                      }
                    }}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main content */}
          <div
            className="py-24 lg:pt-32"
            style={{
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <SectionReveal>
              <section id="cine-suntem" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginTop: '0',
                    marginBottom: '24px',
                  }}
                >
                  1. Cine suntem
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  CESS TRUST S.R.L., CUI 37449212, cu sediul în Strada Viitorului 4, Bloc 4B, Constanța, România, email: contact@cess.ro, telefon: +40 723 926 446. Suntem operator de date cu caracter personal înregistrat la ANSPDRC.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="ce-date-colectam" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  2. Ce date colectăm
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Colectăm următoarele categorii de date: date de identificare (nume, prenume), date de contact (email, telefon, adresă), date profesionale (funcție, companie), date tehnice (adresă IP, tip browser, sistem de operare), și orice alte date pe care ni le furnizați voluntar prin formularul de contact.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="scopurile-prelucrarii" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  3. Scopurile prelucrării
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Datele sunt prelucrate în următoarele scopuri: furnizarea serviciilor solicitate, comunicarea cu dvs., transmiterea de informații și newslettere (cu consimțământ), îmbunătățirea serviciilor, respectarea obligațiilor legale.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="temeiul-legal" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  4. Temeiul legal
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Prelucrarea datelor se bazează pe: executarea unui contract sau la cererea dvs. premergătoare încheierii acestuia, consimțământul dvs., obligații legale, interese legitime.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="stocarea-datelor" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  5. Stocarea datelor
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Datele sunt stocate pe servere securizate în Uniunea Europeană. Păstrăm datele doar atât timp cât este necesar pentru scopurile prelucrării sau cât ne obligă legea.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="securitatea-datelor" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  6. Securitatea datelor
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor împotriva accesului neautorizat, pierderii sau distrugerii.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="drepturile-tale" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  7. Drepturile tale
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Conform Regulamentului (UE) 2016/679 (GDPR), aveți următoarele drepturi: dreptul de acces, dreptul la rectificare, dreptul la ștergerea datelor (&quot;dreptul de a fi uitat&quot;), dreptul la restricționarea prelucrării, dreptul la portabilitatea datelor, dreptul la opoziție, dreptul de a nu face obiectul unei decizii bazate exclusiv pe prelucrarea automată. Pentru exercitarea acestor drepturi, contactați-ne la contact@cess.ro.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="cookie-uri" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  8. Cookie-uri
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Site-ul utilizează cookie-uri. Pentru mai multe informații, consultați <a href="/cookie" className="transition-colors duration-300 hover:underline" style={{ color: '#c9a87c' }}>Politica Cookie</a>.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="modificari" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  9. Modificări
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Ne rezervăm dreptul de a actualiza această politică. Modificările vor fi publicate pe această pagină cu data actualizării.
                </p>
              </section>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Back to top button (mobile) */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: '#c9a87c' }}
          aria-label="Înapoi sus"
        >
          <ArrowUp size={20} color="#000000" />
        </button>
      )}
    </div>
  )
}
