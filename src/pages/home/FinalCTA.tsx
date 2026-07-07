import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll('.animate-in')
      gsap.fromTo(
        els,
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
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="content-max-width text-center">
        <h2
          className="animate-in font-display font-normal mb-6"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#f5f0eb',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            textWrap: 'balance',
            willChange: 'transform, opacity',
          }}
        >
          Vrei să știi ce ți se potrivește?
        </h2>

        <p
          className="animate-in font-body text-lg max-w-[600px] mx-auto mb-10"
          style={{ color: '#94a3b8', lineHeight: 1.7, willChange: 'transform, opacity' }}
        >
          Alege CESS pentru servicii complete, clare și livrate corect. Contactează-ne acum pentru o consultație gratuită
        </p>

        <Link
          to="/contact"
          className="animate-in inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-12 py-4 transition-all duration-300 hover:-translate-y-0.5"
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

        <a
          href="tel:+40723926446"
          className="animate-in block mt-4 font-body text-base font-medium transition-colors duration-300"
          style={{ color: '#c9a87c', willChange: 'transform, opacity' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#d4b896' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#c9a87c' }}
        >
          +40 723 926 446
        </a>
      </div>
    </section>
  )
}
