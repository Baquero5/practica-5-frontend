import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');

      if (token) {
        try {
          // Guardar token en localStorage
          localStorage.setItem('token', token);

          // Obtener información del usuario
          const response = await authService.getPerfil();
          
          // Actualizar contexto (si tu AuthContext tiene estos métodos)
          // Si no, el useEffect del AuthContext lo manejará automáticamente
          
          // Redirigir al dashboard
          navigate('/dashboard');
        } catch (error) {
          console.error('Error al procesar callback:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '600'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
        <p>Procesando autenticación...</p>
      </div>
    </div>
  );
};

export default AuthCallback;