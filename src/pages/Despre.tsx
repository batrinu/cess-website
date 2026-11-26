import { CheckCircle, AlertTriangle, Shield, ArrowRight, ArrowUpRight, Phone } from 'lucide-react'
import Container from '@/components/site/Container'
import Section from '@/components/site/Section'
import SectionHeading from '@/components/site/SectionHeading'
import ActionLink from '@/components/site/ActionLink'
import Reveal from '@/components/site/Reveal'

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
] as const

/* ------------------------------------------------------------------ */
/*  App Dashboard Mockup                                               */
/* ------------------------------------------------------------------ */

function AppMockup() {
  const statusIcon = (status: (typeof appDashboardItems)[number]['status']) => {
    if (status === 'done') {
      return <CheckCircle size={15} className="shrink-0 text-success-ink" />
    }
    if (status === 'warning') {
      return <AlertTriangle size={15} className="shrink-0 text-copper-ink" />
    }
    return <AlertTriangle size={15} className="shrink-0 text-error-ink" />
  }

  const statusLabel = (status: (typeof appDashboardItems)[number]['status']) => {
    if (status === 'done') return 'Conform'
    if (status === 'warning') return 'Atenție'
    return 'Urgent'
  }

  const statusTextClass = (status: (typeof appDashboardItems)[number]['status']) => {
    if (status === 'done') return 'text-success-ink'
    if (status === 'warning') return 'text-copper-ink'
    return 'text-error-ink'
  }

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[480px] overflow-hidden border border-rule bg-vellum text-ink shadow-xl"
    >
      {/* Prussian Navy top bar */}
      <div className="flex items-center justify-between gap-2 border-b border-rule-dark bg-navy px-4 py-3 text-on-dark">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.12em]">
          Dashboard CESS
        </span>
        <span className="font-body text-xs text-on-dark-muted">Conformare</span>
      </div>

      {/* Status rows */}
      <div className="p-4 space-y-2">
        {appDashboardItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-wrap items-center justify-between gap-2 border border-rule bg-alabaster px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              {statusIcon(item.status)}
              <span className="font-body text-sm font-medium text-ink">
                {item.label}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`font-body text-xs font-medium ${statusTextClass(item.status)}`}
              >
                {statusLabel(item.status)}
              </span>
              <span
                className={`font-body text-xs font-semibold tabular-nums border border-rule bg-vellum px-2 py-0.5 ${statusTextClass(item.status)}`}
              >
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rule bg-stone/60 px-4 py-3">
        <div className="flex items-center gap-1.5 text-success-ink">
          <Shield size={13} />
          <span className="font-body text-xs font-medium">Sistem securizat</span>
        </div>
        <span className="font-body text-xs text-ink-muted">
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
  return (
    <div>
      {/* ============================================================ */}
      {/*  SECTION 1 — HERO                                            */}
      {/* ============================================================ */}
      <section className="border-b border-rule bg-alabaster pt-28 pb-16 md:pt-36 md:pb-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="display-2 text-ink">
              Despre CESS – Centrul pentru Servicii Suport Integrate
            </h1>

            <div className="mt-6 space-y-4 max-w-[62ch]">
              <p className="text-base leading-7 text-ink-muted md:text-lg md:leading-8">
                La CESS, reunim într-un singur loc serviciile suport de care are
                nevoie orice organizație: GDPR, SSM/PSI, salarizare și HR,
                administrativ &amp; back-office, managementul documentelor,
                optimizarea proceselor și asistență operațională. Toate sunt
                livrate de o echipă de specialiști, prin procese digitalizate,
                rapide și sigure.
              </p>
              <p className="text-base leading-7 text-ink-muted md:text-lg md:leading-8">
                Soluțiile noastre sunt adaptate specificului companiei tale, ca
                tu să te concentrezi pe creștere, nu pe birocrație.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ActionLink to="/contact">
                Programează o consultație gratuită
              </ActionLink>
              <ActionLink to="/contact" variant="secondary">
                Contactează-ne
              </ActionLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden border border-rule bg-stone aspect-[16/10]">
              <img
                src="/about-team-960.webp"
                srcSet="/about-team-480.webp 480w, /about-team-760.webp 760w, /about-team-960.webp 960w"
                sizes="(max-width: 1023px) calc(100vw - 40px), 480px"
                width={960}
                height={536}
                alt="Echipa de specialiști CESS"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — CE NE DIFERENȚIAZĂ                              */}
      {/* ============================================================ */}
      <Section tone="vellum">
        <Container>
          <Reveal>
            <SectionHeading title="Ce ne diferențiază pe piață?" />

            <div className="mt-12 border-b border-rule">
              {differentiationPoints.map((point, i) => (
                <div
                  key={point.title}
                  className="grid gap-4 border-t border-rule py-8 md:grid-cols-12 md:gap-8"
                >
                  <p
                    aria-hidden="true"
                    className="font-display italic text-xl text-copper-ink tabular-nums md:col-span-1"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-2xl text-ink md:col-span-4">
                    {point.title}
                  </h3>
                  <p className="text-base leading-7 text-ink-muted md:col-span-7">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 max-w-[65ch] space-y-4">
              <p className="text-lg leading-8 text-ink">
                Suntem pregătiți să te ajutăm să navighezi prin complexitatea
                reglementărilor și să îți protejezi afacerea de riscurile
                asociate.
              </p>
              <p className="text-lg leading-8 text-ink">
                Principalul nostru instrument în asigurarea conformării
                clienților noștri este aplicația CESS.
              </p>
              <div className="pt-2">
                <ActionLink href="tel:+40723926446">
                  <Phone size={16} aria-hidden="true" />
                  SUNĂ ACUM
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 3 — APLICAȚIA CESS                                  */}
      {/* ============================================================ */}
      <Section tone="navy">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <SectionHeading
                  tone="dark"
                  title="Principalul nostru atu? Aplicația CESS."
                  description="Aplicația noastră nu e doar un instrument – este soluția digitală care transformă obligațiile legale într-un proces simplu, organizat și automatizat. Prin ea gestionăm eficient procesele din SSM, GDPR, PSI și nu numai – totul integrat, clar, la un click distanță."
                />

                <p className="mt-6 max-w-[56ch] text-base leading-7 text-on-dark-muted">
                  Ai întrebări? Vrei să știi ce ți se potrivește? Discuția e
                  gratuită, fără obligații – doar răspunsuri clare și soluții
                  potrivite pentru tine.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <ActionLink href="https://app.cess.ro" target="_blank" variant="light">
                    Încearcă demo gratuit
                    <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> (se deschide într-o filă nouă)</span>
                  </ActionLink>
                  <ActionLink href="tel:+40723926446" variant="light-outline">
                    <Phone size={16} aria-hidden="true" />
                    SUNĂ ACUM
                  </ActionLink>
                  <ActionLink to="/contact" variant="light-outline">
                    Contactează-ne
                  </ActionLink>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <AppMockup />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 4 — PARTENERI ȘI CLIENȚI                            */}
      {/* ============================================================ */}
      <Section tone="alabaster">
        <Container>
          <Reveal>
            <SectionHeading align="center" title="Printre clienții noștri" />

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
              {clientLogos.map((logo) => (
                <div
                  key={logo.src}
                  className="flex items-center justify-center border border-rule bg-vellum p-6"
                >
                  <img
                    src={logo.src.replace('.png', '.webp')}
                    width={268}
                    height={180}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-[60px] w-auto object-contain opacity-75 grayscale transition duration-200 hover:grayscale-0 hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <p className="mt-12 text-center text-lg leading-8 text-ink-muted">
              Alături de sute de companii din România care au ales conformarea
              simplificată.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 5 — FINAL CTA                                       */}
      {/* ============================================================ */}
      <Section tone="navy">
        <Container className="text-center">
          <Reveal>
            <SectionHeading
              align="center"
              tone="dark"
              title="Hai să facem echipă"
              description="Alege CESS și descoperă cât de simplă poate fi conformarea."
            />

            <div className="mt-8 flex justify-center">
              <ActionLink to="/contact" variant="light">
                Contactează-ne
                <ArrowRight size={16} aria-hidden="true" />
              </ActionLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}
