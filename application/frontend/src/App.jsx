//#region - react imports
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//#endregion
//#region - style imports
import "./App.css"
//#endregion
//#region - assets
import yustLogo from './assets/mylogo.svg';
//#endregion
//#region - page imports
import MainPage from './pages/home/HomePage.jsx';
//#endregion

function App () {

  //#region - html return
  return (
    <>
      <Router>
        <nav className = 'headbar'>
          <img src={yustLogo} className="logo" /> 
          <ul>
              <li><a href="/">Home</a></li>
          </ul>
        </nav>
  
  
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
  
      </Router>
  
    </>
  );
  //#endregion

} 

createRoot(document.getElementById('root')).render(<><App /></>);
