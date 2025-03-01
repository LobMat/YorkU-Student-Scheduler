//#region - react imports
import { createContext, useContext, memo, useState, useRef, useEffect, React } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//#endregion
//#region - custom logic imports
import {readLocal, writeSession, POST, deleteLocal} from './logic/BrowserStorage.js'
import { useTrigger } from './logic/CustomStates.js'
//#endregion
//#region - assets and styles
import "./App.css"
import yustLogo from './assets/mylogo.svg';
//#endregion
//#region - page imports
  import MainPage from './pages/home/HomePage.jsx';
  import LoginPage from './pages/login/LoginPage.jsx';
  import RegisterPage from './pages/register/RegisterPage.jsx';
  import Friends from './pages/friends/Friends.jsx';
import ReviewPage from './pages/review/ReviewPage.jsx';
  //#endregion

//#region - context creation
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);
//#endregion

function App () {

  //#region - instantiation

  // upon the mounting of the app (which should only occur on site entry/refresh), reinstantiate
  // global state variables and run effects.

  const appHasMounted = useRef(false);                      // check for page mounted
  const [navDep, navTrig] = useTrigger();                   // trigger when a page is navigated to.
  const [hasSignedIn, setHasSignedIn] = useState(false);    // this hook is updated when navigation is set to false.
  const [overlayIsActive, setOverlayIsActive] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOverlayIsActive(0);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [])
  // mount/navigation effect -- check login status
  useEffect(() => {
    appHasMounted.current = true;
    const localAccKey = readLocal('id');
    if (!localAccKey) {
      setHasSignedIn(false);
    } else {
      fetch(`http://localhost:3000/accounts/verifyID?id=${encodeURIComponent(localAccKey)}`)
      .then(response => {
        setHasSignedIn(response.ok);
        if (!response.ok) {
          deleteLocal('id');
        }
      })
    }
  }, [navDep]);
  
  //memoized component based on mount status and login status determining which links to be displayed
  const ShownLinks = memo(function ShownLinks({hasSignedIn}) {
    // do not show either if app has not mounted, avoids flickering.
    if (!appHasMounted.current) {
      return(<></>);
    } 
    // display login and register links if you are NOT logged in
    else if (!hasSignedIn) {
      return(<>
        <li><a href="/login" onClick={() => writeSession('loginErr', "")}>Login</a></li>
        <li><a href="/register" onClick={() => writeLocal('errFlags', ["", "", ""])}>Register</a></li>
      </>)
    } 
    else { 
      return(<>
        <li><a href="/friends">Friends</a></li>
        <li><a href="/review">Review</a></li>
      </>)
    }
  });
  //#endregion
  
  //#region - html return
  
  document.onnkeydown =  function (evt) {
    evt = evt || window.Event;
    if (evt.keyCode == 27 || "key" in evt && (evt.key == "Escape" || evt.key == "Esc")){
      setOverlayIsActive(false);
    }
  }

  return (
    <AppContext.Provider value={{navDep, navTrig, hasSignedIn,overlayIsActive, setOverlayIsActive}}>
      {(overlayIsActive > 0) ? <><div className='overlay'/></> : <></>}
      <Router>
        <nav className = 'headbar'>
          <img src={yustLogo} className="logo" /> 
          <ul>
              <li><a href="/">Home</a></li>
              <ShownLinks hasSignedIn={hasSignedIn}/>
          </ul>
        </nav>  
  
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/friends" element={<Friends />}/>
          <Route path="/review" element={<ReviewPage />}/>
        </Routes>
  
      </Router>
  
    </AppContext.Provider>
  );
  //#endregion

} 

createRoot(document.getElementById('root')).render(<><App /></>);
