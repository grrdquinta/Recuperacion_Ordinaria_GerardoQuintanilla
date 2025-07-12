// App.jsx - Archivo principal
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import DashboardPage from './pages/Dashboard/Dashboard';
import StudentsPage from './pages/StudentsPage/StudentsPage';
import Navbar from './pages/Navbar/Navbar';
import "./components/EscuelitaMarvelApp.css";

// Layout component para páginas que necesitan navbar
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        {children}
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f3f4f6, #dbeafe)'}}>
        <Routes>
          {/* Página de bienvenida sin navbar */}
          <Route path="/" element={<WelcomePage />} />
          
          {/* Páginas con navbar */}
          <Route path="/dashboard" element={
            <Layout>
              <DashboardPage />
            </Layout>
          } />
          
          <Route path="/students" element={
            <Layout>
              <StudentsPage />
            </Layout>
          } />
          
          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;