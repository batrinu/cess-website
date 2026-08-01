import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { canonicalForPath, metaForPath } from '../lib/routeMeta'

/**
 * Keeps <title>, the description, the Open Graph tags and the canonical link in sync
 * with the current route.
 *
 * This is a client-side SPA, so there is no per-route HTML to put these in. Rendering
 * nothing and writing straight to document.head keeps it to one mount point in Layout
 * instead of a change in every page component.
 *
 * og:image is deliberately left alone — it is the same site-wide image and is already
 * set as an absolute URL in index.html.
 */
function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { title, description } = metaForPath(pathname)
    const canonical = canonicalForPath(pathname)

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertCanonical(canonical)
  }, [pathname])

  return null
}
