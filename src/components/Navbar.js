import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🚀 Práctica 5
        </Link>
        
        <ul className="navbar-menu">
          {isAuthenticated ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/usuarios">Usuarios</Link></li>
              <li className="navbar-user">
                👤 {user?.nombre}
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/register" className="btn-register">Registrarse</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;