import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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
/*  Newsletter sub-component (shared by listing + article)             */
/* ------------------------------------------------------------------ */

function NewsletterBanner({ darkBg = true }: { darkBg?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.animate-in'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        }
      )
    }, section)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  const bgColor = darkBg ? '#0a0a0a' : '#f5f0eb'
  const titleColor = darkBg ? '#f5f0eb' : '#000000'
  const bodyColor = darkBg ? '#94a3b8' : '#64748b'

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32"
      style={{ backgroundColor: bgColor }}
    >
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="lg:col-span-3">
            <h3
              className="animate-in font-display text-2xl md:text-3xl font-normal mb-4"
              style={{ color: titleColor }}
            >
              Abonează-te la newsletter
            </h3>
            <p
              className="animate-in font-body text-base"
              style={{ color: bodyColor, lineHeight: 1.6 }}
            >
              Primești noutăți legislative și sfaturi utile direct în inbox.
            </p>
          </div>

          {/* Right */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div
                className="animate-in py-4 px-6"
                style={{ backgroundColor: 'rgba(92,124,107,0.12)' }}
              >
                <p
                  className="font-body text-sm font-medium"
                  style={{ color: '#5c7c6b' }}
                >
                  Mulțumim! Te-ai abonat cu succes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="animate-in flex flex-col sm:flex-row gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  placeholder="Adresa ta de email"
                  required
                  className="flex-1 font-body text-base px-4 py-3.5 outline-none transition-colors duration-300"
                  style={{
                    backgroundColor: darkBg ? '#1a1a1a' : '#ffffff',
                    border: '1px solid #262626',
                    color: darkBg ? '#f5f0eb' : '#000000',
                  }}
                  onFocus={(ev) => {
                    ev.currentTarget.style.borderColor = '#c9a87c'
                  }}
                  onBlur={(ev) => {
                    ev.currentTarget.style.borderColor = '#262626'
                  }}
                />
                <button
                  type="submit"
                  className="font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: '#c9a87c',
                    color: '#000000',
                  }}
                  onMouseEnter={(ev) => {
                    ev.currentTarget.style.backgroundColor = '#d4b896'
                    ev.currentTarget.style.boxShadow =
                      '0 4px 20px rgba(201,168,124,0.3)'
                  }}
                  onMouseLeave={(ev) => {
                    ev.currentTarget.style.backgroundColor = '#c9a87c'
                    ev.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  ABONEAZĂ-TE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  PART A — Blog Listing                                              */
/* ------------------------------------------------------------------ */

function BlogListing() {
  const heroRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const grid = gridRef.current
    if (!hero || !grid) return

    const ctx = gsap.context(() => {
      /* Hero animations */
      gsap.fromTo(
        hero.querySelectorAll('.animate-in'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }
      )

      /* Grid card animation */
      const card = grid.querySelector('.article-card')
      if (card) {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: { trigger: grid, start: 'top 85%' },
          }
        )
      }
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* --- Hero --- */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center"
        style={{
          backgroundColor: '#000000',
          minHeight: '50vh',
          paddingTop: '72px',
        }}
      >
        <div className="content-max-width py-24 md:py-32 text-center">
          <p
            className="animate-in font-body text-xs font-semibold uppercase mb-6"
            style={{ color: '#c9a87c', letterSpacing: '0.08em' }}
          >
            BLOG CESS
          </p>
          <h1
            className="animate-in font-display font-normal mb-8"
            style={{
              color: '#f5f0eb',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Sfaturi clare și soluții smart pentru afacerea ta
          </h1>

          <div className="animate-in mx-auto" style={{ maxWidth: '750px' }}>
            <p
              className="font-body text-lg mb-4"
              style={{ color: '#94a3b8', lineHeight: 1.7 }}
            >
              Fie că ești la început de drum sau administrezi deja un business
              matur, <strong style={{ color: '#f5f0eb' }}>provocările administrative, fiscale și legale</strong> sunt reale și
              constante. De aceea, am creat acest spațiu cu <strong style={{ color: '#f5f0eb' }}>resurse clare</strong>, scrise
              de specialiști care lucrează zilnic în aceste domenii –
              contabilitate, SSM, GDPR, HR și nu numai.
            </p>
            <p
              className="font-body text-lg mb-6"
              style={{ color: '#94a3b8', lineHeight: 1.7 }}
            >
              Aici găsești <strong style={{ color: '#f5f0eb' }}>articole scurte, aplicate și actualizate</strong>, care te
              ajută să înțelegi mai bine <strong style={{ color: '#f5f0eb' }}>obligațiile tale ca antreprenor</strong>, să iei
              decizii informate și să economisești timp, bani și stres.
            </p>
            <p
              className="font-body text-base font-medium"
              style={{ color: '#c9a87c' }}
            >
              Fără teorii inutile. Doar <strong>informații relevante și soluții practice</strong>,
              direct de la experți.
            </p>
          </div>
        </div>
      </section>

      {/* --- Article Grid --- */}
      <section
        ref={gridRef}
        className="section-padding"
        style={{ backgroundColor: '#f5f0eb' }}
      >
        <div className="content-max-width">
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            }}
          >
            {/* Article Card */}
            <Link
              to={`/blog/${ARTICLE.slug}`}
              className="article-card group block transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e8e0d8',
                boxShadow: 'none',
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.boxShadow =
                  '0 8px 32px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Image */}
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: '16 / 10' }}
              >
                <img
                  src={ARTICLE.image}
                  alt={ARTICLE.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <p
                  className="font-body text-xs mb-3"
                  style={{ color: '#64748b' }}
                >
                  {ARTICLE.date}
                </p>
                <h3
                  className="font-body text-xl font-semibold mb-3"
                  style={{ color: '#000000' }}
                >
                  {ARTICLE.title}
                </h3>
                <p
                  className="font-body text-sm mb-4 line-clamp-2"
                  style={{ color: '#64748b', lineHeight: 1.6 }}
                >
                  {ARTICLE.excerpt}
                </p>
                <span
                  className="inline-flex items-center gap-1 font-body text-sm font-medium transition-colors duration-300 group-hover:underline"
                  style={{ color: '#c9a87c' }}
                >
                  Continuă să citești
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Newsletter --- */}
      <NewsletterBanner />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PART B — Blog Article                                              */
/* ------------------------------------------------------------------ */

function BlogArticle({ article }: { article: ArticleData }) {
  const headerRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const body = bodyRef.current
    const cta = ctaRef.current
    if (!header || !body || !cta) return

    const ctx = gsap.context(() => {
      /* Header animations */
      gsap.fromTo(
        header.querySelectorAll('.animate-header'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }
      )

      gsap.fromTo(
        header.querySelector('.animate-image'),
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }
      )

      /* Body paragraphs */
      gsap.fromTo(
        body.querySelectorAll('.animate-body'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: body, start: 'top 85%' },
        }
      )

      /* CTA section */
      gsap.fromTo(
        cta.querySelectorAll('.animate-in'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: cta, start: 'top 85%' },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* --- Article Header --- */}
      <section
        ref={headerRef}
        style={{ backgroundColor: '#000000', paddingTop: '72px' }}
      >
        <div className="content-max-width pt-24 md:pt-32 pb-16 md:pb-24">
          <div className="mx-auto" style={{ maxWidth: '800px' }}>
            {/* Back link */}
            <Link
              to="/blog"
              className="animate-header inline-flex items-center gap-2 font-body text-sm mb-6 transition-colors duration-300"
              style={{ color: '#94a3b8' }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.color = '#c9a87c'
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.color = '#94a3b8'
              }}
            >
              <ArrowLeft size={16} />
              Înapoi la blog
            </Link>

            {/* Date */}
            <p
              className="animate-header font-body text-sm mb-4"
              style={{ color: '#c9a87c' }}
            >
              {article.fullDate}
            </p>

            {/* Title */}
            <h1
              className="animate-header font-display font-normal mb-8"
              style={{
                color: '#f5f0eb',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              {article.title}
            </h1>

            {/* Featured Image */}
            <div className="animate-image w-full overflow-hidden max-h-[400px]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Article Body --- */}
      <section
        ref={bodyRef}
        className="py-24 md:py-32"
        style={{ backgroundColor: '#f5f0eb' }}
      >
        <div
          className="mx-auto px-4 md:px-8"
          style={{ maxWidth: '720px' }}
        >
          {/* Intro */}
          <p
            className="animate-body font-body text-lg mb-12"
            style={{ color: '#64748b', lineHeight: 1.8 }}
          >
            {article.intro}
          </p>

          {/* Sections */}
          {article.sections.map((section, index) => (
            <div key={index} className="animate-body mb-12">
              <h2
                className="font-body text-2xl font-semibold mb-4"
                style={{ color: '#000000', marginTop: '48px' }}
              >
                {section.heading}
              </h2>
              <p
                className="font-body text-lg"
                style={{ color: '#64748b', lineHeight: 1.8 }}
              >
                {section.body}
              </p>
            </div>
          ))}

          {/* Conclusion */}
          <p
            className="animate-body font-body text-lg font-medium mt-16"
            style={{ color: '#000000', lineHeight: 1.8 }}
          >
            {article.conclusion}
          </p>

          {/* Article CTA */}
          <div
            className="animate-body mt-16 p-8 md:p-12"
            style={{ backgroundColor: '#0a0a0a' }}
          >
            <p
              className="font-body text-lg leading-relaxed mb-8"
              style={{ color: '#94a3b8', lineHeight: 1.7 }}
            >
              Dacă îți dorești <strong style={{ color: '#f5f0eb' }}>servicii contabile profesionale și eficiente în Constanța</strong>, echipa <strong style={{ color: '#f5f0eb' }}>CESS TRUST</strong> este aici pentru tine.
              Contactează-ne pentru o <strong style={{ color: '#f5f0eb' }}>consultanță gratuită</strong> și descoperă cum
              putem face echipă pentru succesul afacerii tale.
            </p>
            <Link
              to="/contact"
              className="inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#c9a87c',
                color: '#000000',
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.backgroundColor = '#d4b896'
                ev.currentTarget.style.boxShadow =
                  '0 4px 20px rgba(201,168,124,0.3)'
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.backgroundColor = '#c9a87c'
                ev.currentTarget.style.boxShadow = 'none'
              }}
            >
              CONTACTEAZĂ-NE
            </Link>
          </div>
        </div>
      </section>

      {/* --- Article CTA --- */}
      <section
        ref={ctaRef}
        className="py-24 md:py-32"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div className="content-max-width text-center">
          <div className="mx-auto" style={{ maxWidth: '700px' }}>
            <p
              className="animate-in font-body text-lg mb-8"
              style={{ color: '#94a3b8', lineHeight: 1.7 }}
            >
              Dacă îți dorești servicii contabile profesionale și eficiente în
              Constanța, echipa CESS TRUST este aici pentru tine.
              Contactează-ne pentru o consultanță gratuită și descoperă cum
              putem face echipă pentru succesul afacerii tale.
            </p>
            <Link
              to="/contact"
              className="animate-in inline-block font-body text-[0.8125rem] font-semibold uppercase tracking-[0.1em] px-8 py-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#c9a87c',
                color: '#000000',
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.backgroundColor = '#d4b896'
                ev.currentTarget.style.boxShadow =
                  '0 4px 20px rgba(201,168,124,0.3)'
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.backgroundColor = '#c9a87c'
                ev.currentTarget.style.boxShadow = 'none'
              }}
            >
              CONTACTEAZĂ-NE
            </Link>
          </div>
        </div>
      </section>
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
