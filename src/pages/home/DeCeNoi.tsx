import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { Check } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const checkmarks = [
  'Servicii complete, conectate între ele și gândite pentru tine',
  'Punct unic de contact, zero pierderi de informație',
  'Lucrăm 100% digitalizat, cu trasabilitate și control',
  'Aplicăm soluții clare, nu doar regulamente',
  'Aplicația CESS te ajută să automatizezi și să eviți greșelile frecvente',
]

const stats = [
  { value: '7+', label: 'Servicii integrate' },
  { value: '100%', label: 'Digitalizat' },
  { value: '24/7', label: 'Suport disponibil' },
]

export default function DeCeNoi() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const leftEls = section.querySelectorAll('.left-animate')
      gsap.fromTo(
        leftEls,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        }
      )

      const statBlocks = section.querySelectorAll('.stat-block')
      gsap.fromTo(
        statBlocks,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
      style={{ backgroundColor: '#f5f0eb' }}
    >
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
          {/* Left Column - Text */}
          <div>
            <h2
              className="left-animate font-display font-normal mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#000000',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                textWrap: 'balance',
                willChange: 'transform, opacity',
              }}
            >
              Partenerul tău de conformare
            </h2>

            <div className="left-animate max-w-[560px] space-y-4 mb-8" style={{ willChange: 'transform, opacity' }}>
              <p className="font-body text-lg" style={{ color: '#333333', lineHeight: 1.7 }}>
                Când vrei mai puțină birocrație, dar conformare 100%, ai nevoie de o echipă care înțelege nu doar ce spune legea, ci și ce înseamnă să o aplici în practică.
              </p>
              <p className="font-body text-lg" style={{ color: '#333333', lineHeight: 1.7 }}>
                La CESS, gândim toate serviciile în jurul nevoilor reale ale antreprenorilor. Nu venim cu soluții "din cărți", ci cu un sistem integrat, logic și ușor de folosit – chiar și pentru firmele care pornesc de la zero.
              </p>
            </div>

            {/* Checkmarks */}
            <div className="left-animate space-y-3 mb-8" style={{ willChange: 'transform, opacity' }}>
              {checkmarks.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check size={18} style={{ color: '#5c7c6b' }} strokeWidth={2.5} />
                  </div>
                  <p className="font-body text-base" style={{ color: '#333333', lineHeight: 1.6 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="left-animate font-body text-base font-medium mb-8"
              style={{ color: '#000000', willChange: 'transform, opacity' }}
            >
              CESS înseamnă eficiență, prevenție și parteneriat pe termen lung. Suntem alături de tine la fiecare pas, cu soluții reale, aplicabile și rezultate vizibile.
            </p>

            <Link
              to="/contact"
              className="left-animate inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#c9a87c',
                color: '#000000',
                willChange: 'transform, opacity',
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
              Contactează-ne
            </Link>
          </div>

          {/* Right Column - Stats */}
          <div className="flex flex-col gap-10 lg:pt-24">
            {stats.map((stat, i) => (
              <div key={i} className="stat-block flex flex-col items-center lg:items-start text-center lg:text-left" style={{ willChange: 'transform, opacity' }}>
                <p
                  className="font-display font-normal mb-2"
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    color: '#c9a87c',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p className="font-body text-sm" style={{ color: '#555555' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
