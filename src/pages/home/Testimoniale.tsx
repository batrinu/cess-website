import { useRef, useEffect } from 'react'
import { Quote } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'Echipa CESS ne-a transformat complet modul în care gestionăm conformarea. De la SSM la GDPR, totul este acum organizat și digitalizat.',
    name: 'Maria I.',
    title: 'Manager HR, Constanța',
  },
  {
    quote:
      'De când colaborăm cu CESS, nu mai avem grija amenzilor. Contabilitatea și fiscalitatea sunt perfect gestionate.',
    name: 'Andrei P.',
    title: 'Director General, București',
  },
  {
    quote:
      'Aplicația CESS este un game-changer. Pot vedea tot ce se întâmplă în timp real, iar alertele mă ajută să nu ratez niciodată un termen.',
    name: 'Elena D.',
    title: 'Administrator, Mangalia',
  },
]

export default function Testimoniale() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const header = section.querySelectorAll('.header-animate')
      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        }
      )

      const cards = section.querySelectorAll('.testimonial-card')
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: section, start: 'top 80%' },
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
      <div className="content-max-width">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="header-animate font-display font-normal mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#f5f0eb',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textWrap: 'balance',
              willChange: 'transform, opacity',
            }}
          >
            Ce spun clienții noștri
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card relative p-6 rounded-lg border transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: '#1a1a1a',
                borderColor: '#262626',
                willChange: 'transform, opacity',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c9a87c'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,124,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#262626'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Quote
                size={32}
                style={{ color: '#c9a87c', opacity: 0.3 }}
                strokeWidth={1.5}
                className="mb-4"
              />
              <p
                className="font-body text-base italic mb-6"
                style={{ color: '#f5f0eb', lineHeight: 1.7 }}
              >
                "{t.quote}"
              </p>
              <p
                className="font-body text-base font-semibold"
                style={{ color: '#c9a87c' }}
              >
                {t.name}
              </p>
              <p
                className="font-body text-sm"
                style={{ color: '#64748b' }}
              >
                {t.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
