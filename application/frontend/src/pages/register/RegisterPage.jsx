import React, {useState, useEffect} from 'react';
import  { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../App';
import { useMountedEffect } from '../../logic/CustomEffects';
import './RegisterPage.css'
import { readSession, writeSession, POST, readLocal } from '../../logic/BrowserStorage';


function RegisterPage() {

  //#region - instantiation 
  const navigate = useNavigate();  
  const {navDep, navTrig, hasSignedIn} = useAppContext();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    passOne: '',
    passTwo: '',
  });

  useEffect(()=>{navTrig()},[]);

  useMountedEffect(() => {
    if (hasSignedIn) {
      navigate('/')
    } 
  },[navDep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    const coursePrefs = readLocal('coursePrefs') ?? {};
    const { username, email, passOne, passTwo} = formData;

    fetch(`http://localhost:3000/accounts/register`, POST({ username, email, passOne, passTwo, coursePrefs}))
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          writeSession('errFlags', data.errFlags);
          window.location.reload();
        })
      } else {
        navigate('/login')
      }
    })
  };

  return(
    <div className="registration-page">
      <div className="form-container">
          <form onSubmit={handleSubmit}>
      <p>{
        readSession('errFlags')?.[0]
      }</p>    
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
            <p>{
        readSession('errFlags')?.[1]
      }</p>    
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

<p>{
        readSession('errFlags')?.[2]
      }</p>    
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="passOne"
        name="passOne"
        value={formData.passOne}
        onChange={handleChange}
        required
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="passTwo"
        name="passTwo"
        value={formData.passTwo}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>
    </form>
   </div>
   </div>
  );
}

export default RegisterPage

