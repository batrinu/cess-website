import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

// BrowserRouter gives each page a real, crawlable URL (/servicii rather than
// /#/servicii). It requires the server to serve index.html for unknown paths —
// see public/_redirects for the Cloudflare Pages rule. Legacy #/ links are
// rewritten to real paths by the small shim in index.html.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
