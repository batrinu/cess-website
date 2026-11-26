import { Check } from 'lucide-react'
import Section from '@/components/site/Section'
import Container from '@/components/site/Container'
import Reveal from '@/components/site/Reveal'
import ActionLink from '@/components/site/ActionLink'

const checkmarks = [
  {
    title: 'Expertiză aplicată:',
    text: 'Lucrăm cu specialiști certificați, cu know-how în multiple industrii și în provocările concrete ale antreprenorilor.',
  },
  {
    title: 'Tehnologie inteligentă:',
    text: 'Platforma noastră digitală te ajută să gestionezi SSM, PSI sau GDPR cu un singur click. Poți alege să lucrezi cu echipa ta sau să lași totul în grija experților noștri.',
  },
  {
    title: 'Flexibilitate totală:',
    text: 'Fie că ai nevoie de un singur serviciu sau de un pachet complet (SSM, PSI, GDPR, contabilitate), îți oferim opțiuni personalizate, în funcție de buget, echipă și gradul de autonomie dorit.',
  },
  {
    title: 'Confidențialitate și siguranță:',
    text: 'Datele tale sunt protejate prin protocoale stricte și soluții de securitate de ultimă generație – pentru că încrederea se construiește prin fapte.',
  },
]

export default function CineSuntem() {
  return (
    <Section tone="vellum">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display-2 mb-7 text-ink">Cine suntem?</h2>

            <div className="max-w-[62ch] space-y-4 text-lg leading-8 text-ink-muted">
              <p>
                La CESS, suntem mai mult decât un furnizor de servicii. Suntem un centru digital
                integrat de suport legal și administrativ, creat pentru antreprenorii care vor să
                rămână conformi și eficienți.
              </p>
              <p>
                Îmbinăm experiența reală din teren cu avantajele tehnologiei moderne, oferindu-ți
                un pachet complet de servicii pentru conformare legală – simplu, rapid și accesibil
                de oriunde.
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {checkmarks.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <Check
                    size={18}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-success-ink"
                  />
                  <p className="font-body text-base font-medium leading-7 text-ink">
                    <strong className="font-semibold text-ink">{item.title}</strong>{' '}
                    <span className="font-normal text-ink-muted">{item.text}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-[62ch] font-body text-base font-medium leading-7 text-ink">
              Alegând CESS, alegi un partener digital de încredere care traduce realitatea
              business-ului tău în obligații legale ușor de gestionat.
            </p>

            <div className="mt-8">
              <ActionLink to="/contact">Programează o consultație gratuită</ActionLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="mx-auto w-full max-w-[520px] border border-rule bg-alabaster p-5 sm:p-8 lg:ml-auto">
              <div className="aspect-[4/3] w-full">
                <svg
                  viewBox="0 0 400 300"
                  fill="none"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="cess-editorial-grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        className="text-rule"
                      />
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="url(#cess-editorial-grid)" />
                  <rect
                    x="40"
                    y="30"
                    width="320"
                    height="240"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className="text-navy"
                  />
                  <rect
                    x="64"
                    y="54"
                    width="272"
                    height="192"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-rule"
                  />
                  <line
                    x1="200"
                    y1="54"
                    x2="200"
                    y2="246"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="text-rule"
                  />
                  <line
                    x1="64"
                    y1="150"
                    x2="336"
                    y2="150"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="text-rule"
                  />
                  <circle
                    cx="200"
                    cy="150"
                    r="68"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    className="text-copper"
                  />
                  <circle
                    cx="200"
                    cy="150"
                    r="44"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeDasharray="3 4"
                    className="text-navy"
                  />
                  <path
                    d="M 40 44 V 30 H 54 M 346 30 H 360 V 44 M 40 256 V 270 H 54 M 346 270 H 360 V 256"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className="text-copper"
                  />
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
