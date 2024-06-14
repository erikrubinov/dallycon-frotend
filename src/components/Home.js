import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file here

function Home() {
  return (
    <div className="container">
      <h1>Dallycon</h1>
      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Home;
