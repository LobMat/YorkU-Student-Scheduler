import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './page_scheduler/index.css'
import Header from './page_scheduler/Header.jsx'
import Schedule from './page_scheduler/Schedule.jsx'
import AddCourse from './page_scheduler/AddCourse.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <div id='sect1'>
      <AddCourse />
    </div>
    <div id='sect2'>
      <Schedule term="FALL" />
      <Schedule term="WINTER" />
    </div>
  </StrictMode>,
)
