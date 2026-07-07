import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Check,
  Loader2,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  consent: boolean
  website: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
  consent?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroBodyRef = useRef<HTMLParagraphElement>(null)
  const heroPhoneRef = useRef<HTMLAnchorElement>(null)
  const formSectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const socialSectionRef = useRef<HTMLDivElement>(null)
  const socialContentRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
    website: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
        delay: 0.4,
      })

      // Hero phone fade up with scale
      gsap.from(heroPhoneRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.98,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.6,
      })

      // Form fade up
      gsap.from(formRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formSectionRef.current,
          start: 'top 80%',
        },
      })

      // Info cards staggered fade-up
      infoCardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: 'top 80%',
          },
          delay: 0.2 + i * 0.12,
        })
      })

      // Social section fade up
      if (socialContentRef.current) {
        gsap.from(socialContentRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: socialSectionRef.current,
            start: 'top 85%',
          },
        })
      }

      // Map fade in
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 90%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Numele este obligatoriu (minim 2 caractere)'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Adresa de email nu este validă'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresa de email nu este validă'
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Mesajul este obligatoriu (minim 10 caractere)'
    }

    if (!formData.consent) {
      newErrors.consent = 'Trebuie să accepti prelucrarea datelor personale'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot spam protection
    if (formData.website) {
      setFormStatus('error')
      setSubmitStatus('error')
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)
    setFormStatus('submitting')

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate success
    setIsSubmitting(false)
    setFormStatus('success')
    setSubmitStatus('success')
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }))
    if (errors.consent) {
      setErrors((prev) => ({ ...prev, consent: undefined }))
    }
  }

  const inputBaseStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: '1px solid #e8e0d8',
    borderRadius: 0,
    padding: '14px 16px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    color: '#000000',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '0.875rem',
    color: '#000000',
    marginBottom: '8px',
    display: 'block',
  }

  const errorStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    color: '#ef4444',
    marginTop: '6px',
  }

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Numele este obligatoriu (minim 2 caractere)'
        if (value.trim().length < 2) return 'Numele este obligatoriu (minim 2 caractere)'
        return undefined
      case 'email':
        if (!value.trim()) return 'Adresa de email nu este validă'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Adresa de email nu este validă'
        return undefined
      case 'message':
        if (!value.trim()) return 'Mesajul este obligatoriu (minim 10 caractere)'
        if (value.trim().length < 10) return 'Mesajul este obligatoriu (minim 10 caractere)'
        return undefined
      default:
        return undefined
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const error = validateField(name as keyof FormData, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  return (
    <div>
      {/* Section 1: Hero */}
      <section
        ref={heroRef}
        className="flex items-center"
        style={{
          backgroundColor: '#000000',
          minHeight: '50vh',
          backgroundImage:
            'url(/contact-office.jpg), radial-gradient(ellipse at center, rgba(26,26,26,0.92) 0%, rgba(0,0,0,0.95) 70%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="content-max-width px-4 md:px-8 pt-[72px] w-full">
          <div className="max-w-[800px]">
            <h1
              ref={heroTitleRef}
              className="font-display mt-4"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#f5f0eb',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                textWrap: 'balance',
                willChange: 'transform, opacity',
              }}
            >
              Ia legătura cu noi
            </h1>
            <p
              ref={heroBodyRef}
              className="font-body mt-6 max-w-[650px]"
              style={{
                fontSize: '1.125rem',
                color: '#94a3b8',
                lineHeight: 1.7,
                willChange: 'transform, opacity',
              }}
            >
              Ai o întrebare? Vrei să afli ce servicii ți se potrivesc sau cum
              putem colabora? Trimite-ne un mesaj sau sună-ne direct – discutăm
              deschis, gratuit și fără obligații. Suntem aici să-ți oferim soluții
              clare, indiferent în ce stadiu e afacerea ta.
            </p>
            <a
              ref={heroPhoneRef}
              href="tel:+40723926446"
              className="font-display mt-8 inline-block transition-colors duration-300"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                color: '#c9a87c',
                willChange: 'transform, opacity',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#d4b896'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#c9a87c'
              }}
            >
              +40 723 926 446
            </a>
            <p
              className="font-body mt-2"
              style={{ fontSize: '0.875rem', color: '#94a3b8' }}
            >
              Luni – Vineri, 09:00 – 18:00
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Contact Form & Info */}
      <section
        ref={formSectionRef}
        className="section-padding"
        style={{ backgroundColor: '#f5f0eb' }}
      >
        <div className="content-max-width px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column — Contact Form */}
            <div ref={formRef} className="lg:w-[60%]" style={{ willChange: 'transform, opacity' }}>
              <h2
                className="font-display mb-8"
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  color: '#000000',
                  fontWeight: 400,
                  textWrap: 'balance',
                }}
              >
                Contactează-ne
              </h2>

              {formStatus === 'success' ? (
                <div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #e8e0d8', padding: '64px' }}
                >
                  <Check size={48} style={{ color: '#5c7c6b' }} />
                  <p
                    className="font-body mt-4 font-semibold"
                    style={{ fontSize: '1.25rem', color: '#000000' }}
                  >
                    Mulțumim! Mesajul tău a fost trimis cu succes.
                  </p>
                  <p
                    className="font-body mt-2"
                    style={{ fontSize: '1rem', color: '#4a5568' }}
                  >
                    Te vom contacta în cel mai scurt timp.
                  </p>
                </div>
              ) : (
                <>
                  {submitStatus === 'success' && (
                  <div
                    className="mb-6 p-4"
                    style={{ backgroundColor: 'rgba(92,124,107,0.12)', border: '1px solid #5c7c6b' }}
                  >
                    <p className="font-body text-sm font-medium" style={{ color: '#5c7c6b' }}>
                      Mulțumim! Mesajul tău a fost trimis cu succes. Te contactăm în cel mai scurt timp.
                    </p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div
                    className="mb-6 p-4"
                    style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid #ef4444' }}
                  >
                    <p className="font-body text-sm font-medium" style={{ color: '#ef4444' }}>
                      A apărut o eroare. Te rugăm să încerci din nou.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" style={labelStyle}>
                        Numele tău <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        style={{
                          ...inputBaseStyle,
                          borderColor: errors.name ? '#ef4444' : '#e8e0d8',
                        }}
                        onFocus={(e) => {
                          if (!errors.name) {
                            e.currentTarget.style.borderColor = '#c9a87c'
                          }
                        }}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" style={errorStyle}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" style={labelStyle}>
                        Adresa ta de email <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        style={{
                          ...inputBaseStyle,
                          borderColor: errors.email ? '#ef4444' : '#e8e0d8',
                        }}
                        onFocus={(e) => {
                          if (!errors.email) {
                            e.currentTarget.style.borderColor = '#c9a87c'
                          }
                        }}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" style={errorStyle}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" style={labelStyle}>
                        Subiect
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        style={{
                          ...inputBaseStyle,
                          borderColor: errors.subject ? '#ef4444' : '#e8e0d8',
                        }}
                        onFocus={(e) => {
                          if (!errors.subject) {
                            e.currentTarget.style.borderColor = '#c9a87c'
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.subject) {
                            e.currentTarget.style.borderColor = '#e8e0d8'
                          }
                        }}
                        aria-invalid={errors.subject ? 'true' : 'false'}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                      />
                      {errors.subject && (
                        <p id="subject-error" style={errorStyle}>
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" style={labelStyle}>
                        Mesajul tău <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        aria-required="true"
                        style={{
                          ...inputBaseStyle,
                          borderColor: errors.message ? '#ef4444' : '#e8e0d8',
                          resize: 'vertical',
                        }}
                        onFocus={(e) => {
                          if (!errors.message) {
                            e.currentTarget.style.borderColor = '#c9a87c'
                          }
                        }}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" style={errorStyle}>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Consent checkbox */}
                    <div>
                      <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer">
                        <input
                          id="consent"
                          type="checkbox"
                          checked={formData.consent}
                          onChange={handleConsentChange}
                          className="sr-only"
                          aria-invalid={!!errors.consent}
                        />
                        <span
                          className="shrink-0 mt-0.5 flex items-center justify-center transition-colors duration-200"
                          style={{
                            width: '20px',
                            height: '20px',
                            border: errors.consent
                              ? '1px solid #c94c4c'
                              : '1px solid #e8e0d8',
                            backgroundColor: formData.consent
                              ? '#c9a87c'
                              : '#ffffff',
                          }}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              consent: !prev.consent,
                            }))
                          }
                          role="checkbox"
                          aria-checked={formData.consent}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault()
                              setFormData((prev) => ({
                                ...prev,
                                consent: !prev.consent,
                              }))
                            }
                          }}
                        >
                          {formData.consent && (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2 6L5 9L10 3"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className="font-body"
                          style={{ fontSize: '0.8125rem', color: '#4a5568', lineHeight: 1.5 }}
                        >
                          Sunt de acord cu prelucrarea datelor personale conform{' '}
                          <Link
                            to="/confidentialitate"
                            className="transition-colors duration-300 hover:underline"
                            style={{ color: '#c9a87c' }}
                          >
                            Politicii de Confidențialitate
                          </Link>
                          .
                        </span>
                      </label>
                      {errors.consent && (
                        <p style={{ ...errorStyle, marginLeft: '32px' }}>
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    {/* Submit button */}
                    {/* Honeypot spam protection */}
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-body w-full text-[0.8125rem] font-semibold uppercase tracking-[0.1em] py-[14px] px-8 transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: isSubmitting
                          ? 'rgba(201,168,124,0.7)'
                          : '#c9a87c',
                        color: '#000000',
                        marginTop: '16px',
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          Se trimite...
                        </span>
                      ) : (
                        'TRIMITE'
                      )}
                    </button>

                    {formStatus === 'error' && (
                      <p style={errorStyle} className="text-center">
                        A apărut o eroare. Te rugăm să încerci din nou.
                      </p>
                    )}
                  </div>
                </form>
              </>
              )}
            </div>

            {/* Right Column — Contact Info Cards */}
            <div className="lg:w-[40%] flex flex-col gap-6">
              {/* Card 1 — Phone */}
              <div
                ref={(el) => { infoCardsRef.current[0] = el }}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8e0d8',
                  padding: '48px',
                  willChange: 'transform, opacity',
                }}
              >
                <Phone size={24} style={{ color: '#c9a87c' }} />
                <p
                  className="font-body mt-4 font-semibold"
                  style={{ fontSize: '0.875rem', color: '#000000' }}
                >
                  Telefon
                </p>
                <a
                  href="tel:+40723926446"
                  className="font-body mt-1 inline-block transition-colors duration-300"
                  style={{ fontSize: '1rem', color: '#c9a87c' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#d4b896'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c9a87c'
                  }}
                >
                  +40 723 926 446
                </a>
                <a
                  href="tel:+40723926446"
                  className="font-body mt-2 block transition-colors duration-300"
                  style={{ fontSize: '0.875rem', color: '#4a5568' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#c9a87c'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#4a5568'
                  }}
                >
                  Sună acum
                </a>
              </div>

              {/* Card 2 — Email */}
              <div
                ref={(el) => { infoCardsRef.current[1] = el }}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8e0d8',
                  padding: '48px',
                  willChange: 'transform, opacity',
                }}
              >
                <Mail size={24} style={{ color: '#c9a87c' }} />
                <p
                  className="font-body mt-4 font-semibold"
                  style={{ fontSize: '0.875rem', color: '#000000' }}
                >
                  Email
                </p>
                <a
                  href="mailto:contact@cess.ro"
                  className="font-body mt-1 block transition-colors duration-300"
                  style={{ fontSize: '1rem', color: '#c9a87c' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#d4b896'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c9a87c'
                  }}
                >
                  contact@cess.ro
                </a>
                <a
                  href="mailto:office@cess.ro"
                  className="font-body mt-1 block transition-colors duration-300"
                  style={{ fontSize: '1rem', color: '#c9a87c' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#d4b896'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c9a87c'
                  }}
                >
                  office@cess.ro
                </a>
              </div>

              {/* Card 3 — Address */}
              <div
                ref={(el) => { infoCardsRef.current[2] = el }}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8e0d8',
                  padding: '48px',
                  willChange: 'transform, opacity',
                }}
              >
                <MapPin size={24} style={{ color: '#c9a87c' }} />
                <p
                  className="font-body mt-4 font-semibold"
                  style={{ fontSize: '0.875rem', color: '#000000' }}
                >
                  Adresă
                </p>
                <p
                  className="font-body mt-1"
                  style={{ fontSize: '1rem', color: '#4a5568' }}
                >
                  Strada Viitorului 4, Bloc 4B, Constanța, România
                </p>
                <p
                  className="font-body mt-3 font-medium"
                  style={{ fontSize: '0.875rem', color: '#000000' }}
                >
                  CESS TRUST S.R.L.
                </p>
                <p
                  className="font-body mt-1"
                  style={{ fontSize: '0.75rem', color: '#4a5568' }}
                >
                  CUI: 37449212 | Reg. Com.: J2017001194133
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Social & Alternative Contact */}
      <section
        ref={socialSectionRef}
        className="py-24 md:py-32"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div
          ref={socialContentRef}
          className="content-max-width px-4 md:px-8 text-center"
          style={{ willChange: 'transform, opacity' }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
              color: '#f5f0eb',
              fontWeight: 400,
              textWrap: 'balance',
            }}
          >
            Sau găsește-ne online
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61578833986926"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex items-center gap-2 font-medium transition-all duration-300"
              style={{
                fontSize: '0.875rem',
                color: '#94a3b8',
                border: '1px solid #262626',
                padding: '12px 24px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c9a87c'
                e.currentTarget.style.borderColor = '#c9a87c'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8'
                e.currentTarget.style.borderColor = '#262626'
              }}
            >
              <Facebook size={18} />
              Facebook
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/108608033/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex items-center gap-2 font-medium transition-all duration-300"
              style={{
                fontSize: '0.875rem',
                color: '#94a3b8',
                border: '1px solid #262626',
                padding: '12px 24px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c9a87c'
                e.currentTarget.style.borderColor = '#c9a87c'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8'
                e.currentTarget.style.borderColor = '#262626'
              }}
            >
              <Linkedin size={18} />
              LinkedIn
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/+40723926446"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex items-center gap-2 font-medium transition-all duration-300"
              style={{
                fontSize: '0.875rem',
                color: '#94a3b8',
                border: '1px solid #262626',
                padding: '12px 24px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c9a87c'
                e.currentTarget.style.borderColor = '#c9a87c'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8'
                e.currentTarget.style.borderColor = '#262626'
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: Google Maps Embed */}
      <section
        ref={mapRef}
        className="w-full relative overflow-hidden"
        style={{ backgroundColor: 'var(--obsidian)', willChange: 'transform, opacity' }}
      >
        <div className="w-full" style={{ height: '400px', background: 'var(--obsidian)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11452.0!2d28.6383!3d44.1733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDEwJzI0LjAiTiAyOMKwMzgnMTguMCJF!5e0!3m2!1sro!2sro!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Locație CESS Constanța"
          />
        </div>
      </section>
    </div>
  )
}
