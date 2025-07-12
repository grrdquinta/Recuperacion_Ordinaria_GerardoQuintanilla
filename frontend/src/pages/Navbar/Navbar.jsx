// components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-icon">
            <GraduationCap style={{width: '40px', height: '40px', color: '#fbbf24'}} />
          </div>
          <div className="navbar-text">
            <h1>Escuelita Marvel</h1>
            <p>Hero Management System</p>
          </div>
        </div>
        <div className="navbar-menu">
          <Link
            to="/dashboard"
            className={`navbar-button ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <Home style={{width: '20px', height: '20px'}} />
            <span>Centro de comando</span>
          </Link>
          <Link
            to="/students"
            className={`navbar-button ${isActive('/students') ? 'active' : ''}`}
          >
            <Users style={{width: '20px', height: '20px'}} />
            <span>Academia</span>
          </Link>
          <button
            onClick={() => navigate('/')}
            className="navbar-button"
          >
            🚪 Salir
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;