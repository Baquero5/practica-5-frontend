import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero">
        <h1>🚀 Bienvenido a Práctica 5</h1>
        <p className="subtitle">
          Sistema de Gestión de Usuarios con Autenticación JWT y OAuth
        </p>
        
        {isAuthenticated ? (
          <div className="welcome-card">
            <h2>¡Hola, {user?.nombre}! 👋</h2>
            <p>Ya estás autenticado. Explora las funcionalidades:</p>
            <div className="button-group">
              <Link to="/dashboard" className="btn btn-primary">
                Ver Dashboard
              </Link>
              <Link to="/usuarios" className="btn btn-secondary">
                Gestionar Usuarios
              </Link>
            </div>
          </div>
        ) : (
          <div className="auth-options">
            <h2>Comienza ahora</h2>
            <div className="button-group">
              <Link to="/login" className="btn btn-primary">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Registrarse
              </Link>
            </div>
          </div>
        )}

        <div className="features">
          <div className="feature-card">
            <h3>🔐 Autenticación Segura</h3>
            <p>Sistema de login con JWT y encriptación de contraseñas</p>
          </div>
          <div className="feature-card">
            <h3>🌐 Login con Google</h3>
            <p>Autenticación OAuth 2.0 con tu cuenta de Google</p>
          </div>
          <div className="feature-card">
            <h3>👥 Gestión de Usuarios</h3>
            <p>CRUD completo para administrar usuarios</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;