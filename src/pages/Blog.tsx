import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Container from '@/components/site/Container'
import Section from '@/components/site/Section'
import SectionHeading from '@/components/site/SectionHeading'
import ActionLink, { actionClasses } from '@/components/site/ActionLink'
import Reveal from '@/components/site/Reveal'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ArticleSection {
  heading: string
  body: string
}

interface ArticleData {
  slug: string
  title: string
  date: string
  fullDate: string
  excerpt: string
  image: string
  intro: string
  sections: ArticleSection[]
  conclusion: string
}

const ARTICLE: ArticleData = {
  slug: 'importanta-eficientei-contabilului-in-succesul-unei-afaceri',
  title: 'Importanța eficienței contabilului în succesul unei afaceri',
  date: '25 iulie 2024',
  fullDate: '25 iulie 2024',
  excerpt:
    'Află de ce un contabil eficient este un partener esențial pentru stabilitatea și creșterea companiei tale.',
  image: '/blog-contabilitate.jpg',
  intro:
    'Într-un mediu economic tot mai competitiv, fiecare decizie financiară contează. Un contabil eficient nu este doar un furnizor de servicii administrative, ci un partener esențial în dezvoltarea oricărei afaceri. De la gestionarea fluxurilor financiare la încadrarea corectă în legislația fiscală, eficiența contabilului influențează direct stabilitatea și creșterea companiei.',
  sections: [
    {
      heading: '1. Eficiența înseamnă economie de timp și bani',
      body: 'Un contabil organizat și atent la detalii optimizează timpul antreprenorului și previne erorile costisitoare. Declarațiile sunt depuse la timp, taxele sunt calculate corect, iar riscul de penalități este redus semnificativ. Un contabil eficient îți oferă nu doar siguranță fiscală, ci și predictibilitate financiară.',
    },
    {
      heading: '2. Decizii mai bune, bazate pe date reale',
      body: 'Un contabil care își face treaba cu eficiență oferă analize financiare clare, rapoarte relevante și interpretări care te ajută să iei decizii în cunoștință de cauză. Astfel, poți înțelege unde se duc banii, care sunt zonele profitabile și unde trebuie să ajustezi.',
    },
    {
      heading: '3. Conformitate legală fără stres',
      body: 'Schimbările legislative apar frecvent în domeniul fiscal. Un contabil eficient este mereu la curent cu noutățile și adaptează documentele și procedurile companiei tale în timp real. Astfel, eviți amenzile și neplăcerile cauzate de nerespectarea reglementărilor în vigoare.',
    },
    {
      heading: '4. Susținere în fața instituțiilor statului',
      body: 'Fie că vorbim despre controale ANAF, solicitări de la ITM sau relații cu băncile, un contabil bine pregătit te reprezintă cu profesionalism și încredere. Eficiența lui devine scutul tău administrativ.',
    },
    {
      heading: '5. Contabilul nu este doar un angajat, ci un partener',
      body: 'Un contabil eficient nu se limitează la cifre, ci contribuie activ la planificarea strategică a afacerii. Îți poate propune soluții fiscale mai avantajoase, te poate avertiza asupra riscurilor financiare și îți poate oferi perspective clare pentru viitor.',
    },
  ],
  conclusion:
    'A alege un contabil nu înseamnă doar a bifa o obligație legală, ci a investi într-un parteneriat care îți poate salva timp, bani și energie. Eficiența contabilului este un element-cheie în sănătatea financiară a afacerii tale.',
}

/* ------------------------------------------------------------------ */
/*  Newsletter sub-component                                         */
/* ------------------------------------------------------------------ */

function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <Section tone="navy">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <h2 className="display-3 text-on-dark">
              Abonează-te la newsletter
            </h2>
            <p className="mt-3 max-w-[54ch] text-base leading-7 text-on-dark-muted">
              Primești noutăți legislative și sfaturi utile direct în inbox.
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            {submitted ? (
              <div
                role="status"
                className="border border-success-dark/40 bg-navy-elevated px-6 py-4"
              >
                <p className="font-body text-sm font-medium text-success-dark">
                  Mulțumim! Te-ai abonat cu succes.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row sm:gap-0"
              >
                <label htmlFor="blog-newsletter-email" className="sr-only">
                  Adresa ta de email
                </label>
                <input
                  id="blog-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  placeholder="Adresa ta de email"
                  required
                  className="min-h-[48px] flex-1 rounded-[2px] border border-rule-dark bg-navy-elevated px-4 py-3 font-body text-base text-on-dark placeholder:text-on-dark-muted transition-colors focus:border-copper-light focus-visible:relative focus-visible:z-10 sm:rounded-r-none"
                />
                <button
                  type="submit"
                  className={actionClasses(
                    'light',
                    'shrink-0 sm:rounded-l-none',
                  )}
                >
                  ABONEAZĂ-TE
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  PART A — Blog Listing                                              */
/* ------------------------------------------------------------------ */

function BlogListing() {
  return (
    <div>
      {/* --- Light Hero --- */}
      <section className="border-b border-rule bg-alabaster pt-28 pb-14 md:pt-36 md:pb-16">
        <Container>
          <p className="editorial-eyebrow mb-4 text-copper-ink">BLOG CESS</p>
          <h1 className="display-2 max-w-[24ch] text-ink">
            Sfaturi clare și soluții smart pentru afacerea ta
          </h1>

          <div className="mt-6 max-w-[65ch] space-y-4 text-base leading-7 text-ink-muted md:text-lg md:leading-8">
            <p>
              Fie că ești la început de drum sau administrezi deja un business
              matur,{' '}
              <strong className="font-semibold text-ink">
                provocările administrative, fiscale și legale
              </strong>{' '}
              sunt reale și constante. De aceea, am creat acest spațiu cu{' '}
              <strong className="font-semibold text-ink">resurse clare</strong>,
              scrise de specialiști care lucrează zilnic în aceste domenii –
              contabilitate, SSM, GDPR, HR și nu numai.
            </p>
            <p>
              Aici găsești{' '}
              <strong className="font-semibold text-ink">
                articole scurte, aplicate și actualizate
              </strong>
              , care te ajută să înțelegi mai bine{' '}
              <strong className="font-semibold text-ink">
                obligațiile tale ca antreprenor
              </strong>
              , să iei decizii informate și să economisești timp, bani și stres.
            </p>
            <p className="font-medium text-copper-ink">
              Fără teorii inutile. Doar{' '}
              <strong className="font-semibold text-ink">
                informații relevante și soluții practice
              </strong>
              , direct de la experți.
            </p>
          </div>
        </Container>
      </section>

      {/* --- Magazine Feature --- */}
      <Section tone="vellum">
        <Container>
          <Reveal>
            <article className="grid items-center gap-8 border-y border-rule py-10 md:grid-cols-12">
              <Link
                to={`/blog/${ARTICLE.slug}`}
                className="group block aspect-[16/10] overflow-hidden border border-rule bg-stone md:col-span-7"
              >
                <img
                  src={ARTICLE.image}
                  alt={ARTICLE.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>

              <div className="md:col-span-5">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] tabular-nums text-copper-ink">
                  {ARTICLE.date}
                </p>
                <h2 className="display-3 mt-3 text-ink">
                  <Link
                    to={`/blog/${ARTICLE.slug}`}
                    className="transition-colors hover:text-copper-ink"
                  >
                    {ARTICLE.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-7 text-ink-muted">
                  {ARTICLE.excerpt}
                </p>
                <Link
                  to={`/blog/${ARTICLE.slug}`}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-body text-sm font-semibold text-navy transition-colors hover:text-copper-ink"
                >
                  <span>Continuă să citești</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </Reveal>
        </Container>
      </Section>

      {/* --- Newsletter --- */}
      <NewsletterBanner />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PART B — Blog Article                                              */
/* ------------------------------------------------------------------ */

function BlogArticle({ article }: { article: ArticleData }) {
  return (
    <div>
      {/* --- Navy Article Header --- */}
      <section
        data-surface="dark"
        className="bg-navy pt-28 pb-14 text-on-dark md:pt-36 md:pb-20"
      >
        <Container>
          <div className="mx-auto max-w-4xl">
            <Link
              to="/blog"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-copper-light transition-colors hover:text-on-dark"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Înapoi la blog
            </Link>

            <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.12em] tabular-nums text-on-dark-muted">
              {article.fullDate}
            </p>

            <h1 className="display-2 mt-4 max-w-4xl text-on-dark">
              {article.title}
            </h1>

            <div className="mt-10 aspect-[16/9] overflow-hidden border border-rule-dark bg-navy-elevated">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* --- Prose Body --- */}
      <Section tone="alabaster">
        <Container>
          <div className="mx-auto max-w-[68ch]">
            <p className="text-lg leading-8 text-ink-muted">{article.intro}</p>

            {article.sections.map((section, index) => (
              <div key={index}>
                <h2 className="mt-12 mb-4 font-display text-2xl text-ink md:text-3xl">
                  {section.heading}
                </h2>
                <p className="text-lg leading-8 text-ink-muted">
                  {section.body}
                </p>
              </div>
            ))}

            <p className="mt-12 border-t border-rule pt-8 text-lg font-medium leading-8 text-ink">
              {article.conclusion}
            </p>

            <div
              data-surface="dark"
              className="mt-14 bg-navy p-8 text-on-dark md:p-10"
            >
              <p className="text-lg leading-8 text-on-dark-muted">
                Dacă îți dorești{' '}
                <strong className="font-semibold text-on-dark">
                  servicii contabile profesionale și eficiente în Constanța
                </strong>
                , echipa{' '}
                <strong className="font-semibold text-on-dark">
                  CESS TRUST
                </strong>{' '}
                este aici pentru tine. Contactează-ne pentru o{' '}
                <strong className="font-semibold text-on-dark">
                  consultanță gratuită
                </strong>{' '}
                și descoperă cum putem face echipă pentru succesul afacerii
                tale.
              </p>
              <div className="mt-7">
                <ActionLink to="/contact" variant="light">
                  CONTACTEAZĂ-NE
                </ActionLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Final Article Band --- */}
      <Section tone="vellum" className="border-t border-rule">
        <Container className="text-center">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="CONSULTANȚĂ CONTABILĂ"
              title="Discută direct cu echipa CESS TRUST"
              description="Oferim servicii integrate de contabilitate, fiscalitate și conformare pentru companiile din Constanța."
            />
            <div className="mt-8">
              <ActionLink to="/contact" variant="primary">
                CONTACTEAZĂ-NE
              </ActionLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Blog component — routes between listing & article             */
/* ------------------------------------------------------------------ */

export default function Blog() {
  const location = useLocation()
  const pathname = location.pathname

  /* Extract slug from /blog/:slug pattern */
  const segments = pathname.replace(/\/$/, '').split('/')
  const slug = segments.length > 2 ? segments[2] : undefined

  /* If a slug is present, render the article view */
  if (slug) {
    /* Only one article exists for now */
    if (slug === ARTICLE.slug) {
      return <BlogArticle article={ARTICLE} />
    }
    /* Unknown slug — show listing as fallback */
    return <BlogListing />
  }

  /* No slug — render the blog listing */
  return <BlogListing />
}
