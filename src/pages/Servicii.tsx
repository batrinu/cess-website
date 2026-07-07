import { useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
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

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Icon map                                                           */
/* ------------------------------------------------------------------ */

const serviceIcons: Record<string, React.FC<LucideProps>> = {
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
  anchor: string
  layout: 'text-left' | 'text-right'
  textSpan: 5 | 6 | 7
  image?: string
}

/* ------------------------------------------------------------------ */
/*  Data — ALL 7 SERVICES with COMPLETE content                        */
/* ------------------------------------------------------------------ */

const services: ServiceData[] = [
  {
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
    anchor: 'contabilitate',
    layout: 'text-left',
    textSpan: 7,
  },
  {
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
    anchor: 'fiscalitate',
    layout: 'text-right',
    textSpan: 6,
  },
  {
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
    anchor: 'gdpr',
    layout: 'text-left',
    textSpan: 6,
    image: '/service-gdpr.jpg',
  },
  {
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
    anchor: 'ssm',
    layout: 'text-right',
    textSpan: 7,
    image: '/service-ssm.jpg',
  },
  {
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
    anchor: 'salarizare',
    layout: 'text-left',
    textSpan: 7,
  },
  {
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
    anchor: 'securitate-fizica',
    layout: 'text-right',
    textSpan: 5,
  },
  {
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
    anchor: 'psi',
    layout: 'text-left',
    textSpan: 6,
    image: '/service-psi.jpg',
  },
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
    <Link
      to={to}
      className={
        'inline-block font-body font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-0.5' +
        (large ? ' text-sm px-8 py-4' : ' text-[0.8125rem] px-8 py-3.5')
      }
      style={
        primary
          ? {
              backgroundColor: '#c9a87c',
              color: '#000000',
              border: 'none',
            }
          : {
              backgroundColor: 'transparent',
              color: '#c9a87c',
              border: '1px solid #c9a87c',
            }
      }
      onMouseEnter={(e) => {
        if (primary) {
          e.currentTarget.style.backgroundColor = '#d4b896'
          e.currentTarget.style.boxShadow =
            '0 4px 20px rgba(201,168,124,0.3)'
        } else {
          e.currentTarget.style.backgroundColor = '#c9a87c'
          e.currentTarget.style.color = '#000000'
        }
      }}
      onMouseLeave={(e) => {
        if (primary) {
          e.currentTarget.style.backgroundColor = '#c9a87c'
          e.currentTarget.style.boxShadow = 'none'
        } else {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.color = '#c9a87c'
        }
      }}
    >
      {text}
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  Helper: Parse bold markdown (**text**) into React elements         */
/* ------------------------------------------------------------------ */

function parseBold(text: string): (string | React.JSX.Element)[] {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

/* ------------------------------------------------------------------ */
/*  Service Section — COMPLETE with intro, checkmarks, callout, etc.   */
/* ------------------------------------------------------------------ */

function ServiceSection({
  service,
  isDark,
}: {
  service: ServiceData
  isDark: boolean
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!textRef.current || !iconRef.current) return

      const els = textRef.current.querySelectorAll('.animate-item')
      gsap.from(els, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(iconRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef }
  )

  const bgColor = isDark ? '#0a0a0a' : '#f5f0eb'
  const titleColor = isDark ? '#f5f0eb' : '#000000'
  const bodyColor = isDark ? '#94a3b8' : '#333333'
  const subtitleColor = isDark ? '#d4b896' : '#262626'

  const isTextLeft = service.layout === 'text-left'
  const textSpan = service.textSpan
  const imageSpan = 12 - textSpan

  const textClass = isTextLeft
    ? textLeftTextClasses[textSpan]
    : textRightTextClasses[textSpan]

  const imageClass = isTextLeft
    ? textLeftImageClasses[imageSpan]
    : textRightImageClasses[imageSpan]

  const IconComponent = serviceIcons[service.anchor]

  /* Split intro on newlines for multi-paragraph intros */
  const introParagraphs = service.intro.split('\n\n')

  return (
    <section
      ref={sectionRef}
      id={service.anchor}
      className="section-padding"
      style={{ backgroundColor: bgColor }}
    >
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Text column ── */}
          <div
            ref={textRef}
            className={textClass}
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Title */}
            <h2
              className="animate-item font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-tight mb-3"
              style={{ color: titleColor, textWrap: 'balance' }}
            >
              {service.title}
            </h2>

            {/* Subtitle */}
            <p
              className="animate-item font-body text-lg mb-6"
              style={{ color: subtitleColor }}
            >
              {service.subtitle}
            </p>

            {/* Intro paragraph(s) */}
            {introParagraphs.map((para, idx) => (
              <p
                key={idx}
                className="animate-item font-body text-base leading-relaxed mb-5"
                style={{ color: bodyColor }}
              >
                {para}
              </p>
            ))}

            {/* Checkmarks (services 1–3) */}
            {service.checkmarks && service.checkmarks.length > 0 && (
              <ul className="space-y-3 mb-6">
                {service.checkmarks.map((cm, i) => (
                  <li
                    key={i}
                    className="animate-item font-body text-base leading-relaxed flex items-start gap-3"
                    style={{ color: bodyColor }}
                  >
                    <Check
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0"
                      style={{ color: '#5c7c6b' }}
                    />
                    <span>{cm}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Label above bullet list */}
            <p
              className="animate-item font-body text-base font-semibold mb-3"
              style={{ color: titleColor }}
            >
              {service.label}
            </p>

            {/* Bullet items */}
            <ul className="space-y-3 mb-8">
              {service.items.map((item, i) => (
                <li
                  key={i}
                  className="animate-item font-body text-base leading-relaxed flex items-start gap-3"
                  style={{ color: bodyColor }}
                >
                  <span
                    className="mt-2 block h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: '#c9a87c' }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* Callout (lightbulb) */}
            {service.callout && (
              <div
                className="animate-item flex items-start gap-3 mb-6 p-4 rounded-lg"
                style={{
                  backgroundColor: isDark
                    ? 'rgba(201,168,124,0.08)'
                    : 'rgba(201,168,124,0.1)',
                  border: '1px solid rgba(201,168,124,0.2)',
                }}
              >
                <Lightbulb
                  size={20}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0"
                  style={{ color: '#c9a87c' }}
                />
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: isDark ? '#d4b896' : '#8b7355' }}
                >
                  {service.callout}
                </p>
              </div>
            )}

            {/* Closing paragraph */}
            <p
              className="animate-item font-body text-base leading-relaxed mb-5"
              style={{ color: bodyColor }}
            >
              {service.closing}
            </p>

            {/* CTA text before buttons */}
            <p
              className="animate-item font-body text-base leading-relaxed mb-6"
              style={{ color: bodyColor }}
            >
              {service.ctaText}
            </p>

            {/* CTA buttons */}
            <div className="animate-item flex flex-wrap gap-4">
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

          {/* ── Decorative icon / image column ── */}
          <div
            ref={iconRef}
            className={imageClass}
            style={{ willChange: 'transform, opacity' }}
          >
            {service.image ? (
              <div
                className="rounded-lg overflow-hidden border"
                style={{ borderColor: isDark ? '#262626' : '#e8e0d8' }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                  style={{
                    backgroundColor: isDark ? '#1a1a1a' : '#e8e0d8',
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 lg:py-0">
                {IconComponent && (
                  <IconComponent
                    size={64}
                    strokeWidth={1.5}
                    style={{ color: '#c9a87c', opacity: 0.2 }}
                    aria-hidden="true"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function Servicii() {
  const heroRef = useRef<HTMLElement>(null)
  const appSectionRef = useRef<HTMLElement>(null)
  const finalCtaRef = useRef<HTMLElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      /* ---- Hero ---- */
      if (heroRef.current) {
        const heroEls = heroRef.current.querySelectorAll('.hero-animate')
        gsap.from(heroEls, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        })
      }

      /* ---- App Section ---- */
      if (appSectionRef.current) {
        const els = appSectionRef.current.querySelectorAll('.app-animate')
        gsap.from(els, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: appSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      /* ---- Final CTA ---- */
      if (finalCtaRef.current) {
        const els = finalCtaRef.current.querySelectorAll('.cta-animate')
        gsap.from(els, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: finalCtaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    },
    { scope: pageRef }
  )

  return (
    <div ref={pageRef}>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero                                             */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center"
        style={{
          backgroundColor: '#000000',
          minHeight: '70vh',
          backgroundImage:
            'url(/service-contabilitate.jpg), radial-gradient(ellipse at center, rgba(26,26,26,0.92) 0%, rgba(0,0,0,0.95) 70%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div
          className="content-max-width pt-[72px] px-4 md:px-8"
          style={{ willChange: 'transform, opacity' }}
        >
          <h1
            className="hero-animate font-display text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.01em] mb-6"
            style={{ color: '#f5f0eb', textWrap: 'balance' }}
          >
            Serviciile Noastre
          </h1>

          <p
            className="hero-animate font-body text-xl font-light mb-10"
            style={{ color: '#94a3b8' }}
          >
            CESS este centrul externalizat pentru servicii suport, creat să îți
            simplifice procesele și să te ajute să respecți toate obligațiile
            legale, fără stres, fără timp pierdut și fără riscuri.
          </p>

          {/* Hero key points with checkmarks */}
          <div className="hero-animate max-w-[700px] mx-auto space-y-3 mb-10 text-left">
            {[
              'Acoperim integral: contabilitate, fiscalitate, GDPR, SSM, securitate fizică, salarizare, REGES, PSI',
              'Lucrăm digitalizat, cu trasabilitate completă',
              'Poți colabora 100% de la distanță, prin aplicația noastră sau cu suport uman',
            ].map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3 font-body text-lg leading-relaxed"
                style={{ color: '#94a3b8' }}
              >
                <Check
                  size={20}
                  strokeWidth={2.5}
                  className="mt-1 shrink-0"
                  style={{ color: '#5c7c6b' }}
                />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="hero-animate">
            <CTAButton text="Contactează-ne" primary to="/contact" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTIONS 2–8 — Services                                       */}
      {/* ============================================================ */}
      {services.map((service, index) => (
        <ServiceSection
          key={service.anchor}
          service={service}
          isDark={index % 2 === 1}
        />
      ))}

      {/* ============================================================ */}
      {/* SECTION 9 — Aplicația CESS                                    */}
      {/* ============================================================ */}
      <section
        ref={appSectionRef}
        className="section-padding"
        style={{ backgroundColor: '#000000' }}
      >
        <div className="content-max-width">
          {/* Heading */}
          <h2
            className="app-animate font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.15] tracking-[-0.01em] mb-6 max-w-[900px]"
            style={{ color: '#f5f0eb', textWrap: 'balance' }}
          >
            Aplicația CESS – Totul într-un singur loc, la un click distanță
          </h2>

          {/* Intro */}
          <p
            className="app-animate font-body text-lg leading-relaxed mb-8 max-w-[750px]"
            style={{ color: '#94a3b8' }}
          >
            La CESS, nu ne limităm la livrarea clasică de servicii – mergem mai
            departe, oferindu-ți și o soluție digitală integrată: aplicația
            CESS. Este un instrument inteligent, creat special pentru
            antreprenori și manageri care vor să rămână conformi cu legislația
            în vigoare fără să piardă timp sau să depindă de hârtii inutile.
          </p>

          {/* Sublabel */}
          <p
            className="app-animate font-body text-base font-semibold mb-4"
            style={{ color: '#f5f0eb' }}
          >
            Aplicația te ajută să gestionezi într-un singur loc tot ce ține de:
          </p>

          {/* Feature list with bold labels */}
          <ul className="space-y-3 mb-8 max-w-[750px]">
            {appFeatures.map((feat, i) => (
              <li
                key={i}
                className="app-animate font-body text-base leading-relaxed flex items-start gap-3"
                style={{ color: '#94a3b8' }}
              >
                <span
                  className="mt-2 block h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: '#c9a87c' }}
                />
                <span>{parseBold(feat)}</span>
              </li>
            ))}
          </ul>

          {/* Closing */}
          <p
            className="app-animate font-body text-base leading-relaxed mb-8 max-w-[750px]"
            style={{ color: '#94a3b8' }}
          >
            Poți folosi aplicația intern, cu personalul propriu, sau în
            combinație cu suportul specialiștilor noștri – totul flexibil, pe
            nevoile tale.
          </p>

          {/* Demo CTA text */}
          <p
            className="app-animate font-body text-base leading-relaxed mb-8 max-w-[750px]"
            style={{ color: '#d4b896' }}
          >
            👉 Vrei să vezi cum funcționează? Contactează-ne pentru un demo
            gratuit și descoperă cum îți poți reduce efortul administrativ la
            jumătate!
          </p>

          {/* CTA Button */}
          <div className="app-animate">
            <CTAButton text="Contactează-ne" primary to="/contact" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 10 — Final CTA                                       */}
      {/* ============================================================ */}
      <section
        ref={finalCtaRef}
        className="section-padding"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div className="content-max-width text-center">
          <h2
            className="cta-animate font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.01em] mb-6"
            style={{ color: '#f5f0eb', textWrap: 'balance' }}
          >
            Vrei să știi ce ți se potrivește?
          </h2>

          <p
            className="cta-animate font-body text-lg leading-relaxed mb-10 max-w-[650px] mx-auto"
            style={{ color: '#94a3b8' }}
          >
            Alege CESS pentru servicii complete, clare și livrate corect.
            Contactează-ne acum pentru o consultanță gratuită și vezi cum te
            putem ajuta, concret!
          </p>

          {/* Contact info */}
          <p
            className="cta-animate font-body text-xl font-medium mb-2"
            style={{ color: '#c9a87c' }}
          >
            Telefon: +40 723 926 446
          </p>

          <p
            className="cta-animate font-body text-base mb-1"
            style={{ color: '#94a3b8' }}
          >
            Email: contact@cess.ro
          </p>

          <p
            className="cta-animate font-body text-base mb-10"
            style={{ color: '#94a3b8' }}
          >
            Constanța
          </p>

          <div className="cta-animate">
            <CTAButton
              text="Contactează-ne"
              primary
              to="/contact"
              large
            />
          </div>
        </div>
      </section>
    </div>
  )
}
