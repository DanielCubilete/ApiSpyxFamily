import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import personajeService from '../../services/personajeService';
import Loading from '../Loading';
import './PersonajeDetail.css';

const PersonajeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarPersonaje();
  }, [id]);

  const cargarPersonaje = async () => {
    try {
      setLoading(true);
      const data = await personajeService.getById(id);
      setPersonaje(data);
    } catch (err) {
      setError('Error al cargar el personaje: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getImagenPersonaje = (personaje) => {
    if (personaje.imagen_url) {
      return personaje.imagen_url;
    }
    return `https://picsum.photos/seed/spyxfamily-${personaje.nombre.replace(/\s+/g, '')}/400/500`;
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x500/6c757d/ffffff?text=Personaje';
  };

  const getRolBadgeClass = (rol) => {
    const rolClasses = {
      'principal': 'bg-danger',
      'secundario': 'bg-warning',
      'recurrente': 'bg-info',
      'invitado': 'bg-secondary'
    };
    return rolClasses[rol?.toLowerCase()] || 'bg-secondary';
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger container mt-4">{error}</div>;
  if (!personaje) return <div className="alert alert-warning container mt-4">Personaje no encontrado</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👤 Detalle del Personaje</h2>
        <Link to="/personajes" className="btn btn-secondary">
          ← Volver
        </Link>
      </div>

      <div className="row">
        {/* Columna de la imagen */}
        <div className="col-md-4">
          <div className="personaje-detail-image-container">
            <img
              src={getImagenPersonaje(personaje)}
              className="img-fluid personaje-detail-image"
              alt={personaje.nombre}
              onError={handleImageError}
            />
            <div className="personaje-rol-badge">
              <span className={`badge ${getRolBadgeClass(personaje.rol)}`}>
                {personaje.rol || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Columna de la información */}
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-body">
              {/* Nombre y alias */}
              <div className="personaje-header mb-4">
                <h3 className="personaje-nombre">{personaje.nombre}</h3>
                {personaje.alias && (
                  <p className="personaje-alias">
                    <span className="badge bg-secondary">{personaje.alias}</span>
                  </p>
                )}
              </div>

              {/* Información básica */}
              <div className="personaje-info-section mb-4">
                <h5 className="text-primary mb-3">🔍 Información Básica</h5>
                <div className="info-grid">
                  {personaje.edad && (
                    <div className="info-item">
                      <span className="info-label">Edad:</span>
                      <span className="info-value">{personaje.edad} años</span>
                    </div>
                  )}
                  {personaje.organizacion && (
                    <div className="info-item">
                      <span className="info-label">Organización:</span>
                      <span className="info-value badge bg-primary">{personaje.organizacion}</span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="info-label">Rol:</span>
                    <span className={`info-value badge ${getRolBadgeClass(personaje.rol)}`}>
                      {personaje.rol || 'No especificado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="personaje-info-section mb-4">
                <h5 className="text-secondary mb-3">📖 Descripción</h5>
                <p className="personaje-descripcion">
                  {personaje.descripcion || 'Sin descripción disponible'}
                </p>
              </div>

              {/* Habilidades */}
              {personaje.habilidades && personaje.habilidades.length > 0 && (
                <div className="personaje-info-section">
                  <h5 className="text-success mb-3">⚡ Habilidades</h5>
                  <div className="habilidades-container">
                    {personaje.habilidades.map((habilidad, index) => (
                      <span key={index} className="badge bg-success habilidad-badge">
                        {habilidad}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botón para volver en móvil */}
      <div className="d-md-none mt-3 text-center">
        <Link to="/personajes" className="btn btn-secondary btn-lg">
          ← Volver a Personajes
        </Link>
      </div>
    </div>
  );
};

export default PersonajeDetail;
