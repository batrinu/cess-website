import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { actionClasses } from '@/components/site/ActionLink'
import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import Section from '@/components/site/Section'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [gdprChecked, setGdprChecked] = useState(false)
  const [gdprError, setGdprError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
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
    <Section tone="vellum" className="border-t border-rule">
      <Container>
        <Reveal>
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="display-3 text-ink">Abonează-te la Newsletter</h2>
              <p className="mt-4 max-w-[46ch] text-base leading-7 text-ink-muted">
                Primești noutăți legislative, informații fiscale și sfaturi practice pentru afacerea ta, direct în inbox!
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {submitted ? (
                <div
                  role="status"
                  className="border border-success-ink/30 bg-alabaster px-6 py-5 text-sm font-medium text-success-ink"
                >
                  Mulțumim! Te-ai abonat cu succes la newsletter-ul CESS.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label htmlFor="home-newsletter-email" className="sr-only">
                    Adresa ta de email
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      id="home-newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Adresa ta de email"
                      required
                      className="min-h-[48px] flex-1 rounded-[2px] border border-border-ui bg-alabaster px-4 py-3 font-body text-base text-ink placeholder:text-ink-muted focus:border-navy"
                    />
                    <button type="submit" className={actionClasses('primary', 'shrink-0')}>
                      ABONEAZĂ-TE
                    </button>
                  </div>

                  <label className="flex min-h-[44px] cursor-pointer items-start gap-3 py-1 text-sm leading-6 text-ink-muted">
                    <input
                      type="checkbox"
                      checked={gdprChecked}
                      onChange={(e) => {
                        setGdprChecked(e.target.checked)
                        if (e.target.checked) setGdprError(false)
                      }}
                      aria-invalid={Boolean(gdprError)}
                      aria-describedby={gdprError ? 'newsletter-gdpr-error' : undefined}
                      className="mt-1 h-5 w-5 shrink-0 accent-navy"
                    />
                    <span>
                      Sunt de acord să primesc newsletter-ul și să fiu contactat conform{' '}
                      <Link
                        to="/confidentialitate"
                        className="font-medium text-copper-ink underline underline-offset-4 hover:text-navy"
                      >
                        Politicii de confidențialitate
                      </Link>
                      .
                    </span>
                  </label>

                  {gdprError && (
                    <p id="newsletter-gdpr-error" role="alert" className="text-sm font-medium text-error-ink">
                      Trebuie să accepti politica de confidențialitate.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
