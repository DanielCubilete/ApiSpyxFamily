import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import episodioService from '../../services/episodioService';
import temporadaService from '../../services/temporadaService';
import Loading from '../Loading';
import './EpisodioDetail.css';

const EpisodioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episodio, setEpisodio] = useState(null);
  const [temporada, setTemporada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarEpisodio();
  }, [id]);

  const cargarEpisodio = async () => {
    try {
      setLoading(true);
      console.log('Cargando episodio con ID:', id);
      const data = await episodioService.getById(id);
      console.log('Episodio cargado:', data);
      setEpisodio(data);
      
      // Cargar información de la temporada
      if (data.temporada_id) {
        try {
          // Si temporada_id es un objeto (ya tiene populate), usarlo directamente
          if (typeof data.temporada_id === 'object' && data.temporada_id._id) {
            console.log('Usando temporada ya poblada:', data.temporada_id);
            setTemporada(data.temporada_id);
          } else {
            // Si es un string (ID), cargar la temporada
            console.log('Cargando temporada con ID:', data.temporada_id);
            const tempData = await temporadaService.getById(data.temporada_id);
            console.log('Temporada cargada:', tempData);
            setTemporada(tempData);
          }
        } catch (err) {
          console.error('Error al cargar temporada:', err);
        }
      }
    } catch (err) {
      console.error('Error al cargar episodio:', err);
      setError('Error al cargar el episodio: ' + err.message);
    } finally {
      setLoading(false);
    }
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
  if (!episodio) return <div className="alert alert-warning container mt-4">Episodio no encontrado</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🎬 Detalle del Episodio</h2>
        <Link to="/episodios" className="btn btn-secondary">
          ← Volver a Episodios
        </Link>
      </div>

      <div className="card episodio-detail-card">
        <div className="card-body">
          {/* Título y temporada */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h3 className="card-title mb-2">{episodio.titulo}</h3>
              {temporada && (
                <span className="badge bg-primary mb-3">
                  Temporada {temporada.numero_temporada} - {temporada.titulo}
                </span>
              )}
            </div>
          </div>

          {/* Información principal */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="info-card">
                <h5 className="text-primary mb-3">📺 Información del Episodio</h5>
                <div className="info-item">
                  <span className="info-label">Número:</span>
                  <span className="info-value badge bg-primary">Episodio {episodio.numero_episodio}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Fecha de Emisión:</span>
                  <span className="info-value">{formatearFecha(episodio.fecha_emision)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duración:</span>
                  <span className="info-value">{episodio.duracion} minutos</span>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="info-card">
                <h5 className="text-success mb-3">⭐ Calificación</h5>
                <div className="rating-display">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(episodio.calificacion || 0) ? 'star filled' : 'star'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-number">{episodio.calificacion ? episodio.calificacion.toFixed(1) : 'N/A'} / 5.0</span>
                </div>
                {episodio.director && (
                  <div className="info-item mt-3">
                    <span className="info-label">Director:</span>
                    <span className="info-value">{episodio.director}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sinopsis */}
          <div className="sinopsis-section">
            <h5 className="text-secondary mb-3">📖 Sinopsis</h5>
            <p className="sinopsis-text">
              {episodio.sinopsis || 'Sin sinopsis disponible'}
            </p>
          </div>

          {/* Navegación entre episodios */}
          <div className="episodio-navigation mt-4">
            <div className="d-flex justify-content-between">
              <button 
                className="btn btn-outline-primary"
                onClick={() => navigate(`/episodios`)}
              >
                ← Ver todos los episodios
              </button>
              {temporada && (
                <Link 
                  to={`/temporadas/${temporada._id}`}
                  className="btn btn-outline-success"
                >
                  Ver temporada completa →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodioDetail;
