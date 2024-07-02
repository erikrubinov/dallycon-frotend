import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure this path is correct based on your file structure

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('access_token', data.access_token);
        navigate('/profile'); // Navigate to profile or another protected route
      } else {
        console.error('Login failed:', data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setErrorMessage('Error occurred. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Adjust the path as necessary depending on your router setup
  };

  return (
    <div>
      {errorMessage && <div className="notification">{errorMessage}</div>}
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit} >Login</button>
        <button type="button" onClick={handleRegisterRedirect}>Register</button> {/* New Register button */}
      </form>
    </div>
  );
}

export default Login;
