import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST_DIR = path.resolve(process.cwd(), 'dist')
const SSR_DIR = path.resolve(process.cwd(), 'dist-ssr')

const HERO_IMAGE_PRELOADS = {
  '/': 'about-team',
  '/despre': 'about-team',
  '/servicii': 'service-contabilitate',
  '/contact': 'contact-office',
  '/blog/importanta-eficientei-contabilului-in-succesul-unei-afaceri': 'blog-contabilitate',
}

function escapeAttr(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function upsertHeadTag(html, pattern, tag) {
  if (pattern.test(html)) {
    return html.replace(pattern, tag)
  }
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

async function run() {
  const ssrEntryUrl = pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href
  const { render, PRERENDER_ROUTES, metaForPath, canonicalForPath } = await import(ssrEntryUrl)

  let template = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8')

  // Inline the built Tailwind CSS directly into <head> so there is zero render-blocking CSS request.
  const cssLinkMatch =
    template.match(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'](\/assets\/[^"']+\.css)["'][^>]*>/i) ??
    template.match(/<link\b[^>]*href=["'](\/assets\/[^"']+\.css)["'][^>]*rel=["']stylesheet["'][^>]*>/i)

  if (cssLinkMatch) {
    const cssRelPath = cssLinkMatch[1].replace(/^\//, '')
    const cssFullPath = path.join(DIST_DIR, cssRelPath)
    if (fs.existsSync(cssFullPath)) {
      const cssContent = fs.readFileSync(cssFullPath, 'utf-8').trim()
      template = template.replace(cssLinkMatch[0], `<style>${cssContent}</style>`)
    }
  }

  for (const route of PRERENDER_ROUTES) {
    const appHtml = render(route)
    const { title, description } = metaForPath(route)
    const canonical = canonicalForPath(route)

    let pageHtml = template
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    pageHtml = upsertHeadTag(
      pageHtml,
      /<meta\b[^>]*name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeAttr(description)}">`,
    )
    pageHtml = upsertHeadTag(
      pageHtml,
      /<meta\b[^>]*property=["']og:title["'][^>]*>/i,
      `<meta property="og:title" content="${escapeAttr(title)}">`,
    )
    pageHtml = upsertHeadTag(
      pageHtml,
      /<meta\b[^>]*property=["']og:description["'][^>]*>/i,
      `<meta property="og:description" content="${escapeAttr(description)}">`,
    )
    pageHtml = upsertHeadTag(
      pageHtml,
      /<meta\b[^>]*property=["']og:url["'][^>]*>/i,
      `<meta property="og:url" content="${escapeAttr(canonical)}">`,
    )
    pageHtml = upsertHeadTag(
      pageHtml,
      /<meta\b[^>]*name=["']twitter:title["'][^>]*>/i,
      `<meta name="twitter:title" content="${escapeAttr(title)}">`,
    )
    pageHtml = upsertHeadTag(
      pageHtml,
      /<meta\b[^>]*name=["']twitter:description["'][^>]*>/i,
      `<meta name="twitter:description" content="${escapeAttr(description)}">`,
    )
    pageHtml = upsertHeadTag(
      pageHtml,
      /<link\b[^>]*rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    )

    const heroBase = HERO_IMAGE_PRELOADS[route]
    if (heroBase) {
      const sizes =
        route === '/blog/importanta-eficientei-contabilului-in-succesul-unei-afaceri'
          ? '(max-width: 959px) calc(100vw - 40px), 896px'
          : '(max-width: 1023px) calc(100vw - 40px), 480px'
      const imgPreload =
        `<link rel="preload" as="image" type="image/webp" href="/${heroBase}-760.webp" ` +
        `imagesrcset="/${heroBase}-480.webp 480w, /${heroBase}-760.webp 760w, /${heroBase}-960.webp 960w" ` +
        `imagesizes="${sizes}" fetchpriority="high" />`
      pageHtml = pageHtml.replace(
        '    <link rel="icon"',
        `    ${imgPreload}\n    <link rel="icon"`,
      )
    }

    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    const outPath =
      route === '/'
        ? path.join(DIST_DIR, 'index.html')
        : path.join(DIST_DIR, route.replace(/^\//, ''), 'index.html')

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, pageHtml, 'utf-8')
    console.log(`Prerendered ${route} -> ${path.relative(process.cwd(), outPath)}`)
  }

  fs.rmSync(SSR_DIR, { recursive: true, force: true })
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
