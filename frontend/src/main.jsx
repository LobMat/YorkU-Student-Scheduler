import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './page_scheduler/index.css'
import Header from './page_scheduler/Header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <div>1</div>
    <div>2</div>
  </StrictMode>,
)
