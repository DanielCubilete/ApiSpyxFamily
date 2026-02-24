import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import tomoService from '../../services/tomoService';
import Loading from '../Loading';
import './TomoDetail.css';

const TomoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tomo, setTomo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarTomo();
  }, [id]);

  const cargarTomo = async () => {
    try {
      setLoading(true);
      const data = await tomoService.getById(id);
      setTomo(data);
    } catch (err) {
      setError('Error al cargar el tomo: ' + err.message);
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

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger container mt-4">{error}</div>;
  if (!tomo) return <div className="alert alert-warning container mt-4">Tomo no encontrado</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📖 Detalle del Tomo</h2>
        <Link to="/tomos" className="btn btn-secondary">
          ← Volver a Tomos
        </Link>
      </div>

      <div className="row">
        {/* Columna de la imagen */}
        <div className="col-md-4">
          <div className="tomo-detail-image-container">
            <img
              src={getImagenTomo(tomo)}
              className="img-fluid tomo-detail-image"
              alt={tomo.titulo}
              onError={handleImageError}
            />
            <div className="tomo-detail-badge">
              Vol. {tomo.numero_tomo}
            </div>
          </div>
        </div>

        {/* Columna de la información */}
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title mb-4">{tomo.titulo}</h3>

              <div className="tomo-detail-info">
                <div className="info-group">
                  <h5 className="text-primary">📚 Información del Volumen</h5>
                  <div className="info-item">
                    <span className="info-label">Volumen:</span>
                    <span className="info-value">{tomo.numero_tomo}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">ISBN:</span>
                    <code className="info-value">{tomo.isbn}</code>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Editorial:</span>
                    <span className="info-value">{tomo.editorial}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Fecha de Publicación:</span>
                    <span className="info-value">{formatearFecha(tomo.fecha_publicacion)}</span>
                  </div>
                </div>

                <div className="info-group">
                  <h5 className="text-success">📊 Contenido</h5>
                  <div className="info-item">
                    <span className="info-label">Número de Capítulos:</span>
                    <span className="info-value badge bg-primary">{tomo.numero_capitulos}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Total de Páginas:</span>
                    <span className="info-value badge bg-info">{tomo.paginas}</span>
                  </div>
                </div>

                <div className="info-group">
                  <h5 className="text-secondary">📖 Sinopsis</h5>
                  <p className="sinopsis-text">
                    {tomo.sinopsis || 'Sin sinopsis disponible'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para volver en móvil */}
      <div className="d-md-none mt-3 text-center">
        <Link to="/tomos" className="btn btn-secondary btn-lg">
          ← Volver a Tomos
        </Link>
      </div>
    </div>
  );
};

export default TomoDetail;
