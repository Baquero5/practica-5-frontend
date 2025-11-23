import React, { useState, useEffect } from 'react';
import { usuariosService } from '../services/api';
import './Usuarios.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    telefono: ''
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await usuariosService.getAll();
      setUsuarios(response.data.data);
      setError('');
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    try {
      await usuariosService.delete(id);
      cargarUsuarios();
    } catch (err) {
      alert('Error al eliminar usuario');
    }
  };

  const handleEdit = (usuario) => {
    setEditingUser(usuario);
    setFormData({
      nombre: usuario.nombre,
      edad: usuario.edad || '',
      telefono: usuario.telefono || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await usuariosService.update(editingUser._id, {
        ...formData,
        edad: formData.edad ? parseInt(formData.edad) : undefined
      });
      setEditingUser(null);
      setFormData({ nombre: '', edad: '', telefono: '' });
      cargarUsuarios();
    } catch (err) {
      alert('Error al actualizar usuario');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="usuarios-container">
        <div className="loading">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className="usuarios-container">
      <div className="usuarios-content">
        <h1>👥 Gestión de Usuarios</h1>
        
        {error && <div className="alert alert-error">{error}</div>}

        {editingUser && (
          <div className="edit-modal">
            <div className="modal-content">
              <h2>✏️ Editar Usuario</h2>
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Edad</label>
                  <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="usuarios-stats">
          <div className="stat-card">
            <h3>{usuarios.length}</h3>
            <p>Usuarios Totales</p>
          </div>
        </div>

        <div className="usuarios-grid">
          {usuarios.map(usuario => (
            <div key={usuario._id} className="usuario-card">
              {usuario.avatar && (
                <img 
                  src={usuario.avatar} 
                  alt={usuario.nombre}
                  className="usuario-avatar"
                />
              )}
              <div className="usuario-info">
                <h3>{usuario.nombre}</h3>
                <p>📧 {usuario.email}</p>
                {usuario.edad && <p>🎂 {usuario.edad} años</p>}
                {usuario.telefono && <p>📱 {usuario.telefono}</p>}
                <p className="usuario-provider">
                  {usuario.provider === 'google' ? '🌐 Google' : '🔐 Local'}
                </p>
              </div>
              <div className="usuario-actions">
                <button 
                  onClick={() => handleEdit(usuario)}
                  className="btn-edit"
                >
                  ✏️ Editar
                </button>
                <button 
                  onClick={() => handleDelete(usuario._id)}
                  className="btn-delete"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Usuarios;