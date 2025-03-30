//#region - react imports
import { createContext, useContext, memo, useState, useRef, useEffect, React } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//#endregion
//#region - custom logic imports
import { readLocal, writeSession, POST, deleteLocal } from './logic/BrowserStorage.js'
import { useObjectList, useTrigger } from './logic/CustomStates.js'
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
import ComparePage from './pages/compare/ComparePage.jsx';
import ReviewPage from './pages/review/ReviewPage.jsx';
import LogoutPage from './pages/logout/LogoutPage.jsx';
//#endregion

//#region - context creation
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);
//#endregion

function App() {

  //#region - instantiation

  // upon the mounting of the app (which should only occur on site entry/refresh), reinstantiate
  // global state variables and run effects.

  // sign-in/page loading states
  const appHasMounted = useRef(false);
  const [navigationDependency, navigationTrigger] = useTrigger();
  const [hasSignedIn, setHasSignedIn] = useState(false);
  const [overlayState, setOverlayState] = useState(0);


  //#region - repeat fetch calls:
  const courseListFromPrefs = (prefObject) => {
    return fetch(`http://localhost:3000/courses/init?data=${encodeURIComponent(JSON.stringify(prefObject))}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => data.courseObjectList);
  }

  const loadFriendsList = () => {
    const qp = new URLSearchParams();
    qp.append('user', `${readLocal('id')}`);

    return fetch(`http://localhost:3000/accounts/getFriends?${qp.toString()}`, { method: "GET" })
      .then(response => response.json())
      .then(data => data.friends)
      .catch(error => {
        throw new Error(error.message);
      })
  }
  //#endregion

  // organization:
  const fetchMethods = { courseListFromPrefs, loadFriendsList };
  const navigation = { navigationDependency, navigationTrigger, hasSignedIn };
  const overlay = { overlayState, setOverlayState };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOverlayState(0);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [])

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
  }, [navigationDependency]);



  //memoized component based on mount status and login status determining which links to be displayed
  const ShownLinks = memo(function ShownLinks({ hasSignedIn }) {
    // do not show either if app has not mounted, avoids flickering.
    if (!appHasMounted.current) {
      return (<></>);
    }
    // display login and register links if you are NOT logged in
    else if (!hasSignedIn) {
      return (<>
        <li><a href="/login" onClick={() => writeSession('loginErr', "")}>Login</a></li>
        <li><a href="/register" onClick={() => writeLocal('errFlags', ["", "", ""])}>Register</a></li>
      </>)
    }
    else {
      return (<>
        <li><a href="/friends">Friends</a></li>
        <li><a href="/review">Review</a></li>
        <li><a href="/compare">Compare</a></li>
        <li><a href="/logout">Logout</a></li>
      </>)
    }
  });
  //#endregion

  //#region - html return

  return (
    <AppContext.Provider value={{ fetchMethods, navigation, overlay }}>
      {(overlayState > 0) ? <><div className='overlay' /></> : <></>}
      <Router>
        <nav className='headbar'>
          <img src={yustLogo} className="logo" />
          <ul className='nav-options'>
            <li><a href="/">Home</a></li>
            <ShownLinks hasSignedIn={hasSignedIn} />
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>

      </Router>

    </AppContext.Provider>
  );
  //#endregion

}
createRoot(document.getElementById('root')).render(<><App /></>);
