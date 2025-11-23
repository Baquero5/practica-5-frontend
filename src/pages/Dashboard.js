import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>👋 Bienvenido, {user?.nombre}!</h1>
        
        <div className="info-card">
          <h2>📊 Tu Perfil</h2>
          <div className="profile-info">
            {user?.avatar && (
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="profile-avatar"
              />
            )}
            <div className="profile-details">
              <p><strong>Nombre:</strong> {user?.nombre}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              {user?.edad && <p><strong>Edad:</strong> {user.edad} años</p>}
              {user?.telefono && <p><strong>Teléfono:</strong> {user.telefono}</p>}
              <p><strong>Proveedor:</strong> {user?.provider === 'google' ? '🌐 Google' : '🔐 Local'}</p>
              <p><strong>Miembro desde:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="actions-grid">
          <Link to="/usuarios" className="action-card">
            <h3>👥 Gestionar Usuarios</h3>
            <p>Ver, crear, editar y eliminar usuarios del sistema</p>
          </Link>
          
          <div className="action-card info">
            <h3>✅ Sistema Activo</h3>
            <p>Tu sesión está activa y segura con JWT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;