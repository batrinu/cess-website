import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Servicii from './pages/Servicii'
import Despre from './pages/Despre'
import Certificari from './pages/Certificari'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Termeni from './pages/Termeni'
import Confidentialitate from './pages/Confidentialitate'
import Cookie from './pages/Cookie'

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
