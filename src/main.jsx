import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Clear the old "pause animations" preference saved by an earlier version of the site
try { localStorage.removeItem('motion-paused') } catch { /* storage unavailable */ }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
