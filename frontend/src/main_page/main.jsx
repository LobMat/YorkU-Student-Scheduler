import { AppProvider }  from './AppContext';
import { createRoot } from 'react-dom/client';

import "./main.css"

import Header from "./header/Header.jsx";
import LeftBody from "./body_left/LeftBody.jsx";
import Schedule from "./body_right/Schedule.jsx";



createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Header />
    <LeftBody />
    <div id='sect2'>
        <Schedule term="FALL"/>
        <Schedule term="WINTER" />
  </div>
  </AppProvider>
);

