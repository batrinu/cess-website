import { lazy } from 'react'
import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
// Home is the landing route, so it stays eager — lazily loading it would add a
// round trip on the most common entry point. Every other page splits into its
// own chunk, fetched only when that route is visited. The Suspense boundary
// lives in Layout, around the Outlet.
import Home from './pages/Home'

const Servicii = lazy(() => import('./pages/Servicii'))
const Despre = lazy(() => import('./pages/Despre'))
const Certificari = lazy(() => import('./pages/Certificari'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const Termeni = lazy(() => import('./pages/Termeni'))
const Confidentialitate = lazy(() => import('./pages/Confidentialitate'))
const Cookie = lazy(() => import('./pages/Cookie'))

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
