import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header>
        <h1>Restaurant Homepage System</h1>
      </header>
      <button className="login-button" onClick={() => navigate('/login')}>
        Login
      </button>
    </div>
  );
}

export default Home;
