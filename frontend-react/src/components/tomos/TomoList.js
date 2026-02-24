import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TomoList.css';
import tomoService from '../../services/tomoService';
import Loading from '../Loading';

const TomoList = () => {
  const navigate = useNavigate();
  const [tomos, setTomos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    cargarTomos();
  }, []);

  const cargarTomos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tomoService.getAll();
      console.log('Tomos cargados:', data);
      setTomos(data);
    } catch (err) {
      setError('Error al cargar los tomos: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getImagenTomo = (tomo) => {
    if (tomo.imagen_url) {
      return tomo.imagen_url;
    }
    return `https://picsum.photos/seed/spyxfamily-tomo${tomo.numero_tomo}/300/450`;
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x450/6c757d/ffffff?text=Tomo';
  };

  const filtrarTomos = () => {
    if (!searchTerm) {
      return tomos;
    }
    const term = searchTerm.toLowerCase();
    return tomos.filter(tomo => 
      tomo.titulo.toLowerCase().includes(term) ||
      tomo.isbn.toLowerCase().includes(term) ||
      tomo.editorial.toLowerCase().includes(term) ||
      (tomo.sinopsis && tomo.sinopsis.toLowerCase().includes(term))
    );
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const tomosFiltrados = filtrarTomos();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📖 Tomos del Manga SPY×FAMILY</h2>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-10">
              <label className="form-label fw-bold">Buscar:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por título, ISBN, editorial o sinopsis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button 
                className="btn btn-secondary w-100"
                onClick={() => setSearchTerm('')}
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-3">
        <span className="badge bg-primary">
          {tomosFiltrados.length} tomo{tomosFiltrados.length !== 1 ? 's' : ''} encontrado{tomosFiltrados.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid de tomos */}
      {tomosFiltrados.length === 0 ? (
        <div className="alert alert-info">
          No se encontraron tomos con los filtros seleccionados.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 g-4 mb-4">
          {tomosFiltrados.map((tomo) => (
            <div key={tomo._id} className="col">
              <div 
                className="card h-100 tomo-card" 
                onClick={() => navigate(`/tomos/${tomo._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={getImagenTomo(tomo)}
                  className="card-img-top"
                  alt={tomo.titulo}
                  style={{ height: '350px', objectFit: 'contain' }}
                  onError={handleImageError}
                />
                <div className="card-body">
                  <span className="badge bg-primary mb-2">Vol. {tomo.numero_tomo}</span>
                  <h6 className="card-title">{tomo.titulo}</h6>
                  <p className="card-text small tomo-sinopsis">
                    {tomo.sinopsis || 'Sin sinopsis disponible'}
                  </p>
                  <div className="small text-muted">
                    <div><strong>ISBN:</strong> <code className="small">{tomo.isbn}</code></div>
                    <div><strong>Publicación:</strong> {formatearFecha(tomo.fecha_publicacion)}</div>
                    <div><strong>Editorial:</strong> {tomo.editorial}</div>
                    <div><strong>Capítulos:</strong> {tomo.numero_capitulos} | <strong>Páginas:</strong> {tomo.paginas}</div>
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

export default TomoList;
