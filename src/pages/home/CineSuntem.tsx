import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { Check } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const checkmarks = [
  {
    title: 'Expertiză aplicată:',
    text: 'Lucrăm cu specialiști certificați, cu know-how în multiple industrii și în provocările concrete ale antreprenorilor.',
  },
  {
    title: 'Tehnologie inteligentă:',
    text: 'Platforma noastră digitală te ajută să gestionezi SSM, PSI sau GDPR cu un singur click. Poți alege să lucrezi cu echipa ta sau să lași totul în grija experților noștri.',
  },
  {
    title: 'Flexibilitate totală:',
    text: 'Fie că ai nevoie de un singur serviciu sau de un pachet complet (SSM, PSI, GDPR, contabilitate), îți oferim opțiuni personalizate, în funcție de buget, echipă și gradul de autonomie dorit.',
  },
  {
    title: 'Confidențialitate și siguranță:',
    text: 'Datele tale sunt protejate prin protocoale stricte și soluții de securitate de ultimă generație – pentru că încrederea se construiește prin fapte.',
  },
]

export default function CineSuntem() {
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
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        right,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
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
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div ref={leftRef}>
            <h2
              className="animate-in font-display font-normal mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#000000',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                textWrap: 'balance',
                willChange: 'transform, opacity',
              }}
            >
              Cine suntem?
            </h2>

            <div className="animate-in max-w-[600px] space-y-4 mb-8" style={{ willChange: 'transform, opacity' }}>
              <p className="font-body text-lg" style={{ color: '#333333', lineHeight: 1.7 }}>
                La CESS, suntem mai mult decât un furnizor de servicii. Suntem un centru digital integrat de suport legal și administrativ, creat pentru antreprenorii care vor să rămână conformi și eficienți.
              </p>
              <p className="font-body text-lg" style={{ color: '#333333', lineHeight: 1.7 }}>
                Îmbinăm experiența reală din teren cu avantajele tehnologiei moderne, oferindu-ți un pachet complet de servicii pentru conformare legală – simplu, rapid și accesibil de oriunde.
              </p>
            </div>

            {/* Checkmarks */}
            <div className="animate-in space-y-4 mb-8" style={{ willChange: 'transform, opacity' }}>
              {checkmarks.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 shrink-0">
                    <Check size={18} style={{ color: '#5c7c6b' }} strokeWidth={2.5} />
                  </div>
                  <p className="font-body text-base" style={{ color: '#333333', lineHeight: 1.6 }}>
                    <strong style={{ color: '#000000' }}>{item.title}</strong>{' '}
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="animate-in font-body text-base font-medium mb-8"
              style={{ color: '#000000', willChange: 'transform, opacity' }}
            >
              Alegând CESS, alegi un partener digital de încredere care traduce realitatea business-ului tău între obligații legale ușor de gestionat.
            </p>

            <Link
              to="/contact"
              className="animate-in inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
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
              Programează o consultație gratuită
            </Link>
          </div>

          {/* Right Column - Decorative Shape */}
          <div ref={rightRef} className="hidden lg:flex justify-center items-center" style={{ willChange: 'transform, opacity' }}>
            <div
              className="relative w-[400px] h-[500px] flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(201,168,124,0.15)',
                border: '1px solid rgba(201,168,124,0.3)',
              }}
            >
              {/* Abstract grid pattern */}
              <svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262626" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="300" height="400" fill="url(#grid)" />
                <rect x="50" y="50" width="200" height="300" fill="none" stroke="#c9a87c" strokeWidth="1" opacity="0.4" />
                <rect x="80" y="80" width="140" height="240" fill="none" stroke="#262626" strokeWidth="0.5" opacity="0.6" />
                <circle cx="150" cy="200" r="60" fill="none" stroke="#c9a87c" strokeWidth="0.5" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
