import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Penanda untuk animasi reveal: hanya aktif kalau JS jalan.
// (CSS menyembunyikan .reveal hanya di bawah selector ini.)
document.documentElement.classList.add('js-reveal')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
