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
import { cn } from '@/lib/utils'
import Container from '@/components/site/Container'
import Section from '@/components/site/Section'
import { actionClasses } from '@/components/site/ActionLink'
import Reveal from '@/components/site/Reveal'

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

const inputClassName =
  'min-h-[48px] w-full rounded-[2px] border border-border-ui bg-alabaster px-4 py-3 font-body text-base text-ink transition-colors placeholder:text-ink-muted focus:border-navy'
const labelClassName = 'mb-2 block font-body text-sm font-medium text-ink'
const errorClassName = 'mt-2 font-body text-sm font-medium text-error-ink'
const socialButtonClassName =
  'inline-flex min-h-[48px] items-center justify-center gap-3 rounded-[2px] border border-on-dark/55 px-6 py-3 font-body text-sm font-semibold text-on-dark transition-colors hover:bg-on-dark hover:text-navy'

export default function Contact() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (mapLoaded || typeof IntersectionObserver === 'undefined') return
    const target = mapSectionRef.current
    if (!target) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMapLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [mapLoaded])

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
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)
    setFormStatus('submitting')

    // TODO(email): there is no backend for this form yet. Until one exists, hand the
    // enquiry to the visitor's mail client rather than pretending it was sent — the
    // previous version waited 1500ms and showed "trimis cu succes" while silently
    // discarding every message. Do not restore that. See NOTES.md.
    const subject = formData.subject
      ? `Cerere de pe site: ${formData.subject}`
      : 'Cerere de pe site'

    const body = [
      `Nume: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.subject ? `Subiect: ${formData.subject}` : null,
      '',
      formData.message,
    ]
      .filter((line) => line !== null)
      .join('\n')

    window.location.href =
      `mailto:contact@cess.ro?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    setIsSubmitting(false)
    setFormStatus('success')
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const validateField = (
    name: keyof FormData,
    value: string,
  ): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Numele este obligatoriu (minim 2 caractere)'
        if (value.trim().length < 2)
          return 'Numele este obligatoriu (minim 2 caractere)'
        return undefined
      case 'email':
        if (!value.trim()) return 'Adresa de email nu este validă'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return 'Adresa de email nu este validă'
        return undefined
      case 'message':
        if (!value.trim()) return 'Mesajul este obligatoriu (minim 10 caractere)'
        if (value.trim().length < 10)
          return 'Mesajul este obligatoriu (minim 10 caractere)'
        return undefined
      default:
        return undefined
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    const error = validateField(name as keyof FormData, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  return (
    <div>
      {/* Section 1: Light Asymmetric Hero */}
      <section className="border-b border-rule bg-alabaster pt-28 pb-14 md:pt-36 md:pb-20">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="editorial-eyebrow mb-4 text-copper-ink">CONTACT</p>
            <h1 className="display-2 text-ink">Ia legătura cu noi</h1>
            <p className="mt-5 max-w-[60ch] text-lg leading-8 text-ink-muted">
              Ai o întrebare? Vrei să afli ce servicii ți se potrivesc sau cum
              putem colabora? Trimite-ne un mesaj sau sună-ne direct – discutăm
              deschis, gratuit și fără obligații. Suntem aici să-ți oferim
              soluții clare, indiferent în ce stadiu e afacerea ta.
            </p>
            <div className="mt-7">
              <a
                href="tel:+40723926446"
                className="inline-flex min-h-[44px] items-center font-display text-2xl tabular-nums text-navy transition-colors hover:text-copper-ink md:text-3xl"
              >
                +40 723 926 446
              </a>
              <p className="mt-1 font-body text-sm tabular-nums text-ink-muted">
                Luni – Vineri, 09:00 – 18:00
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[16/10] overflow-hidden border border-rule bg-stone">
              <img
                src="/contact-office-960.webp"
                srcSet="/contact-office-480.webp 480w, /contact-office-760.webp 760w, /contact-office-960.webp 960w"
                sizes="(max-width: 1023px) calc(100vw - 40px), 480px"
                width={960}
                height={536}
                alt="Biroul CESS TRUST din Constanța"
                className="h-full w-full object-cover"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Section 2: Contact Form & Info */}
      <Section tone="vellum">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column — Contact Form */}
            <Reveal className="lg:col-span-7">
              <h2 className="display-3 mb-8 text-ink">Contactează-ne</h2>

              {formStatus === 'success' ? (
                <div
                  role="status"
                  className="flex flex-col items-center justify-center border border-navy bg-alabaster p-6 text-center sm:p-10"
                >
                  <Check
                    size={40}
                    className="text-success-ink"
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-body text-xl font-semibold text-ink">
                    Ți-am pregătit mesajul în aplicația ta de email.
                  </p>
                  <p className="mt-2 max-w-[46ch] font-body text-base leading-7 text-ink-muted">
                    Mai apasă o dată „Trimite” acolo și ajunge la noi. Dacă nu
                    s-a deschis nimic, scrie-ne direct la{' '}
                    <a
                      href="mailto:contact@cess.ro"
                      className="font-medium text-copper-ink underline underline-offset-2 hover:text-navy"
                    >
                      contact@cess.ro
                    </a>{' '}
                    sau sună la{' '}
                    <a
                      href="tel:+40723926446"
                      className="font-medium tabular-nums text-copper-ink underline underline-offset-2 hover:text-navy"
                    >
                      +40 723 926 446
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <>
                  {formStatus === 'error' && (
                    <div
                      role="alert"
                      className="mb-6 border border-error-ink bg-alabaster p-4"
                    >
                      <p className="font-body text-sm font-medium text-error-ink">
                        A apărut o eroare. Te rugăm să încerci din nou.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className={labelClassName}>
                          Numele tău{' '}
                          <span className="text-error-ink" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          aria-required="true"
                          className={cn(
                            inputClassName,
                            errors.name &&
                              'border-error-ink focus:border-error-ink',
                          )}
                          aria-invalid={errors.name ? 'true' : 'false'}
                          aria-describedby={
                            errors.name ? 'name-error' : undefined
                          }
                        />
                        {errors.name && (
                          <p id="name-error" className={errorClassName}>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className={labelClassName}>
                          Adresa ta de email{' '}
                          <span className="text-error-ink" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          aria-required="true"
                          className={cn(
                            inputClassName,
                            errors.email &&
                              'border-error-ink focus:border-error-ink',
                          )}
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={
                            errors.email ? 'email-error' : undefined
                          }
                        />
                        {errors.email && (
                          <p id="email-error" className={errorClassName}>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className={labelClassName}>
                          Subiect
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={cn(
                            inputClassName,
                            errors.subject &&
                              'border-error-ink focus:border-error-ink',
                          )}
                          aria-invalid={errors.subject ? 'true' : 'false'}
                          aria-describedby={
                            errors.subject ? 'subject-error' : undefined
                          }
                        />
                        {errors.subject && (
                          <p id="subject-error" className={errorClassName}>
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className={labelClassName}>
                          Mesajul tău{' '}
                          <span className="text-error-ink" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          aria-required="true"
                          className={cn(
                            inputClassName,
                            'resize-y',
                            errors.message &&
                              'border-error-ink focus:border-error-ink',
                          )}
                          aria-invalid={errors.message ? 'true' : 'false'}
                          aria-describedby={
                            errors.message ? 'message-error' : undefined
                          }
                        />
                        {errors.message && (
                          <p id="message-error" className={errorClassName}>
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Consent checkbox */}
                      <div>
                        <label
                          htmlFor="consent"
                          className="flex cursor-pointer items-start gap-3"
                        >
                          <input
                            id="consent"
                            type="checkbox"
                            checked={formData.consent}
                            onChange={handleConsentChange}
                            className="sr-only peer"
                            aria-invalid={!!errors.consent}
                            aria-describedby={
                              errors.consent ? 'consent-error' : undefined
                            }
                          />
                          {/* Presentational only. The real <input> above is inside this
                              <label>, so it already handles click, Space and focus — giving
                              this span its own role/tabIndex/onClick made it a second control
                              that toggled the state back again, so the box could never be ticked. */}
                          <span
                            aria-hidden="true"
                            className={cn(
                              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-200 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-copper-ink',
                              formData.consent
                                ? 'border-navy bg-navy text-on-dark'
                                : errors.consent
                                  ? 'border-error-ink bg-alabaster'
                                  : 'border-border-ui bg-alabaster',
                            )}
                          >
                            {formData.consent && (
                              <Check
                                size={14}
                                strokeWidth={2.5}
                                aria-hidden="true"
                              />
                            )}
                          </span>
                          <span className="font-body text-sm leading-6 text-ink-muted">
                            Sunt de acord cu prelucrarea datelor personale
                            conform{' '}
                            <Link
                              to="/confidentialitate"
                              className="font-medium text-copper-ink underline underline-offset-2 transition-colors hover:text-navy"
                            >
                              Politicii de Confidențialitate
                            </Link>
                            .
                          </span>
                        </label>
                        {errors.consent && (
                          <p
                            id="consent-error"
                            className={cn(errorClassName, 'ml-8')}
                          >
                            {errors.consent}
                          </p>
                        )}
                      </div>

                      {/* Honeypot spam protection */}
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={actionClasses(
                          'primary',
                          'mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60',
                        )}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2
                              size={16}
                              className="animate-spin"
                              aria-hidden="true"
                            />
                            Se trimite...
                          </span>
                        ) : (
                          'TRIMITE'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Reveal>

            {/* Right Column — Flat Ruled Contact Info */}
            <Reveal
              delay={120}
              className="lg:col-span-4 lg:col-start-9"
            >
              {/* Phone */}
              <div className="border-t border-rule py-7">
                <Phone
                  size={20}
                  className="text-copper-ink"
                  aria-hidden="true"
                />
                <p className="mt-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                  Telefon
                </p>
                <a
                  href="tel:+40723926446"
                  className="mt-2 inline-flex min-h-[44px] items-center font-body text-base font-medium tabular-nums text-navy transition-colors hover:text-copper-ink"
                >
                  +40 723 926 446
                </a>
                <div>
                  <a
                    href="tel:+40723926446"
                    className="inline-flex min-h-[44px] items-center font-body text-sm text-ink-muted underline underline-offset-2 transition-colors hover:text-copper-ink"
                  >
                    Sună acum
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="border-t border-rule py-7">
                <Mail
                  size={20}
                  className="text-copper-ink"
                  aria-hidden="true"
                />
                <p className="mt-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                  Email
                </p>
                <div className="mt-2 flex flex-col items-start">
                  <a
                    href="mailto:contact@cess.ro"
                    className="inline-flex min-h-[44px] items-center font-body text-base font-medium text-navy transition-colors hover:text-copper-ink"
                  >
                    contact@cess.ro
                  </a>
                  <a
                    href="mailto:office@cess.ro"
                    className="inline-flex min-h-[44px] items-center font-body text-base font-medium text-navy transition-colors hover:text-copper-ink"
                  >
                    office@cess.ro
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="border-t border-b border-rule py-7">
                <MapPin
                  size={20}
                  className="text-copper-ink"
                  aria-hidden="true"
                />
                <p className="mt-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                  Adresă
                </p>
                <p className="mt-2 font-body text-base leading-7 text-ink-muted">
                  Strada Viitorului 4, Bloc 4B, Constanța, România
                </p>
                <p className="mt-3 font-body text-sm font-semibold text-ink">
                  CESS TRUST S.R.L.
                </p>
                <p className="mt-1 font-body text-xs tabular-nums text-ink-muted">
                  CUI: 37449212 | Reg. Com.: J2017001194133
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Section 3: Social & Alternative Contact */}
      <Section tone="navy">
        <Container className="text-center">
          <Reveal>
            <h2 className="display-3 text-on-dark">Sau găsește-ne online</h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61578833986926"
                target="_blank"
                rel="noopener noreferrer"
                className={socialButtonClassName}
              >
                <Facebook size={18} aria-hidden="true" />
                Facebook
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/108608033/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialButtonClassName}
              >
                <Linkedin size={18} aria-hidden="true" />
                LinkedIn
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/+40723926446"
                target="_blank"
                rel="noopener noreferrer"
                className={socialButtonClassName}
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
                  aria-hidden="true"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
                WhatsApp
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Section 4: Google Maps Embed (deferred until scrolled into view) */}
      <section ref={mapSectionRef} className="border-t border-rule bg-alabaster">
        <div className="h-[380px] w-full md:h-[420px]">
          {mapLoaded ? (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11452.0!2d28.6383!3d44.1733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDEwJzI0LjAiTiAyOMKwMzgnMTguMCJF!5e0!3m2!1sro!2sro!4v1"
              width="100%"
              height="100%"
              className="block h-full w-full border-0 grayscale-[0.45] contrast-[0.95] sepia-[0.08]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locație CESS Constanța"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-vellum px-6 text-center">
              <MapPin className="h-7 w-7 text-copper-ink" strokeWidth={1.75} aria-hidden="true" />
              <p className="font-display text-2xl text-ink">
                Str. Mircea cel Bătrân nr. 103, Constanța
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-[2px] bg-navy px-6 py-3 font-body text-sm font-semibold text-on-dark transition-colors hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                >
                  Încarcă harta interactivă
                </button>
                <a
                  href="https://maps.google.com/?q=44.1733,28.6383"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center px-3 font-body text-sm font-semibold text-navy underline underline-offset-4 hover:text-copper-ink"
                >
                  Deschide în Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
