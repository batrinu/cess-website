import { useRef, useEffect } from 'react'
import { Image } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  { label: 'Echipa CESS' },
  { label: 'Sediul nostru' },
  { label: 'Training SSM' },
  { label: 'Consultare fiscală' },
  { label: 'Audit GDPR' },
  { label: 'Evenimente' },
]

export default function Galerie() {
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

      const items = section.querySelectorAll('.gallery-item')
      gsap.fromTo(
        items,
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
            className="header-animate font-display font-normal mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#000000',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textWrap: 'balance',
              willChange: 'transform, opacity',
            }}
          >
            Galerie
          </h2>
          <p
            className="header-animate font-body text-lg max-w-[700px] mx-auto"
            style={{ color: '#4a5568', lineHeight: 1.7, willChange: 'transform, opacity' }}
          >
            O privire în culisele activității noastre
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="gallery-item group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{ willChange: 'transform, opacity' }}
            >
              <div
                className="flex flex-col items-center justify-center aspect-[4/3] transition-transform duration-300"
                style={{
                  background: 'linear-gradient(to bottom right, #1a1a1a, #333333)',
                }}
              >
                <Image
                  size={40}
                  style={{ color: '#c9a87c', opacity: 0.6 }}
                  strokeWidth={1.5}
                />
                <p
                  className="font-body text-sm mt-3"
                  style={{ color: '#64748b' }}
                >
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
