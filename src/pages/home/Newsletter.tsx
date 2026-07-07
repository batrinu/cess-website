import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState('')
  const [gdprChecked, setGdprChecked] = useState(false)
  const [gdprError, setGdprError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.animate-in'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!gdprChecked) {
      setGdprError(true)
      return
    }
    setGdprError(false)
    if (email) {
      setSubmitted(true)
      setEmail('')
      setGdprChecked(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32"
      style={{ backgroundColor: '#f5f0eb' }}
    >
      <div className="content-max-width">
        <div className="animate-in max-w-[500px] mx-auto text-center" style={{ willChange: 'transform, opacity' }}>
          <h3
            className="font-display text-2xl md:text-3xl font-normal mb-4"
            style={{ color: '#000000', textWrap: 'balance' }}
          >
            Abonează-te la newsletter
          </h3>
          <p
            className="font-body text-base mb-8"
            style={{ color: '#333333', lineHeight: 1.6 }}
          >
            Noutăți legislative și sfaturi utile din SSM, PSI, GDPR & fiscal – fără birocrație, direct în inbox!
          </p>

          {submitted ? (
            <div
              className="py-4 px-6"
              style={{ backgroundColor: 'rgba(92,124,107,0.12)' }}
            >
              <p className="font-body text-sm font-medium" style={{ color: '#5c7c6b' }}>
                Mulțumim! Te-ai abonat cu succes la newsletter-ul nostru.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresa ta de email"
                  required
                  className="flex-1 font-body text-base px-4 py-3.5 outline-none transition-colors duration-300 focus:border-[#c9a87c] placeholder:text-[#999999]"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e8e0d8',
                    color: '#000000',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#c9a87c'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e8e0d8'
                  }}
                />
                <button
                  type="submit"
                  className="font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-6 py-3.5 transition-all duration-300"
                  style={{
                    backgroundColor: '#c9a87c',
                    color: '#000000',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d4b896'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#c9a87c'
                  }}
                >
                  ABONEAZĂ-TE
                </button>
              </div>

              {/* GDPR Checkbox */}
              <label className="flex items-start gap-3 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={gdprChecked}
                  onChange={(e) => {
                    setGdprChecked(e.target.checked)
                    if (e.target.checked) setGdprError(false)
                  }}
                  className="mt-0.5 shrink-0 w-4 h-4 accent-[#c9a87c] cursor-pointer"
                />
                <span className="font-body text-sm" style={{ color: '#555555', lineHeight: 1.5 }}>
                  Sunt de acord să primesc newsletter-ul și să fiu contactat conform{' '}
                  <Link
                    to="/confidentialitate"
                    className="underline transition-colors duration-300"
                    style={{ color: '#c9a87c' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#d4b896'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#c9a87c'
                    }}
                  >
                    Politicii de Confidențialitate
                  </Link>
                  .
                </span>
              </label>
              {gdprError && (
                <p className="font-body text-sm text-left" style={{ color: '#c0392b' }}>
                  Trebuie să accepti politica de confidențialitate.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
