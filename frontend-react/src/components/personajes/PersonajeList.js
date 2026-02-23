import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import personajeService from '../../services/personajeService';
import Loading from '../Loading';

const PersonajeList = () => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');

  const getImagenPersonaje = (personaje) => {
    // Si el personaje tiene imagen_url, usarla
    if (personaje.imagen_url) {
      return personaje.imagen_url;
    }
    // Fallback con placeholder
    const nombreSlug = personaje.nombre.toLowerCase().replace(/\s+/g, '-');
    return `https://picsum.photos/seed/spyxfamily-${nombreSlug}/400/500`;
  };

  useEffect(() => {
    cargarPersonajes();
  }, []);

  const cargarPersonajes = async () => {
    try {
      setLoading(true);
      const data = await personajeService.getAll();
      setPersonajes(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar personajes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar a "${nombre}"?`)) {
      try {
        await personajeService.delete(id);
        alert('Personaje eliminado correctamente');
        cargarPersonajes();
      } catch (err) {
        alert('Error al eliminar personaje: ' + err.message);
      }
    }
  };

  const personajesFiltrados = personajes.filter((personaje) => {
    const matchSearch =
      searchTerm === '' ||
      personaje.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (personaje.alias && personaje.alias.toLowerCase().includes(searchTerm.toLowerCase())) ||
      personaje.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRol = rolFiltro === '' || personaje.rol === rolFiltro;
    return matchSearch && matchRol;
  });

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👥 Personajes</h2>
        <Link to="/personajes/nuevo" className="btn btn-primary">
          <i className="bi bi-plus-lg"></i> Nuevo Personaje
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">Buscar</label>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre, alias o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Filtrar por Rol</label>
              <select
                className="form-select"
                value={rolFiltro}
                onChange={(e) => setRolFiltro(e.target.value)}
              >
                <option value="">Todos los roles</option>
                <option value="principal">Principal</option>
                <option value="secundario">Secundario</option>
                <option value="recurrente">Recurrente</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {personajesFiltrados.length === 0 ? (
        <div className="alert alert-info">
          No se encontraron personajes con los filtros seleccionados.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {personajesFiltrados.map((personaje) => (
            <div key={personaje._id} className="col">
              <div className="card h-100">
                <img
                  src={getImagenPersonaje(personaje)}
                  className="card-img-top"
                  alt={personaje.nombre}
                  style={{ height: '300px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x500/667EEA/ffffff?text=${personaje.nombre}`;
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{personaje.nombre}</h5>
                  {personaje.alias && (
                    <p className="text-muted small mb-2">
                      <i className="bi bi-shield-check"></i> {personaje.alias}
                    </p>
                  )}
                  <div className="mb-2">
                    <span
                      className={`badge ${
                        personaje.rol === 'principal'
                          ? 'bg-primary'
                          : personaje.rol === 'secundario'
                          ? 'bg-success'
                          : 'bg-info'
                      } me-2`}
                    >
                      {personaje.rol}
                    </span>
                    {personaje.edad && (
                      <span className="badge bg-secondary">
                        {personaje.edad} años
                      </span>
                    )}
                  </div>
                  {personaje.organizacion && (
                    <p className="small text-muted mb-2">
                      <i className="bi bi-building"></i> {personaje.organizacion}
                    </p>
                  )}
                  <p className="card-text small" style={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {personaje.descripcion}
                  </p>
                </div>
                <div className="card-footer bg-white border-top">
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/personajes/${personaje._id}`}
                      className="btn btn-sm btn-info"
                    >
                      <i className="bi bi-eye"></i> Ver
                    </Link>
                    <Link
                      to={`/personajes/editar/${personaje._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(personaje._id, personaje.nombre)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonajeList;
