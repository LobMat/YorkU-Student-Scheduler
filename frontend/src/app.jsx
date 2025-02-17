import { AppProvider }  from './AppContext';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./app.css"
import yustLogo from './assets/mylogo.svg';

import MainPage from './main_page/MainPage.jsx';
import LoginPage from './login/LoginPage.jsx';
import RegisterPage from './register/RegisterPage.jsx';



createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Router>
      <nav className = 'headbar'>
        <img src={yustLogo} className="logo" /> 
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register" onClick={()=> localStorage.setItem('errFlags', JSON.stringify(["","",""]))}>Register</a></li>
        </ul>
      </nav>


      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>

  </AppProvider>
);

