import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './EpisodioList.css';
import episodioService from '../../services/episodioService';
import temporadaService from '../../services/temporadaService';
import Loading from '../Loading';

const EpisodioList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [episodios, setEpisodios] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroTemporada, setFiltroTemporada] = useState(searchParams.get('temporada') || '');

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    const temporadaParam = searchParams.get('temporada');
    if (temporadaParam) {
      setFiltroTemporada(temporadaParam);
    }
  }, [searchParams]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar temporadas y episodios en paralelo
      const [episodiosData, temporadasData] = await Promise.all([
        episodioService.getAll(),
        temporadaService.getAll()
      ]);
      
      console.log('Episodios cargados:', episodiosData);
      console.log('Temporadas cargadas:', temporadasData);
      
      setEpisodios(episodiosData);
      setTemporadas(temporadasData);
    } catch (err) {
      setError('Error al cargar los datos: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const obtenerNumeroTemporada = (temporadaId) => {
    // Si el backend hizo populate, temporadaId es un objeto con los datos
    if (typeof temporadaId === 'object' && temporadaId !== null) {
      return temporadaId.numero_temporada;
    }
    // Si no, buscar en el array de temporadas
    const temporada = temporadas.find(t => t._id === temporadaId);
    return temporada ? temporada.numero_temporada : 1;
  };

  const obtenerNombreTemporada = (temporadaId) => {
    // Si el backend hizo populate, temporadaId es un objeto con los datos
    if (typeof temporadaId === 'object' && temporadaId !== null) {
      return `Temporada ${temporadaId.numero_temporada}: ${temporadaId.titulo}`;
    }
    // Si no, buscar en el array de temporadas
    const temporada = temporadas.find(t => t._id === temporadaId);
    return temporada ? `Temporada ${temporada.numero_temporada}: ${temporada.titulo}` : 'Temporada desconocida';
  };

  const filtrarEpisodios = () => {
    if (!filtroTemporada) {
      return episodios;
    }
    return episodios.filter(ep => {
      // El backend hace populate, entonces temporada_id puede ser un objeto o un string
      const tempId = typeof ep.temporada_id === 'object' ? ep.temporada_id._id : ep.temporada_id;
      return tempId === filtroTemporada;
    });
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

  const episodiosFiltrados = filtrarEpisodios();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🎬 Episodios de Spy×Family</h2>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <label className="form-label fw-bold">Filtrar por Temporada:</label>
              <select 
                className="form-select" 
                value={filtroTemporada}
                onChange={(e) => {
                  const value = e.target.value;
                  setFiltroTemporada(value);
                  if (value) {
                    setSearchParams({ temporada: value });
                  } else {
                    setSearchParams({});
                  }
                }}
              >
                <option value="">Todas las temporadas</option>
                {temporadas.map(temporada => (
                  <option key={temporada._id} value={temporada._id}>
                    Temporada {temporada.numero_temporada}: {temporada.titulo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-3">
        <span className="badge bg-primary">
          {episodiosFiltrados.length} episodio{episodiosFiltrados.length !== 1 ? 's' : ''} encontrado{episodiosFiltrados.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Lista de episodios */}
      {episodiosFiltrados.length === 0 ? (
        <div className="alert alert-info">
          No se encontraron episodios con los filtros seleccionados.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {episodiosFiltrados.map((episodio) => (
            <div key={episodio._id} className="col">
              <div 
                className="card h-100 episodio-card"
                onClick={() => navigate(`/episodios/${episodio._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-secondary">
                      Temporada {obtenerNumeroTemporada(episodio.temporada_id)} Episodio {episodio.numero_episodio}
                    </span>
                    <span className="badge bg-info">
                      <i className="bi bi-clock"></i> {episodio.duracion_minutos} min
                    </span>
                  </div>
                  
                  <h5 className="card-title">{episodio.titulo}</h5>
                  
                  <p className="card-text sinopsis">
                    {episodio.descripcion}
                  </p>
                </div>
                <div className="card-footer bg-white border-top">
                  <small className="text-muted">
                    <i className="bi bi-calendar3"></i> {formatearFecha(episodio.fecha_emision)}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EpisodioList;
