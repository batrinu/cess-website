import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MisiuneaViziunea() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const blocks = section.querySelectorAll('.animate-in')
      gsap.fromTo(
        blocks,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        }
      )

      const divider = section.querySelector('.divider-line')
      if (divider) {
        gsap.fromTo(
          divider,
          { width: '0%' },
          {
            width: '100%',
            duration: 1,
            ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
            scrollTrigger: {
              trigger: divider,
              start: 'top 90%',
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="content-max-width">
        {/* Misiune */}
        <div className="animate-in mb-12" style={{ willChange: 'transform, opacity' }}>
          <p
            className="font-display font-normal max-w-[900px]"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: '#f5f0eb',
              lineHeight: 1.3,
              textWrap: 'balance',
              willChange: 'transform, opacity',
            }}
          >
            Să sprijinim companiile să rămână conforme și eficiente, prin servicii digitale de suport adaptate fiecărei etape de dezvoltare. Nu oferim doar servicii, ci întreaga logică din spatele lor.
          </p>
        </div>

        {/* Divider */}
        <div className="divider-line h-[1px] mb-12" style={{ backgroundColor: '#262626', willChange: 'width' }} />

        {/* Viziune */}
        <div className="animate-in mb-12" style={{ willChange: 'transform, opacity' }}>
          <p
            className="font-display font-normal max-w-[900px]"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: '#f5f0eb',
              lineHeight: 1.3,
              textWrap: 'balance',
              willChange: 'transform, opacity',
            }}
          >
            Să devenim principalul centru externalizat pentru servicii suport, recunoscut național pentru inovație, seriozitate și eficiență operațională.
          </p>
        </div>

        {/* Tagline */}
        <p
          className="animate-in font-body text-lg max-w-[700px] mb-8"
          style={{ color: '#94a3b8', lineHeight: 1.7, willChange: 'transform, opacity' }}
        >
          Împreună, construim un mediu de afaceri sigur, predictibil și sustenabil pentru fiecare client din portofoliu.
        </p>

        {/* CTA */}
        <Link
          to="/contact"
          className="animate-in inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-3.5 border transition-all duration-300 hover:-translate-y-0.5"
          style={{
            borderColor: '#c9a87c',
            color: '#c9a87c',
            backgroundColor: 'transparent',
            willChange: 'transform, opacity',
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
          Contactează-ne
        </Link>
      </div>
    </section>
  )
}
