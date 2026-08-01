export const SITE_URL = 'https://www.cess.ro'

export type PageMeta = {
  title: string
  description: string
}

/** Used for the homepage and as the fallback for any route not listed below. */
export const DEFAULT_META: PageMeta = {
  title: 'CESS - Centrul Externalizat pentru Servicii Suport Administrative și Legale',
  description:
    'CESS oferă servicii complete de contabilitate, consultanță fiscală, GDPR, SSM, PSI, salarizare și securitate fizică pentru companii din România.',
}

/**
 * Per-route title and description. Keys are pathnames without a trailing slash.
 * A nested path falls back to its first segment (/blog/articol -> /blog), then to
 * DEFAULT_META, so a new route is never left with a wrong title.
 */
export const ROUTE_META: Record<string, PageMeta> = {
  '/': DEFAULT_META,

  '/servicii': {
    title: 'Servicii de conformare și suport administrativ | CESS',
    description:
      'Contabilitate, fiscalitate, GDPR, SSM, PSI, salarizare și securitate fizică — servicii suport externalizate care îți simplifică procesele și obligațiile legale.',
  },

  '/despre': {
    title: 'Despre noi – centru pentru servicii suport integrate | CESS',
    description:
      'GDPR, SSM/PSI, salarizare și HR, administrativ și back-office, managementul documentelor și optimizarea proceselor — reunite într-un singur loc.',
  },

  '/certificari': {
    title: 'Certificări și autorizări | CESS',
    description:
      'Documente oficiale care atestă calificarea și autorizarea CESS TRUST S.R.L. în domeniile de activitate: certificat CECCAR și certificat de abilitare.',
  },

  '/blog': {
    title: 'Blog – sfaturi administrative, fiscale și legale | CESS',
    description:
      'Resurse clare despre provocările administrative, fiscale și legale ale unei afaceri, scrise de specialiști care lucrează zilnic în aceste domenii.',
  },

  '/contact': {
    title: 'Contact | CESS',
    description:
      'Ai o întrebare sau vrei să afli ce servicii ți se potrivesc? Scrie-ne la contact@cess.ro sau sună la +40 723 926 446. Discutăm gratuit și fără obligații.',
  },

  '/termeni': {
    title: 'Termeni și condiții | CESS',
    description:
      'Termenii și condițiile generale de utilizare a site-ului cess.ro, operat de CESS TRUST S.R.L., CUI 37449212, cu sediul în Constanța.',
  },

  '/confidentialitate': {
    title: 'Politica de confidențialitate | CESS',
    description:
      'Cum prelucrează CESS TRUST S.R.L. datele cu caracter personal conform Regulamentului (UE) 2016/679 (GDPR) și ce drepturi ai în calitate de persoană vizată.',
  },

  '/cookie': {
    title: 'Politica de cookie-uri | CESS',
    description:
      'Ce cookie-uri folosește site-ul cess.ro, în ce scop sunt utilizate și cum îți poți gestiona preferințele în orice moment.',
  },
}

/** Resolve the metadata for a pathname, with the nested-route fallback described above. */
export function metaForPath(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (ROUTE_META[path]) return ROUTE_META[path]

  const parent = '/' + path.split('/')[1]
  return ROUTE_META[parent] ?? DEFAULT_META
}

/** Absolute canonical URL for a pathname. */
export function canonicalForPath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '')
  return SITE_URL + (path === '' ? '/' : path)
}
