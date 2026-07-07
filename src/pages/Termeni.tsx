import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ArrowUp } from 'lucide-react'

const sections = [
  { id: 'informatii-generale', title: '1. Informații generale' },
  { id: 'acceptarea-termenilor', title: '2. Acceptarea termenilor' },
  { id: 'drepturi-de-autor', title: '3. Drepturi de autor' },
  { id: 'utilizarea-site-ului', title: '4. Utilizarea site-ului' },
  { id: 'limitarea-raspunderii', title: '5. Limitarea răspunderii' },
  { id: 'linkuri-externe', title: '6. Linkuri externe' },
  { id: 'modificari', title: '7. Modificări' },
  { id: 'legea-aplicabila', title: '8. Legea aplicabilă' },
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

export default function Termeni() {
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
            Termeni și Condiții
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
              <section id="informatii-generale" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginTop: '0',
                    marginBottom: '24px',
                  }}
                >
                  1. Informații generale
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Prezentul document conține termenii și condițiile generale de utilizare a site-ului cess.ro, operat de CESS TRUST S.R.L., CUI 37449212, înregistrată la Registrul Comerțului sub nr. J2017001194133, cu sediul social în Strada Viitorului 4, Bloc 4B, Constanța.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="acceptarea-termenilor" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  2. Acceptarea termenilor
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Prin accesarea și utilizarea acestui site, acceptați în totalitate termenii și condițiile prezentate. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați site-ul.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="drepturi-de-autor" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  3. Drepturi de autor
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Conținutul acestui site (texte, imagini, logo-uri, elemente de grafică web) este proprietatea CESS TRUST S.R.L. și este protejat de legislația română și internațională privind drepturile de autor. Reproducerea, distribuirea sau utilizarea fără acordul prealabil scris este strict interzisă.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="utilizarea-site-ului" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  4. Utilizarea site-ului
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Utilizatorii se obligă să nu utilizeze site-ul în scopuri ilegale, să nu încerce să acceseze zone restricționate, să nu introducă conținut malițios și să respecte legislația în vigoare.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="limitarea-raspunderii" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  5. Limitarea răspunderii
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  CESS TRUST S.R.L. nu își asumă răspunderea pentru eventualele erori sau omisiuni în conținutul site-ului. Informațiile prezentate au caracter informativ și nu constituie consultanță juridică sau financiară.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="linkuri-externe" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  6. Linkuri externe
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Site-ul poate conține link-uri către site-uri terțe. CESS TRUST S.R.L. nu își asumă răspunderea pentru conținutul acestora.
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
                  7. Modificări
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Ne rezervăm dreptul de a modifica prezentul termeni și condiții în orice moment. Modificările vor fi publicate pe această pagină.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="legea-aplicabila" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  8. Legea aplicabilă
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Prezentul document este guvernat de legislația română. Orice dispută va fi soluționată de instanțele competente din România.
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
