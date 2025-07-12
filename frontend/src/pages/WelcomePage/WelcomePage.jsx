// pages/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, Shield } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-screen">
      <div className="welcome-bg-effects">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
      <div className="welcome-card">
        <div className="welcome-icon">
          <Shield className="animate-bounce" style={{width: '128px', height: '128px', color: '#fbbf24'}} />
        </div>
        <h1 className="welcome-title">Escuelita Marvel</h1>
        <p className="welcome-subtitle">Sistema de Gestión Estudiantil</p>
        <div className="welcome-description">
          🦸‍♂️ Bienvenido al sistema de gestión estudiantil más avanzado del universo Marvel. 
          Administra estudiantes con el poder de los superhéroes. 🦸‍♀️
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Users style={{width: '32px', height: '32px', color: '#60a5fa'}} />
            </div>
            <div className="feature-text">Gestión CRUD Completa</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BarChart3 style={{width: '32px', height: '32px', color: '#34d399'}} />
            </div>
            <div className="feature-text">Estadísticas Avanzadas</div>
          </div>
        </div>
        <button 
          className="welcome-button" 
          onClick={() => navigate('/dashboard')}
        >
          🚀 Activar Poderes
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;