import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './page_scheduler/index.css'
import Header from './page_scheduler/Header.jsx'
import Schedule from './page_scheduler/Schedule.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <div id='d1'>1</div>
    <div id='d2'>
      <Schedule />
    </div>
  </StrictMode>,
)
