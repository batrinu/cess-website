import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { CheckCircle, AlertTriangle, Shield, ArrowRight, Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const differentiationPoints = [
  {
    title: 'Soluții transdomeniu',
    body: 'Datorită expertizei noastre în domenii complementare și esențiale pentru succesul în afaceri, soluțiile pe care le oferim clienților noștri depășesc stricta conformare pe un anumit domeniu și sunt adaptate ținând cont de implicațiile și obligațiile acestora și în celelalte domenii. Cu alte cuvinte, oferim soluții și servicii transdomeniu.',
  },
  {
    title: 'Digitalizare și costuri reduse',
    body: 'Prin investiții continue în tehnologie și în dezvoltarea echipei noastre am reușit să furnizăm serviciile prin mijloace de comunicare la distanță, fapt ce asigură diminuarea costurilor pentru clienții noștri, asigurând în același timp trasabilitatea tuturor activităților.',
  },
  {
    title: 'Punct unic de contact',
    body: 'Un mare avantaj pe care îl asigurăm partenerilor noștri este acela al punctului unic de contact prin care eficientizăm cea mai importantă resursă, timpul. Prin transmiterea către noi a unui singur mesaj asigurăm valorificarea informației conținute în toate domeniile de conformare. (De exemplu, informația referitoare la angajarea unui nou salariat se valorifică în mod direct în REGES, contabilitate, salarizare, SSM, PSI, GDPR. În acest fel sunt eliminate riscurile de neconformare cauzate de netransmiterea în timp util a informațiilor necesare, între prestatorii de servicii de conformare interni, dar mai ales, externi.)',
  },
  {
    title: 'Protecția datelor',
    body: 'De asemenea, prin măsurile tehnice și organizatorice implementate de noi asigurăm protecția, atât a datelor dumneavoastră comerciale cât și a celor cu caracter personal, pe care le prelucrăm în numele dumneavoastră.',
  },
]

const clientLogos = [
  { src: '/client-1.png', alt: 'Client 1' },
  { src: '/client-2.png', alt: 'Client 2' },
  { src: '/client-3.png', alt: 'Client 3' },
  { src: '/client-4.png', alt: 'Client 4' },
  { src: '/client-5.png', alt: 'Client 5' },
]

const appDashboardItems = [
  { label: 'GDPR', status: 'done', count: 12 },
  { label: 'SSM', status: 'done', count: 8 },
  { label: 'PSI', status: 'warning', count: 3 },
  { label: 'Documente', status: 'done', count: 47 },
  { label: 'Angajați instruiți', status: 'done', count: 24 },
  { label: 'Termene apropiate', status: 'alert', count: 2 },
]

/* ------------------------------------------------------------------ */
/*  Helper component: CTA Button (primary)                             */
/* ------------------------------------------------------------------ */
function CTAPrimary({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}) {
  const className =
    'inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-[14px] transition-all duration-300 hover:-translate-y-0.5'
  const style: React.CSSProperties = {
    backgroundColor: '#c9a87c',
    color: '#000000',
    border: 'none',
    borderRadius: 0,
  }
  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = '#d4b896'
    e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,124,0.3)'
  }
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = '#c9a87c'
    e.currentTarget.style.boxShadow = 'none'
  }

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Helper component: CTA Button (ghost)                               */
/* ------------------------------------------------------------------ */
function CTAGhost({ children, href }: { children: React.ReactNode; href?: string }) {
  const className =
    'inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-[14px] transition-all duration-300 hover:-translate-y-0.5'
  const style: React.CSSProperties = {
    backgroundColor: 'transparent',
    color: '#c9a87c',
    border: '1px solid #c9a87c',
    borderRadius: 0,
  }
  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = '#c9a87c'
    e.currentTarget.style.color = '#000000'
  }
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = '#c9a87c'
  }

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      to="/contact"
      className={className}
      style={style}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {children}
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  CSS-built App Dashboard Mockup                                     */
/* ------------------------------------------------------------------ */
function AppMockup() {
  const statusIcon = (status: string) => {
    if (status === 'done')
      return <CheckCircle size={14} style={{ color: '#5c7c6b' }} />
    if (status === 'warning')
      return <AlertTriangle size={14} style={{ color: '#c9a87c' }} />
    return <AlertTriangle size={14} style={{ color: '#c94c4c' }} />
  }

  const statusLabel = (status: string) => {
    if (status === 'done') return 'Conform'
    if (status === 'warning') return 'Atenție'
    return 'Urgent'
  }

  const statusColor = (status: string) => {
    if (status === 'done') return '#5c7c6b'
    if (status === 'warning') return '#c9a87c'
    return '#c94c4c'
  }

  return (
    <div
      className="w-full max-w-[480px] rounded-lg overflow-hidden"
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #262626',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Mockup header bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #262626' }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#c94c4c' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#c9a87c' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#5c7c6b' }} />
        </div>
        <span
          className="font-body text-xs font-medium ml-2"
          style={{ color: '#94a3b8' }}
        >
          Dashboard CESS
        </span>
      </div>

      {/* Mockup content */}
      <div className="p-4 space-y-2">
        {appDashboardItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-3 py-2.5 rounded transition-colors duration-200"
            style={{ backgroundColor: '#262626', border: '1px solid #262626' }}
          >
            <div className="flex items-center gap-3">
              {statusIcon(item.status)}
              <span className="font-body text-sm font-medium" style={{ color: '#f5f0eb' }}>
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-xs" style={{ color: statusColor(item.status) }}>
                {statusLabel(item.status)}
              </span>
              <span
                className="font-body text-xs font-semibold px-2 py-0.5 rounded-sm"
                style={{
                  backgroundColor:
                    item.status === 'alert' ? 'rgba(201,76,76,0.15)' : 'rgba(92,124,107,0.15)',
                  color: item.status === 'alert' ? '#c94c4c' : '#5c7c6b',
                }}
              >
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mockup footer */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #262626' }}
      >
        <div className="flex items-center gap-2">
          <Shield size={12} style={{ color: '#5c7c6b' }} />
          <span className="font-body text-xs" style={{ color: '#5c7c6b' }}>
            Sistem securizat
          </span>
        </div>
        <span className="font-body text-xs" style={{ color: '#94a3b8' }}>
          Ultima sincronizare: acum
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */
export default function Despre() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)
  const appSectionRef = useRef<HTMLDivElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---- Hero entrance ---- */
      gsap.from('.despre-hero-label', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.1,
      })
      gsap.from('.despre-hero-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })
      gsap.from('.despre-hero-body', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.4,
      })
      gsap.from('.despre-hero-ctas', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.6,
      })

      /* ---- Timeline section ---- */
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from('.despre-timeline-title', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
          })
          gsap.from('.despre-timeline-item', {
            opacity: 0,
            y: 40,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.15,
            delay: 0.2,
          })
          gsap.to(timelineLineRef.current, {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.2,
            transformOrigin: 'top center',
          })
          gsap.from('.despre-timeline-closing', {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: 'power3.out',
            delay: 1.0,
          })
        },
      })

      /* ---- App section ---- */
      ScrollTrigger.create({
        trigger: appSectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from('.despre-app-label', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
          gsap.from('.despre-app-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.1 })
          gsap.from('.despre-app-body', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.2 })
          gsap.from('.despre-app-cta', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', delay: 0.3 })
          gsap.from('.despre-app-mockup', {
            opacity: 0,
            x: 30,
            duration: 1.0,
            ease: 'power3.out',
            delay: 0.3,
          })
        },
      })

      /* ---- Clients section ---- */
      ScrollTrigger.create({
        trigger: clientsRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from('.despre-clients-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
          gsap.from('.despre-clients-logo', {
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.2,
          })
          gsap.from('.despre-clients-statement', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
            delay: 0.8,
          })
        },
      })

      /* ---- Final CTA section ---- */
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from('.despre-final-cta', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' })
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* ============================================================ */}
      {/*  SECTION 1 — HERO                                            */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative flex items-center"
        style={{
          minHeight: '60vh',
          backgroundColor: '#000000',
          backgroundImage:
            'url(/about-team.jpg), radial-gradient(ellipse at center, rgba(26,26,26,0.92) 0%, rgba(0,0,0,0.95) 70%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="content-max-width w-full pt-24 pb-16 md:pb-24">
          <div className="max-w-[800px]">
            <h1
              className="despre-hero-title font-display font-normal mt-4"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#f5f0eb',
                textWrap: 'balance',
              }}
            >
              Despre CESS – Centrul pentru Servicii Suport Integrate
            </h1>

            <div className="despre-hero-body mt-6 space-y-4 max-w-[700px]" style={{ willChange: 'transform, opacity' }}>
              <p
                className="font-body text-lg"
                style={{ color: '#94a3b8', lineHeight: 1.7 }}
              >
                La CESS, reunim într-un singur loc serviciile suport de care are nevoie orice
                organizație: GDPR, SSM/PSI, salarizare și HR, administrativ &amp; back-office,
                managementul documentelor, optimizarea proceselor și asistență operațională. Toate
                sunt livrate de o echipă de specialiști, prin procese digitalizate, rapide și sigure.
              </p>
              <p
                className="font-body text-lg"
                style={{ color: '#94a3b8', lineHeight: 1.7 }}
              >
                Soluțiile noastre sunt adaptate specificului companiei tale, ca tu să te concentrezi
                pe creștere, nu pe birocrație.
              </p>
            </div>

            {/* Hero CTAs — primary solid copper, secondary outlined */}
            <div className="despre-hero-ctas mt-8 flex flex-wrap gap-4" style={{ willChange: 'transform, opacity' }}>
              <Link to="/contact">
                <CTAPrimary>Programează o consultație gratuită</CTAPrimary>
              </Link>
              <CTAGhost>Contactează-ne</CTAGhost>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — CE NE DIFERENȚIAZĂ (Timeline)                   */}
      {/* ============================================================ */}
      <section
        ref={timelineRef}
        style={{ backgroundColor: '#f5f0eb' }}
        className="section-padding"
      >
        <div className="content-max-width">
          <h2
            className="despre-timeline-title font-display font-normal"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#000000',
              textWrap: 'balance',
            }}
          >
            Ce ne diferențiază pe piață?
          </h2>

          {/* Timeline */}
          <div className="relative mt-12 md:mt-16">
            {/* Vertical connecting line */}
            <div
              ref={timelineLineRef}
              className="absolute left-[5px] md:left-[5px] top-0 bottom-0 w-[2px]"
              style={{
                backgroundColor: '#c9a87c',
                transform: 'scaleY(0)',
                transformOrigin: 'top center',
              }}
            />

            <div className="space-y-10 md:space-y-12">
              {differentiationPoints.map((point, i) => (
                <div
                  key={i}
                  className="despre-timeline-item relative pl-8 md:pl-10"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-0 top-1.5 w-3 h-3 rounded-full"
                    style={{ backgroundColor: '#c9a87c' }}
                  />
                  <h3
                    className="font-body text-lg font-semibold"
                    style={{ color: '#000000' }}
                  >
                    {point.title}
                  </h3>
                  <p
                    className="font-body text-base mt-2 max-w-[720px]"
                    style={{ color: '#333333', lineHeight: 1.7 }}
                  >
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing paragraphs */}
          <div className="despre-timeline-closing mt-12 md:mt-16 max-w-[800px]" style={{ willChange: 'transform, opacity' }}>
            <p
              className="font-body text-lg"
              style={{ color: '#000000', lineHeight: 1.7 }}
            >
              Suntem pregătiți să te ajutăm să navighezi prin complexitatea reglementărilor și să
              îți protejezi afacerea de riscurile asociate.
            </p>
            <p
              className="font-body text-lg mt-4"
              style={{ color: '#000000', lineHeight: 1.7 }}
            >
              Principalul nostru instrument în asigurarea conformării clienților noștri este aplicația CESS.
            </p>
            <div className="mt-6">
              <CTAPrimary href="tel:+40723926446">
                <span className="flex items-center gap-2">
                  <Phone size={16} />
                  SUNĂ ACUM
                </span>
              </CTAPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 — APLICAȚIA CESS                                    */}
      {/* ============================================================ */}
      <section
        ref={appSectionRef}
        style={{ backgroundColor: '#000000' }}
        className="section-padding"
      >
        <div className="content-max-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column — text */}
            <div>
              <h2
                className="despre-app-title font-display font-normal mt-3"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: '#f5f0eb',
                  textWrap: 'balance',
                }}
              >
                Principalul nostru atu? Aplicația CESS.
              </h2>
              <p
                className="despre-app-body font-body text-lg mt-6 max-w-[560px]"
                style={{ color: '#94a3b8', lineHeight: 1.7 }}
              >
                Aplicația noastră nu e doar un instrument – este soluția digitală care transformă
                obligațiile legale într-un proces simplu, organizat și automatizat. Prin ea gestionăm
                eficient procesele din SSM, GDPR, PSI și nu numai – totul integrat, clar, la un click
                distanță.
              </p>
              <p
                className="despre-app-cta-text font-body text-base mt-6 max-w-[560px]"
                style={{ color: '#94a3b8', lineHeight: 1.7 }}
              >
                Ai întrebări? Vrei să știi ce ți se potrivește? Discuția e gratuită, fără obligații – doar răspunsuri clare și soluții potrivite pentru tine.
              </p>
              <div className="despre-app-cta mt-8">
                <CTAPrimary href="tel:+40723926446">
                  <span className="flex items-center gap-2">
                    <Phone size={16} />
                    SUNĂ ACUM
                  </span>
                </CTAPrimary>
              </div>
            </div>

            {/* Right column — app mockup */}
            <div className="despre-app-mockup flex justify-center lg:justify-end" style={{ willChange: 'transform, opacity' }}>
              <AppMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 — PARTENERI ȘI CLIENȚI                              */}
      {/* ============================================================ */}
      <section
        ref={clientsRef}
        style={{ backgroundColor: '#f5f0eb' }}
        className="section-padding"
      >
        <div className="content-max-width text-center">
          <h2
            className="despre-clients-title font-display font-normal"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#000000',
              textWrap: 'balance',
            }}
          >
            Printre clienții noștri
          </h2>

          {/* Logo grid */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {clientLogos.map((logo, i) => (
              <div
                key={i}
                className="despre-clients-logo flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="h-[60px] w-auto object-contain transition-all duration-300"
                  style={{ filter: 'grayscale(100%)', opacity: 0.7 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)'
                    e.currentTarget.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)'
                    e.currentTarget.style.opacity = '0.7'
                  }}
                />
              </div>
            ))}
          </div>

          <p
            className="despre-clients-statement font-body text-lg mt-12"
            style={{ color: '#333333', lineHeight: 1.7 }}
          >
            Alături de sute de companii din România care au ales conformarea simplificată.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 5 — FINAL CTA                                         */}
      {/* ============================================================ */}
      <section
        ref={ctaRef}
        style={{ backgroundColor: '#000000' }}
        className="section-padding"
      >
        <div className="content-max-width text-center">
          <div className="despre-final-cta" style={{ willChange: 'transform, opacity' }}>
            <h2
              className="font-display font-normal"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.1,
                color: '#f5f0eb',
                textWrap: 'balance',
              }}
            >
              Hai să facem echipă
            </h2>
            <p
              className="font-body text-lg mt-4"
              style={{ color: '#94a3b8', lineHeight: 1.7 }}
            >
              Alege CESS și descoperă cât de simplă poate fi conformarea.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/contact">
                <CTAPrimary>
                  <span className="flex items-center gap-2">
                    Contactează-ne
                    <ArrowRight size={16} />
                  </span>
                </CTAPrimary>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
