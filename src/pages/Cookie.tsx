import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ArrowUp } from 'lucide-react'

const sections = [
  { id: 'ce-este-un-cookie', title: 'Ce este un cookie' },
  { id: 'tipuri-de-cookie-uri', title: 'Tipuri de cookie-uri' },
  { id: 'avantajele-cookie-urilor', title: 'Avantajele cookie-urilor' },
  { id: 'durata-de-viata', title: 'Durata de viață' },
  { id: 'cum-folosim-cookie-urile', title: 'Cum folosim cookie-urile' },
  { id: 'securitate-si-confidentialitate', title: 'Securitate și confidențialitate' },
  { id: 'sfaturi-pentru-utilizare-sigura', title: 'Sfaturi pentru o utilizare sigură' },
  { id: 'cum-dezactivati-cookie-urile', title: 'Cum puteți opri cookie-urile' },
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

export default function Cookie() {
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
            Politica Cookie
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
              <section id="ce-este-un-cookie" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginTop: '0',
                    marginBottom: '24px',
                  }}
                >
                  Ce este un cookie
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Un cookie este un fișier text de mici dimensiuni, stocat pe dispozitivul dvs. atunci când vizitați un site web. Cookie-urile permit site-ului să vă recunoască și să își amintească preferințele.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="tipuri-de-cookie-uri" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  Tipuri de cookie-uri
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Utilizăm următoarele tipuri de cookie-uri: cookie-uri esențiale (necesare pentru funcționarea site-ului), cookie-uri de performanță (ne ajută să înțelegem cum utilizați site-ul), cookie-uri de funcționalitate (memorează preferințele dvs.), cookie-uri de targeting (folosite pentru publicitate relevantă).
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="avantajele-cookie-urilor" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  Avantajele cookie-urilor
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Cookie-urile ne permit să vă oferim o experiență personalizată, să îmbunătățim funcționalitatea site-ului și să înțelegem cum putem să ne optimizăm serviciile.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="durata-de-viata" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  Durata de viață
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Cookie-urile pot fi: de sesiune (șterse când închideți browserul) sau persistente (rămân pe dispozitiv pentru o perioadă stabilită).
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="cum-folosim-cookie-urile" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  Cum folosim cookie-urile
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Folosim cookie-uri pentru: autentificare, securitate, analiză și statistică, preferințe utilizator, funcționalități sociale.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="securitate-si-confidentialitate" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  Securitate și confidențialitate
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Cookie-urile nu conțin programe software, viruși sau spyware și nu pot accesa informațiile de pe hard driver-ul utilizatorului.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="sfaturi-pentru-utilizare-sigura" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  Sfaturi pentru o utilizare sigură
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Vă recomandăm să vă configurați browserul pentru a accepta cookie-uri doar de la site-urile de încredere și să ștergeți periodic cookie-urile stocate.
                </p>
              </section>
            </SectionReveal>

            <div style={{ height: '1px', backgroundColor: '#e8e0d8', margin: '64px 0' }} />

            <SectionReveal>
              <section id="cum-dezactivati-cookie-urile" className="scroll-mt-28">
                <h2
                  className="font-body font-semibold"
                  style={{
                    fontSize: '1.5rem',
                    color: '#000000',
                    marginBottom: '24px',
                  }}
                >
                  Cum puteți opri cookie-urile
                </h2>
                <p
                  className="font-body"
                  style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: 1.8,
                  }}
                >
                  Puteți dezactiva cookie-urile prin setările browserului. Rețineți că dezactivarea cookie-urilor poate afecta funcționalitatea site-ului. Pentru instrucțiuni specifice: Google Chrome (Setări &gt; Confidențialitate și securitate &gt; Cookie-uri), Mozilla Firefox (Opțiuni &gt; Confidențialitate și securitate), Safari (Preferințe &gt; Confidențialitate), Microsoft Edge (Setări &gt; Cookie-uri și permisiuni site).
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
