import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { Calculator, FileCheck, Shield, HardHat, Users, Building2, Flame, Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Calculator,
    title: 'Contabilitate financiară și de gestiune',
    subtitle: 'Control complet, fără griji contabile',
    link: '/servicii#contabilitate',
  },
  {
    icon: FileCheck,
    title: 'Consultanță fiscală și depunerea declarațiilor',
    subtitle: 'Siguranță fiscală, zero surprize',
    link: '/servicii#fiscalitate',
  },
  {
    icon: Shield,
    title: 'Protecția Datelor cu Caracter Personal (GDPR)',
    subtitle: 'Siguranță, Conformare, Liniște',
    link: '/servicii#gdpr',
  },
  {
    icon: HardHat,
    title: 'Securitate și Sănătate în Muncă (SSM)',
    subtitle: 'Legal, organizat, fără hârtii inutile',
    link: '/servicii#ssm',
  },
  {
    icon: Users,
    title: 'Servicii de Salarizare și Operare REGES',
    subtitle: 'HR organizat și corect',
    link: '/servicii#salarizare',
  },
  {
    icon: Building2,
    title: 'Evaluare de Risc la Securitate Fizică',
    subtitle: 'Prevenție reală, nu doar formală',
    link: '/servicii#securitate-fizica',
  },
  {
    icon: Flame,
    title: 'Prevenirea și Stingerea Incendiilor (PSI)',
    subtitle: 'Siguranță reală, nu doar pe hârtie',
    link: '/servicii#psi',
  },
]

export default function ServiciiGrid() {
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

      const cards = section.querySelectorAll('.service-card')
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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
      style={{ backgroundColor: '#f5f0eb' }}
    >
      <div className="content-max-width">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="header-animate font-display font-normal mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#000000',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textWrap: 'balance',
              willChange: 'transform, opacity',
            }}
          >
            Conformare completă, la un click distanță
          </h2>
          <p
            className="header-animate font-body text-lg max-w-[700px] mx-auto"
            style={{ color: '#333333', lineHeight: 1.7, willChange: 'transform, opacity' }}
          >
            Serviciile noastre acoperă toate ariile esențiale pentru conformare și funcționare eficientă:
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Link
                key={i}
                to={service.link}
                className="service-card group p-10 border border-[#e8e0d8] bg-white transition-all duration-300 hover:shadow-lg hover:border-[#c9a87c] hover:-translate-y-1"
                style={{
                  willChange: 'transform, opacity',
                }}
              >
                <div className="mb-5">
                  <Icon size={40} style={{ color: '#c9a87c' }} strokeWidth={1.5} />
                </div>
                <h3
                  className="font-body text-lg font-medium mb-2"
                  style={{ color: '#000000', textWrap: 'balance' }}
                >
                  {service.title}
                </h3>
                <p className="font-body text-sm mb-4" style={{ color: '#555555', lineHeight: 1.6 }}>
                  {service.subtitle}
                </p>
                <span
                  className="inline-flex items-center gap-1 font-body text-sm font-medium transition-all duration-300 group-hover:gap-2"
                  style={{ color: '#c9a87c' }}
                >
                  Află mai mult
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            )
          })}

          {/* 8th card — CTA */}
          <Link
            to="/contact"
            className="service-card group p-10 border border-dashed transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center text-center"
            style={{
              backgroundColor: 'rgba(201,168,124,0.05)',
              borderColor: 'rgba(201,168,124,0.3)',
              willChange: 'transform, opacity',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c9a87c'
              e.currentTarget.style.backgroundColor = 'rgba(201,168,124,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,168,124,0.3)'
              e.currentTarget.style.backgroundColor = 'rgba(201,168,124,0.05)'
            }}
          >
            <div className="mb-5">
              <Phone size={48} style={{ color: '#c9a87c' }} strokeWidth={1.5} />
            </div>
            <h3
              className="font-body text-lg font-medium mb-2"
              style={{ color: '#000000', textWrap: 'balance' }}
            >
              Ai nevoie de mai multe servicii?
            </h3>
            <p className="font-body text-sm mb-4" style={{ color: '#555555', lineHeight: 1.6 }}>
              Contactează-ne pentru o soluție personalizată adaptată nevoilor tale.
            </p>
            <span
              className="inline-flex items-center gap-1 font-body text-sm font-medium transition-all duration-300 group-hover:gap-2"
              style={{ color: '#c9a87c' }}
            >
              Contactează-ne
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/servicii"
            className="inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: '#c9a87c',
              color: '#000000',
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
            Vezi toate serviciile
          </Link>
        </div>
      </div>
    </section>
  )
}
