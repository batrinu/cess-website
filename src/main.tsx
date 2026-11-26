import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App, { preloadRoute } from './App.tsx'

async function mount() {
  const rootEl = document.getElementById('root')!
  const tree = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  if (rootEl.hasChildNodes()) {
    await preloadRoute(window.location.pathname)
    hydrateRoot(rootEl, tree)
  } else {
    createRoot(rootEl).render(tree)
  }
}

void mount()
