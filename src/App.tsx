import { lazy } from 'react'
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
// Home is the landing route, so it stays eager — lazily loading it would add a
// round trip on the most common entry point. Every other page splits into its
// own chunk, fetched only when that route is visited. The Suspense boundary
// lives in Layout, around the Outlet.
import Home from './pages/Home'

const loaders = {
  '/servicii': () => import('./pages/Servicii'),
  '/despre': () => import('./pages/Despre'),
  '/certificari': () => import('./pages/Certificari'),
  '/blog': () => import('./pages/Blog'),
  '/contact': () => import('./pages/Contact'),
  '/termeni': () => import('./pages/Termeni'),
  '/confidentialitate': () => import('./pages/Confidentialitate'),
  '/cookie': () => import('./pages/Cookie'),
} as const

const Servicii = lazy(loaders['/servicii'])
const Despre = lazy(loaders['/despre'])
const Certificari = lazy(loaders['/certificari'])
const Blog = lazy(loaders['/blog'])
const Contact = lazy(loaders['/contact'])
const Termeni = lazy(loaders['/termeni'])
const Confidentialitate = lazy(loaders['/confidentialitate'])
const Cookie = lazy(loaders['/cookie'])

/** Preload lazy route module before hydrating a prerendered interior page. */
export async function preloadRoute(pathname: string): Promise<void> {
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  if (clean === '/') return
  if (clean.startsWith('/blog')) {
    await loaders['/blog']()
    return
  }
  const loader = loaders[clean as keyof typeof loaders]
  if (loader) {
    await loader()
  }
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="servicii" element={<Servicii />} />
        <Route path="despre" element={<Despre />} />
        <Route path="certificari" element={<Certificari />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/*" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="termeni" element={<Termeni />} />
        <Route path="confidentialitate" element={<Confidentialitate />} />
        <Route path="cookie" element={<Cookie />} />
      </Route>
    </Routes>
  )
}
