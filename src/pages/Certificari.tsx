import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Download, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CertificationDoc {
  id: number
  title: string
  detail: string
  detailColor: string
  description: string
  image: string
}

const certifications: CertificationDoc[] = [
  {
    id: 1,
    title: 'Autorizație de funcționare CECCAR',
    detail: '2025',
    detailColor: '#64748b',
    description:
      'Autorizație emisă de Corpul Experților Contabili și Contabililor Autorizați din România, care atestă dreptul de a practica activități de contabilitate și audit.',
    image: '/ceccar-2025.png',
  },
  {
    id: 2,
    title: 'Certificat de abilitare',
    detail: 'Valabil',
    detailColor: '#5c7c6b',
    description:
      'Certificat care atestă abilitarea profesională în domeniul serviciilor de suport administrative și de conformare.',
    image: '/certificat-abilitare.png',
  },
]

export default function Certificari() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroBodyRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaContentRef = useRef<HTMLDivElement>(null)

  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title fade up
      gsap.from(heroTitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })

      // Hero body fade up
      gsap.from(heroBodyRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Cards staggered fade-up
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.2,
        })
      })

      // CTA banner fade up
      if (ctaContentRef.current) {
        gsap.from(ctaContentRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxImage])

  const openLightbox = (image: string) => {
    setLightboxImage(image)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  return (
    <div>
      {/* Section 1: Hero */}
      <section
        ref={heroRef}
        className="flex items-center justify-center text-center"
        style={{
          backgroundColor: '#000000',
          minHeight: '50vh',
        }}
      >
        <div className="content-max-width px-4 md:px-8 pt-[72px]">
          <span
            className="font-body text-xs font-semibold uppercase"
            style={{ color: '#c9a87c', letterSpacing: '0.08em' }}
          >
            DOCUMENTE OFICIALE
          </span>
          <h1
            ref={heroTitleRef}
            className="font-display mt-4"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#f5f0eb',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Certificări
          </h1>
          <p
            ref={heroBodyRef}
            className="font-body mx-auto mt-6 max-w-[600px]"
            style={{
              fontSize: '1.125rem',
              color: '#94a3b8',
              lineHeight: 1.7,
            }}
          >
            Documente oficiale care atestă calificarea și autorizarea CESS TRUST
            S.R.L. în domeniile de activitate.
          </p>
        </div>
      </section>

      {/* Section 2: Documente */}
      <section
        ref={cardsRef}
        className="section-padding"
        style={{ backgroundColor: '#f5f0eb' }}
      >
        <div className="content-max-width px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                ref={(el) => { cardRefs.current[index] = el }}
                className="group p-8 md:p-12 lg:p-16"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8e0d8',
                }}
              >
                {/* Document preview area */}
                <div
                  className="relative overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    aspectRatio: '16 / 10',
                    backgroundColor: '#1a1a1a',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  }}
                  onClick={() => openLightbox(cert.image)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openLightbox(cert.image)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Vezi documentul ${cert.title}`}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                </div>

                {/* Info area */}
                <div className="mt-6">
                  <h3
                    className="font-body font-semibold"
                    style={{ fontSize: '1.25rem', color: '#000000' }}
                  >
                    {cert.title}
                  </h3>
                  <p
                    className="font-body mt-1"
                    style={{
                      fontSize: '1rem',
                      color: cert.detailColor,
                    }}
                  >
                    {cert.detail}
                  </p>
                  <p
                    className="font-body mt-3"
                    style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      lineHeight: 1.6,
                    }}
                  >
                    {cert.description}
                  </p>
                  <button
                    onClick={() => openLightbox(cert.image)}
                    className="font-body mt-4 inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      color: '#c9a87c',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      border: '1px solid #c9a87c',
                      padding: '10px 20px',
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
                    <Download size={14} />
                    Vezi documentul
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: CTA Banner */}
      <section
        ref={ctaRef}
        className="py-24 md:py-32"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div
          ref={ctaContentRef}
          className="content-max-width px-4 md:px-8 text-center"
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: '#f5f0eb',
              lineHeight: 1.2,
            }}
          >
            Ai întrebări despre calificările noastre?
          </h2>
          <div className="mt-8">
            <Link
              to="/contact"
              className="font-body inline-block text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-[14px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#c9a87c',
                color: '#000000',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d4b896'
                e.currentTarget.style.boxShadow =
                  '0 4px 20px rgba(201,168,124,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#c9a87c'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 transition-colors duration-300"
            style={{ color: '#f5f0eb' }}
            aria-label="Închide"
          >
            <X size={32} />
          </button>
          <img
            src={lightboxImage}
            alt="Document"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
