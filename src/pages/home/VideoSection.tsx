import { useRef, useEffect } from 'react'
import { Play } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VideoSection() {
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
      style={{ backgroundColor: '#000000' }}
    >
      <div className="content-max-width">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="animate-in font-display font-normal mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#f5f0eb',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textWrap: 'balance',
              willChange: 'transform, opacity',
            }}
          >
            Descoperă cum te putem ajuta
          </h2>
          <p
            className="animate-in font-body text-lg max-w-[700px] mx-auto"
            style={{ color: '#64748b', lineHeight: 1.7, willChange: 'transform, opacity' }}
          >
            Urmărește prezentarea noastră și află cum CESS simplifică conformarea pentru afacerea ta.
          </p>
        </div>

        {/* Video Placeholder */}
        <div
          className="animate-in mx-auto max-w-[900px]"
          style={{ willChange: 'transform, opacity' }}
        >
          <div
            className="flex flex-col items-center justify-center aspect-video rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)',
              border: '1px solid #262626',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c9a87c'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#262626'
            }}
          >
            <Play
              size={64}
              style={{ color: '#c9a87c' }}
              strokeWidth={1.5}
              className="mb-4 transition-transform duration-300 hover:scale-110"
            />
            <p
              className="font-body text-base"
              style={{ color: '#64748b' }}
            >
              Video prezentare — în curând
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
