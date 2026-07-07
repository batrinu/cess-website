import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  'SSM, PSI și GDPR – documente, evidențe, fișe, planuri, alerte automate',
  'Termene-limită și alerte automate – nu mai ratezi nimic important',
  'Acces securizat și control pe roluri – echipa ta poate colabora eficient',
  'Modele de documente actualizate – întotdeauna conforme cu legislația',
  'Audit intern pregătit automat – în caz de control, ești acoperit',
]

export default function AplicatiaCESS() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!section || !left || !right) return

    const ctx = gsap.context(() => {
      const leftEls = left.querySelectorAll('.animate-in')
      gsap.fromTo(
        leftEls,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        }
      )

      gsap.fromTo(
        right,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div ref={leftRef}>
            <h2
              className="animate-in font-display font-normal mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#f5f0eb',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                textWrap: 'balance',
                willChange: 'transform, opacity',
              }}
            >
              Totul într-un singur loc, la un click distanță
            </h2>

            <p
              className="animate-in font-body text-lg max-w-[560px] mb-8"
              style={{ color: '#cbd5e1', lineHeight: 1.7, willChange: 'transform, opacity' }}
            >
              Aplicația CESS este soluția digitală care transformă obligațiile legale într-un proces simplu, organizat și automatizat.
            </p>

            {/* Features */}
            <ul className="animate-in space-y-3 mb-8" style={{ willChange: 'transform, opacity' }}>
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full" style={{ backgroundColor: '#5c7c6b' }} />
                  <span className="font-body text-base" style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <p
              className="animate-in font-body text-base mb-8"
              style={{ color: '#cbd5e1', lineHeight: 1.6, willChange: 'transform, opacity' }}
            >
              Totul se desfășoară integrat, printr-un punct unic de contact, cu suport uman sau digital, într-o manieră trasabilă și conformă.
            </p>

            <div className="animate-in flex flex-wrap gap-4" style={{ willChange: 'transform, opacity' }}>
              <Link
                to="/contact"
                className="inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: '#c9a87c', color: '#000000' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d4b896'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,124,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#c9a87c'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Demo gratuit
              </Link>
              <Link
                to="/servicii"
                className="inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-3.5 border transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: '#c9a87c', color: '#c9a87c', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c9a87c'
                  e.currentTarget.style.color = '#000000'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#c9a87c'
                }}
              >
                Află mai multe
              </Link>
            </div>
          </div>

          {/* Right Column - App Mockup */}
          <div ref={rightRef} className="flex justify-center" style={{ willChange: 'transform, opacity' }}>
            <div
              className="w-full max-w-[480px] overflow-hidden"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #262626',
              }}
            >
              {/* Top Bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid #262626' }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#c9a87c' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5c7c6b' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#64748b' }} />
                <span className="ml-auto font-body text-xs" style={{ color: '#64748b' }}>
                  CESS App
                </span>
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div
                  className="hidden sm:block w-40 py-4 px-3"
                  style={{ borderRight: '1px solid #262626' }}
                >
                  {['SSM', 'PSI', 'GDPR', 'Contabilitate', 'Fiscalitate', 'Rapoarte'].map((item, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 mb-1 font-body text-xs rounded"
                      style={{
                        color: i === 0 ? '#f5f0eb' : '#64748b',
                        backgroundColor: i === 0 ? 'rgba(201,168,124,0.15)' : 'transparent',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main Area */}
                <div className="flex-1 p-4">
                  {/* Status Row */}
                  <div className="flex gap-3 mb-4">
                    {[
                      { label: 'Conform', color: '#5c7c6b' },
                      { label: 'În așteptare', color: '#c9a87c' },
                      { label: 'Verificat', color: '#5c7c6b' },
                    ].map((status, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 px-2 py-1"
                        style={{ backgroundColor: 'rgba(92,124,107,0.12)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                        <span className="font-body text-[10px]" style={{ color: '#94a3b8' }}>
                          {status.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div
                    className="h-32 mb-4 flex items-end gap-1 px-2 pb-2"
                    style={{ borderBottom: '1px solid #262626' }}
                  >
                    {[40, 65, 45, 80, 55, 70, 50, 90, 60, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all duration-500"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i === 7 ? '#c9a87c' : 'rgba(201,168,124,0.3)',
                        }}
                      />
                    ))}
                  </div>

                  {/* Document list */}
                  <div className="space-y-2">
                    {['Documente SSM', 'Evidență PSI', 'Audit GDPR'].map((doc, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2"
                        style={{ backgroundColor: 'rgba(38,38,38,0.5)' }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#5c7c6b' }} />
                        <span className="font-body text-xs" style={{ color: '#94a3b8' }}>
                          {doc}
                        </span>
                        <span className="ml-auto font-body text-[10px]" style={{ color: '#64748b' }}>
                          Actualizat
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
