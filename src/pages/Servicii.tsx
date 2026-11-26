import type { FC, JSX } from 'react'
import {
  Calculator,
  FileCheck,
  Shield,
  HardHat,
  Users,
  Building2,
  Flame,
  Check,
  Lightbulb,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import Container from '@/components/site/Container'
import Section from '@/components/site/Section'
import SectionHeading from '@/components/site/SectionHeading'
import ActionLink from '@/components/site/ActionLink'
import Reveal from '@/components/site/Reveal'

/* ------------------------------------------------------------------ */
/*  Icon map                                                           */
/* ------------------------------------------------------------------ */

const serviceIcons: Record<string, FC<LucideProps>> = {
  contabilitate: Calculator,
  fiscalitate: FileCheck,
  gdpr: Shield,
  ssm: HardHat,
  salarizare: Users,
  'securitate-fizica': Building2,
  psi: Flame,
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ServiceData {
  id: string
  title: string
  subtitle: string
  intro: string
  checkmarks?: string[]
  label: string
  items: string[]
  callout?: string
  closing: string
  ctaText: string
  ctas: { text: string; primary: boolean; to: string }[]
  layout: 'text-left' | 'text-right'
  textSpan: 5 | 6 | 7
  image?: string
}

/* ------------------------------------------------------------------ */
/*  Data — ALL 7 SERVICES with COMPLETE content                        */
/* ------------------------------------------------------------------ */

const services: ServiceData[] = [
  {
    id: 'contabilitate',
    title: 'Contabilitate financiară și de gestiune',
    subtitle: 'Control complet, fără griji contabile',
    intro:
      'La CESS, știm că o contabilitate organizată înseamnă mai mult decât cifre corecte – înseamnă decizii mai bune, prevenirea riscurilor și creștere sănătoasă. Tocmai de aceea, îți oferim un sistem complet de contabilitate financiară și de gestiune, adaptat realității business-ului tău.',
    checkmarks: [
      'Servicii digitale și livrate de la distanță',
      'Echipa noastră acoperă toate tipurile de activități și forme juridice',
      'Flexibilitate maximă: putem lucra în softul tău sau în aplicația noastră',
    ],
    label: 'Serviciile noastre includ:',
    items: [
      'Înregistrarea documentelor contabile',
      'Întocmirea și actualizarea registrelor obligatorii',
      'Calculul și evidențierea corectă a obligațiilor fiscale',
      'Contabilitate de gestiune și analize periodice',
      'Rapoarte financiare clare, utile pentru decizii rapide',
    ],
    callout:
      'Ai acces la tot în timp real, dintr-un singur loc – fără dosare, fără întârzieri.',
    closing: 'Cu CESS, contabilitatea devine un proces eficient și previzibil.',
    ctaText:
      'Programează o discuție gratuită și vezi cum putem optimiza evidențele financiare ale firmei tale.',
    ctas: [
      {
        text: 'Programează o discuție gratuită',
        primary: true,
        to: '/contact',
      },
      { text: 'CONTACTEAZĂ-NE', primary: false, to: '/contact' },
    ],
    layout: 'text-left',
    textSpan: 7,
  },
  {
    id: 'fiscalitate',
    title: 'Consultanță fiscală și depunerea declarațiilor',
    subtitle: 'Siguranță fiscală, zero surprize',
    intro:
      'Navigarea prin fiscalitate nu trebuie să te streseze. La CESS, îți oferim consultanță clară și practică, ca să te asiguri că ești mereu conform cu legea și că iei decizii corecte din punct de vedere fiscal.',
    checkmarks: [
      'Specialiști dedicați care îți cunosc industria',
      'Actualizări permanente la modificările din Codul Fiscal',
      'Declarații corecte, depuse la timp – fără amenzi sau penalizări',
    ],
    label: 'Serviciile noastre includ:',
    items: [
      'Consultanță fiscală generală și specifică (TVA, impozit profit, micro etc.)',
      'Simulări și analize de impact fiscal înainte de decizii importante',
      'Întocmirea și depunerea tuturor declarațiilor fiscale obligatorii',
      'Asistență în cazul controalelor ANAF',
      'Suport permanent prin aplicația CESS sau direct cu echipa noastră',
    ],
    callout: 'Totul este gândit pentru a preveni riscuri și a economisi bani.',
    closing: 'Cu CESS, fiscalitatea nu te mai ia prin surprindere.',
    ctaText:
      'Programează o discuție gratuită și vezi dacă ești 100% conform.',
    ctas: [{ text: 'Contactează-ne', primary: true, to: '/contact' }],
    layout: 'text-right',
    textSpan: 6,
  },
  {
    id: 'gdpr',
    title: 'Protecția Datelor cu Caracter Personal (GDPR)',
    subtitle: 'Siguranță, Conformare, Liniște',
    intro:
      'La CESS știm cât de importantă este protejarea datelor personale – pentru clienții tăi, pentru angajați și pentru afacerea ta. Tocmai de aceea, îți oferim soluții complete, flexibile și ușor de implementat, astfel încât să respecți legislația în vigoare fără stres și fără riscuri.',
    checkmarks: [
      'Servicii digitale și personalizate',
      'Echipă de experți în conformare GDPR',
      'Posibilitatea de a lucra cu aplicația noastră sau cu suport uman',
    ],
    label: 'Ce putem face pentru tine?',
    items: [
      'Audit de conformitate GDPR',
      'Implementarea măsurilor de securitate necesare',
      'Întocmirea tuturor documentelor cerute de lege',
      'Instruirea angajaților',
      'Consultanță continuă și actualizări legislative',
    ],
    callout: undefined,
    closing:
      'Totul adaptat la specificul firmei tale, la modul în care lucrezi și la nivelul de implicare dorit: faci tu (cu ajutorul aplicației) sau facem noi pentru tine.',
    ctaText:
      'Programează o discuție gratuită și vezi cum putem face lucrurile mai ușoare pentru tine.',
    ctas: [{ text: 'Contactează-ne', primary: true, to: '/contact' }],
    layout: 'text-left',
    textSpan: 6,
    image: '/service-gdpr.jpg',
  },
  {
    id: 'ssm',
    title: 'Securitate și Sănătate în Muncă (SSM)',
    subtitle: 'Legal, organizat, fără hârtii inutile',
    intro:
      'SSM nu trebuie să fie o corvoadă. La CESS îți oferim servicii complete, clare și conforme, astfel încât să respecți toate obligațiile legale fără stres, fără hârtii inutile și fără riscul de amenzi.',
    checkmarks: undefined,
    label:
      'Te ajutăm să fii 100% conform, simplu și fără dureri de cap:',
    items: [
      'Evaluarea riscurilor profesionale',
      'Elaborarea planurilor de prevenire și protecție',
      'Instruirea personalului',
      'Suport în relația cu autoritățile',
      'Audituri, simulări de inspecție, documentație completă',
      'Acte de autorizare și evidențe cerute de lege',
    ],
    callout: undefined,
    closing:
      'Cu CESS, SSM devine un proces organizat, digitalizat și adaptat realității din teren. Ne ocupăm noi de tot, ca tu să te ocupi de business.',
    ctaText:
      'Programează o discuție gratuită cu un specialist SSM și află ce pași trebuie să urmezi pentru a fi conform 100%.',
    ctas: [{ text: 'Contactează-ne', primary: true, to: '/contact' }],
    layout: 'text-right',
    textSpan: 7,
    image: '/service-ssm.jpg',
  },
  {
    id: 'salarizare',
    title: 'Servicii de Salarizare și Operare REGES',
    subtitle: 'HR organizat și corect',
    intro:
      'Gestionarea angajaților nu trebuie să-ți consume timpul și energia. La CESS îți oferim soluții complete pentru salarizare, administrarea personalului și operare REGES – rapid, eficient și 100% conform cu legislația muncii.\n\nIndiferent dacă ai o echipă mică sau administrezi mai multe puncte de lucru, îți punem la dispoziție un sistem clar și sigur pentru tot ce ține de resurse umane. Poți să lași totul în grija specialiștilor noștri sau poți alege să lucrăm prin intermediul soluției software pe care o utilizezi.',
    checkmarks: undefined,
    label: 'Ne ocupăm de tot ce ține de salarizare și relații de muncă:',
    items: [
      'Operare REGES (contracte și modificări)',
      'Calcul salarii, întocmire state de plată',
      'Administrarea concediilor și beneficiilor',
      'Întocmirea actelor de personal (contracte, decizii etc.)',
      'Consultanță în legislația muncii',
    ],
    callout: undefined,
    closing:
      'Cu CESS, ai siguranța că toate procesele de HR sunt conforme, transparente și bine organizate. Te ajutăm să eviți erorile, amenzile și stresul birocratic – ca tu să te poți concentra pe ceea ce contează: oamenii și business-ul tău.',
    ctaText:
      'Programează o discuție gratuită și vezi cum poți simplifica administrarea resurselor umane.',
    ctas: [{ text: 'Contactează-ne', primary: true, to: '/contact' }],
    layout: 'text-left',
    textSpan: 7,
  },
  {
    id: 'securitate-fizica',
    title: 'Evaluare de Risc la Securitate Fizică',
    subtitle: 'Prevenție reală, nu doar formală',
    intro:
      'La CESS știm că securitatea fizică nu înseamnă doar camere de supraveghere și pază. Înseamnă prevenție reală, protejarea angajaților și a activelor, dar și conformitate cu reglementările legale.\n\nTocmai de aceea, îți oferim un serviciu complet de evaluare a riscurilor de securitate fizică – adaptat specificului afacerii tale, spațiilor pe care le administrezi și tipului de activitate.\n\nLucrăm alături de tine pentru a identifica vulnerabilitățile reale, a propune măsuri eficiente și a implementa planuri clare, care chiar funcționează în practică.',
    checkmarks: undefined,
    label: 'Serviciile includ:',
    items: [
      'Evaluarea riscurilor de securitate fizică (conform HG 301/2012)',
      'Elaborarea de planuri personalizate de securitate și protecție',
      'Consultanță strategică în măsuri de prevenție și reacție',
      'Audituri de securitate și verificări periodice',
      'Instruirea personalului privind siguranța fizică și comportamentul în situații de risc',
    ],
    callout: undefined,
    closing:
      'Cu noi, ai mai mult decât un raport pe hârtie – ai un partener care înțelege că siguranța reală înseamnă planificare, tehnologie și expertiză.',
    ctaText:
      'Programează o discuție gratuită cu un consultant în securitate și vezi ce ai de făcut pentru a-ți proteja eficient spațiile, angajații și bunurile.',
    ctas: [{ text: 'Contactează-ne', primary: true, to: '/contact' }],
    layout: 'text-right',
    textSpan: 5,
  },
  {
    id: 'psi',
    title: 'Prevenirea și Stingerea Incendiilor (PSI)',
    subtitle: 'Siguranță reală, nu doar pe hârtie',
    intro:
      'La CESS, înțelegem că siguranța nu e doar o obligație legală, ci o responsabilitate reală față de oameni, spații și afacerea ta. De aceea, îți oferim servicii complete de Prevenire și Stingere a Incendiilor – conforme cu legislația, adaptate specificului activității tale și ușor de pus în practică.\n\nFie că vrei să externalizezi complet procesul sau să colaborezi prin aplicația noastră, ai acces la o echipă de specialiști autorizați care știu exact ce trebuie făcut – simplu, clar și eficient.',
    checkmarks: undefined,
    label: 'Ce îți oferim concret:',
    items: [
      'Elaborarea completă a documentației PSI – planuri de evacuare, instrucțiuni interne, registre de control etc.',
      'Instruirea angajaților, teoretic și practic, în funcție de riscurile reale din spațiul tău',
      'Simulări și exerciții periodice de evacuare – nu doar bifate, ci utile',
      'Consultanță continuă, adaptată modificărilor legislative sau structurii tale de business',
      'Verificări periodice și audituri PSI – pentru liniștea ta și siguranța oamenilor',
      'Asistență în obținerea avizelor și autorizațiilor ISU – fără drumuri inutile, fără blocaje',
    ],
    callout: undefined,
    closing:
      'Cu CESS, ai siguranța că faci lucrurile ca la carte și că, în caz de control sau urgență reală, ești pregătit.',
    ctaText:
      'Programează o discuție gratuită și vezi cum putem face ca siguranța să devină parte integrantă din strategia ta de conformare.',
    ctas: [{ text: 'Contactează-ne', primary: true, to: '/contact' }],
    layout: 'text-left',
    textSpan: 6,
    image: '/service-psi.jpg',
  },
]

/* ------------------------------------------------------------------ */
/*  Hero checklist                                                     */
/* ------------------------------------------------------------------ */

const heroPoints = [
  'Acoperim integral: contabilitate, fiscalitate, GDPR, SSM, securitate fizică, salarizare, REGES, PSI',
  'Lucrăm digitalizat, cu trasabilitate completă',
  'Poți colabora 100% de la distanță, prin aplicația noastră sau cu suport uman',
]

/* ------------------------------------------------------------------ */
/*  App CESS Section Data                                              */
/* ------------------------------------------------------------------ */

const appFeatures = [
  '**SSM, PSI și GDPR** – documente, evidențe, fișe, planuri, alerte automate;',
  '**Termene-limită și alerte automate** – nu mai ratezi nimic important;',
  '**Acces securizat și control pe roluri** – echipa ta poate colabora eficient;',
  '**Modele de documente actualizate** – întotdeauna conforme cu legislația;',
  '**Control pe roluri și colaborare eficientă**',
  '**Audit intern pregătit automat** – în caz de control, ești acoperit;',
]

/* ------------------------------------------------------------------ */
/*  Tailwind-safe grid class lookups                                   */
/* ------------------------------------------------------------------ */

const textLeftTextClasses: Record<number, string> = {
  5: 'lg:col-span-5 lg:col-start-1 order-1',
  6: 'lg:col-span-6 lg:col-start-1 order-1',
  7: 'lg:col-span-7 lg:col-start-1 order-1',
}

const textLeftImageClasses: Record<number, string> = {
  5: 'lg:col-span-5 order-2 lg:order-2',
  6: 'lg:col-span-6 order-2 lg:order-2',
  7: 'lg:col-span-7 order-2 lg:order-2',
}

const textRightTextClasses: Record<number, string> = {
  5: 'lg:col-span-5 lg:col-start-8 order-1 lg:order-2',
  6: 'lg:col-span-6 lg:col-start-7 order-1 lg:order-2',
  7: 'lg:col-span-7 lg:col-start-6 order-1 lg:order-2',
}

const textRightImageClasses: Record<number, string> = {
  5: 'lg:col-span-7 lg:col-start-1 order-2 lg:order-1',
  6: 'lg:col-span-6 lg:col-start-1 order-2 lg:order-1',
  7: 'lg:col-span-5 lg:col-start-1 order-2 lg:order-1',
}

/* ------------------------------------------------------------------ */
/*  Reusable Button                                                    */
/* ------------------------------------------------------------------ */

function CTAButton({
  text,
  primary,
  to,
  large = false,
}: {
  text: string
  primary: boolean
  to: string
  large?: boolean
}) {
  return (
    <ActionLink
      to={to}
      variant={primary ? 'primary' : 'secondary'}
      className={large ? 'min-h-[54px] px-9' : undefined}
    >
      {text}
    </ActionLink>
  )
}

/* ------------------------------------------------------------------ */
/*  Helper: Parse bold markdown (**text**) into React elements         */
/* ------------------------------------------------------------------ */

function parseBold(text: string): (string | JSX.Element)[] {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-on-dark">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

/* ------------------------------------------------------------------ */
/*  Service Section                                                    */
/* ------------------------------------------------------------------ */

function ServiceSection({
  service,
  index,
}: {
  service: ServiceData
  index: number
}) {
  const isTextLeft = service.layout === 'text-left'
  const textSpan = service.textSpan
  const imageSpan = 12 - textSpan

  const textClass = isTextLeft
    ? textLeftTextClasses[textSpan]
    : textRightTextClasses[textSpan]

  const imageClass = isTextLeft
    ? textLeftImageClasses[imageSpan]
    : textRightImageClasses[imageSpan]

  const IconComponent = serviceIcons[service.id]
  const introParagraphs = service.intro.split('\n\n')

  return (
    <Section
      id={service.id}
      tone={index % 2 === 0 ? 'alabaster' : 'vellum'}
      className="scroll-mt-24 border-b border-rule"
    >
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* ── Text column (always first on mobile) ── */}
            <div className={textClass}>
              <p
                aria-hidden="true"
                className="font-display italic text-2xl text-copper-ink tabular-nums mb-2"
              >
                {String(index + 1).padStart(2, '0')}
              </p>

              <h2 className="display-3 text-ink mb-3">{service.title}</h2>

              <p className="font-display text-xl italic text-navy mb-6">
                {service.subtitle}
              </p>

              {introParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="max-w-[65ch] text-base leading-7 text-ink-muted mb-5"
                >
                  {para}
                </p>
              ))}

              {service.checkmarks && service.checkmarks.length > 0 && (
                <ul className="space-y-3 mb-6 max-w-[65ch]">
                  {service.checkmarks.map((cm, i) => (
                    <li
                      key={i}
                      className="text-base leading-7 text-ink-muted flex items-start gap-3"
                    >
                      <Check
                        size={18}
                        strokeWidth={2.5}
                        aria-hidden="true"
                        className="mt-1 text-success-ink shrink-0"
                      />
                      <span>{cm}</span>
                    </li>
                  ))}
                </ul>
              )}

              <p className="font-body text-base font-semibold text-ink mb-3 max-w-[65ch]">
                {service.label}
              </p>

              <ul className="space-y-3 mb-8 max-w-[65ch]">
                {service.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-base leading-7 text-ink-muted flex items-start gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-copper"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {service.callout && (
                <div className="mb-6 flex items-start gap-3 border border-rule bg-stone/60 p-4 max-w-[65ch]">
                  <Lightbulb
                    size={20}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-copper-ink"
                  />
                  <p className="text-sm font-medium leading-6 text-copper-ink">
                    {service.callout}
                  </p>
                </div>
              )}

              <p className="max-w-[65ch] text-base leading-7 text-ink-muted mb-5">
                {service.closing}
              </p>

              <p className="max-w-[65ch] text-base leading-7 text-ink-muted mb-6">
                {service.ctaText}
              </p>

              <div className="flex flex-wrap gap-4">
                {service.ctas.map((cta, i) => (
                  <CTAButton
                    key={i}
                    text={cta.text}
                    primary={cta.primary}
                    to={cta.to}
                  />
                ))}
              </div>
            </div>

            {/* ── Media column (always second on mobile) ── */}
            <div className={imageClass}>
              {service.image ? (
                <div className="overflow-hidden border border-rule bg-stone aspect-[16/10]">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className={`h-full w-full object-cover ${
                      service.id === 'gdpr' ? 'saturate-[0.55] contrast-[0.95]' : ''
                    }`}
                  />
                </div>
              ) : (
                <div className="border border-rule bg-stone/70 p-8 md:p-10 flex flex-col justify-between aspect-[16/10]">
                  <div>
                    {IconComponent && (
                      <IconComponent
                        size={44}
                        strokeWidth={1.3}
                        aria-hidden="true"
                        className="text-navy"
                      />
                    )}
                  </div>
                  <div>
                    <div aria-hidden="true" className="mb-4 h-px w-12 bg-copper" />
                    <p className="font-display text-2xl text-ink leading-snug">
                      {service.title}
                    </p>
                    <p className="mt-1.5 text-sm text-ink-muted">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function Servicii() {
  return (
    <div>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero                                             */}
      {/* ============================================================ */}
      <section className="bg-alabaster pt-28 pb-16 md:pt-36 md:pb-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="display-2 text-ink">Serviciile Noastre</h1>

            <p className="mt-6 text-lg leading-8 text-ink-muted max-w-[60ch]">
              CESS este centrul externalizat pentru servicii suport, creat să îți
              simplifice procesele și să te ajute să respecți toate obligațiile
              legale, fără stres, fără timp pierdut și fără riscuri.
            </p>

            <ul className="mt-8 space-y-3 max-w-[62ch]">
              {heroPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base leading-7 text-ink-muted"
                >
                  <Check
                    size={18}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="mt-1 text-success-ink shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ActionLink to="/contact">Contactează-ne</ActionLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden border border-rule bg-stone aspect-[16/10]">
              <img
                src="/service-contabilitate.jpg"
                alt="Servicii integrate de contabilitate și conformare CESS"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* QUICK INDEX BAR                                              */}
      {/* ============================================================ */}
      <nav
        aria-label="Servicii disponibile"
        className="border-y border-rule bg-vellum"
      >
        <Container className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          {services.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex min-h-[40px] items-center text-sm font-medium text-ink-muted tabular-nums transition-colors hover:text-navy"
            >
              {String(i + 1).padStart(2, '0')}. {s.title}
            </a>
          ))}
        </Container>
      </nav>

      {/* ============================================================ */}
      {/* SECTIONS 2–8 — Services                                      */}
      {/* ============================================================ */}
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* ============================================================ */}
      {/* SECTION 9 — Aplicația CESS                                   */}
      {/* ============================================================ */}
      <Section tone="navy">
        <Container>
          <Reveal>
            <div className="max-w-[75ch]">
              <SectionHeading
                tone="dark"
                title="Aplicația CESS – Totul într-un singur loc, la un click distanță"
                description="La CESS, nu ne limităm la livrarea clasică de servicii – mergem mai departe, oferindu-ți și o soluție digitală integrată: aplicația CESS. Este un instrument inteligent, creat special pentru antreprenori și manageri care vor să rămână conformi cu legislația în vigoare fără să piardă timp sau să depindă de hârtii inutile."
              />

              <p className="mt-8 font-body text-base font-semibold text-on-dark mb-4">
                Aplicația te ajută să gestionezi într-un singur loc tot ce ține de:
              </p>

              <ul className="space-y-3 mb-8 max-w-[65ch]">
                {appFeatures.map((feat, i) => (
                  <li
                    key={i}
                    className="text-base leading-7 text-on-dark-muted flex items-start gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-copper"
                    />
                    <span>{parseBold(feat)}</span>
                  </li>
                ))}
              </ul>

              <p className="max-w-[65ch] text-base leading-7 text-on-dark-muted mb-6">
                Poți folosi aplicația intern, cu personalul propriu, sau în
                combinație cu suportul specialiștilor noștri – totul flexibil, pe
                nevoile tale.
              </p>

              <p className="max-w-[65ch] text-base leading-7 text-copper-light mb-8">
                Vrei să vezi cum funcționează? Contactează-ne pentru un demo
                gratuit și descoperă cum îți poți reduce efortul administrativ la
                jumătate!
              </p>

              <ActionLink to="/contact" variant="light">
                Contactează-ne
              </ActionLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* SECTION 10 — Final CTA                                       */}
      {/* ============================================================ */}
      <Section tone="vellum">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="display-2 text-ink mb-6">
                Vrei să știi ce ți se potrivește?
              </h2>

              <p className="text-lg leading-8 text-ink-muted mb-10 max-w-[60ch] mx-auto">
                Alege CESS pentru servicii complete, clare și livrate corect.
                Contactează-ne acum pentru o consultanță gratuită și vezi cum te
                putem ajuta, concret!
              </p>

              <div className="space-y-2 mb-10">
                <p className="text-xl font-medium text-ink">
                  Telefon:{' '}
                  <a
                    href="tel:+40723926446"
                    className="text-navy underline underline-offset-4 hover:text-copper-ink tabular-nums"
                  >
                    +40 723 926 446
                  </a>
                </p>

                <p className="text-base text-ink-muted">
                  Email:{' '}
                  <a
                    href="mailto:contact@cess.ro"
                    className="text-navy underline underline-offset-4 hover:text-copper-ink"
                  >
                    contact@cess.ro
                  </a>
                </p>

                <p className="text-base text-ink-muted">Constanța</p>
              </div>

              <CTAButton text="Contactează-ne" primary to="/contact" large />
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}
