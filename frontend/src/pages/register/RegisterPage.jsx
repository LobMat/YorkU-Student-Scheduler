import React, {useState} from 'react';
import  { useNavigate } from 'react-router-dom'
import './RegisterPage.css'

function RegisterPage() {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    const { username, email, password, confirmPassword } = formData;

    const response = await fetch(`http://localhost:5000/accounts/register`, {
      method: 'POST',
      
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password, confirmPassword}),
    });

    if (!response.ok) {
      const result = await response.json();
     
      console.log('err!')
      localStorage.setItem('errFlags', JSON.stringify(result.err));
      window.location.reload();
      console.log(result)
    } else {
      navigate('/success')
    }
    // Here you can validate the form data and send it to your backend
    console.log({ username, email, password, confirmPassword });
  };

  return(
    <div className="registration-page">
      <div className="form-container">
          <form onSubmit={handleSubmit}>
      <p>{
        JSON.parse(localStorage.getItem('errFlags'))[0]
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
        JSON.parse(localStorage.getItem('errFlags'))[1]
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
        JSON.parse(localStorage.getItem('errFlags'))[2]
      }</p>    
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
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

