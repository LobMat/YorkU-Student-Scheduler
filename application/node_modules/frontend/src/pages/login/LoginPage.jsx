import React, {useState, useEffect} from 'react';
import  { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';
import { useMountedEffect } from '../../logic/CustomEffects';
import './LoginPage.css'
import { readSession, writeSession, writeLocal } from '../../logic/BrowserStorage';
function LoginPage() {

  //#region - instantiation
  
  const navigate = useNavigate();
  const {navDep, navTrig, hasSignedIn} = useAppContext();

  // mount effect, check for valid login
  useEffect(()=>{navTrig()},[]);

  // post-mount effect, check for any changes to login status after first render.
  useMountedEffect(()=> {
    if (hasSignedIn) {
      navigate('/');
    }
  }, [navDep])

  //hooks for input fields
  const err =  readSession('loginErr') ?? ""; 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  //#region - event handlers 
  // ** handle input change ** //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ** handle submission button press ** //
  const handleSubmit = async (e) => {
    e.preventDefault();  // prevent default form submission
    const parameters = new URLSearchParams();
    parameters.append('idField', `${formData.username}`);
    parameters.append('password', `${formData.password}`);
    
    // backend call.
    fetch(`http://localhost:3000/accounts/login?${parameters.toString()}`)
    .then(async response => {
      const data = await response.json();
      if (response.status == 200) {
        writeLocal('id', data.key);
        writeLocal('coursePrefs', data.prefs);
        navigate('/');
      } else {
        writeSession('loginErr', data.err);
        window.location.reload();
      }
    })
  }

  //#endregion - selection handlers 
  return(
    <div className="login-page">
      <div className="form-container">
          <form onSubmit={handleSubmit}>
      <p>{err
      }</p>    
      <label htmlFor="username">Username or Email</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>
    </form>
   </div>
   </div>
  );
}
export default LoginPage

