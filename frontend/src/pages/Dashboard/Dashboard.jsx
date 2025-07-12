// pages/DashboardPage.jsx
import React from 'react';
import { Users, User, BarChart3 } from 'lucide-react';
import useStudents from '../../components/Hooks/useStudents';

const DashboardPage = () => {
  const { students, loading, activeStudents, inactiveStudents } = useStudents();

  if (loading) {
    return (
      <div className="dashboard">
        <div style={{ textAlign: 'center', padding: '48px' }}>
          Cargando estadísticas...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">⚡ Centro de comando</h2>
        <p className="dashboard-subtitle">Panel de control heroico - Estadísticas del universo estudiantil</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card active">
          <div className="stat-info">
            <h3>🟢 Estudiantes Activos</h3>
            <div className="stat-number">{activeStudents}</div>
            <div className="stat-description">Héroes en entrenamiento</div>
          </div>
          <div className="stat-icon">
            <Users style={{width: '48px', height: '48px'}} />
          </div>
        </div>
        
        <div className="stat-card inactive">
          <div className="stat-info">
            <h3>🔴 Estudiantes Inactivos</h3>
            <div className="stat-number">{inactiveStudents}</div>
            <div className="stat-description">En modo descanso</div>
          </div>
          <div className="stat-icon">
            <User style={{width: '48px', height: '48px'}} />
          </div>
        </div>
        
        <div className="stat-card total">
          <div className="stat-info">
            <h3>🎯 Total de Héroes</h3>
            <div className="stat-number">{students.length}</div>
            <div className="stat-description">Universo completo</div>
          </div>
          <div className="stat-icon">
            <BarChart3 style={{width: '48px', height: '48px'}} />
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <h3>📊 Distribución de Poder</h3>
          <div className="progress-bar">
            <span>Héroes Activos</span>
            <div className="progress-container">
              <div className="progress-track">
                <div 
                  className="progress-fill active"
                  style={{ width: `${students.length > 0 ? (activeStudents / students.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="progress-percentage">
                {students.length > 0 ? Math.round((activeStudents / students.length) * 100) : 0}%
              </span>
            </div>
          </div>
          <div className="progress-bar">
            <span>Héroes en Descanso</span>
            <div className="progress-container">
              <div className="progress-track">
                <div 
                  className="progress-fill inactive"
                  style={{ width: `${students.length > 0 ? (inactiveStudents / students.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="progress-percentage">
                {students.length > 0 ? Math.round((inactiveStudents / students.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="content-card">
          <h3>🌟 Últimos Reclutas</h3>
          <div>
            {students.slice(-3).reverse().map((student) => (
              <div key={student._id} className="recent-student">
                <div className="student-info">
                  <div className="student-avatar">
                    {student.nombre.charAt(0)}
                  </div>
                  <div>
                    <div className="student-name">{student.nombre} {student.apellido}</div>
                    <div className="student-grade">{student.grado} - {student.carnet}</div>
                  </div>
                </div>
                <div>
                  <span className={`status-badge ${student.estado === 'activo' ? 'status-active' : 'status-inactive'}`}>
                    {student.estado === 'activo' ? '🟢 ACTIVO' : '🔴 INACTIVO'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;