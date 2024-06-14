import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number_id, setPhone_number_id] = useState('');
  const [timezone, setTimezone] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Set the timezone when the component mounts
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(tz);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !phone_number_id) {
      setNotification('Please fill in all fields.');
      return;
    }

    setNotification('');

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, phone_number_id, timezone }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data);
        setNotification('Registration successful! You can now log in.');
      } else {
        console.error('Registration failed:', response.status);
        setNotification(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setNotification('An error occurred during registration.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <>
      {notification && <div className="notification">{notification}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Phone Number ID:
          <input type="text" value={phone_number_id} onChange={e => setPhone_number_id(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
        <button type="button" onClick={handleLoginRedirect}>Login</button>
      </form>
    </>
  );
}

export default Register;