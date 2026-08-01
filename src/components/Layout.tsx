import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import RouteMeta from './RouteMeta'

export default function Layout() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Renders nothing; syncs title/description/canonical with the current route. */}
      <RouteMeta />
      <Navbar />
      {/* Boundary sits inside main so the navbar and footer stay mounted while a
          lazily-loaded page chunk is in flight. min-height stops the footer jumping. */}
      {/* id is the target of the "Sari la conținut" skip link in Navbar; tabIndex={-1}
          is what makes focus actually land here rather than only scrolling. */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={<div className="min-h-[60dvh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
