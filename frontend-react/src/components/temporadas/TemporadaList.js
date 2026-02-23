import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import temporadaService from '../../services/temporadaService';
import Loading from '../Loading';
import './TemporadaList.css';

const TemporadaList = () => {
  const navigate = useNavigate();
  const [temporadas, setTemporadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');

  const getImagenTemporada = (temporada) => {
    // Si la temporada tiene imagen_url, usarla
    if (temporada.imagen_url) {
      return temporada.imagen_url;
    }
    // Fallback con placeholder
    return `https://picsum.photos/seed/spyxfamily-temporada${temporada.numero_temporada}/400/600`;
  };

  useEffect(() => {
    cargarTemporadas();
  }, []);

  const cargarTemporadas = async () => {
    try {
      setLoading(true);
      const data = await temporadaService.getAll();
      setTemporadas(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar temporadas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, titulo) => {
    if (window.confirm(`¿Estás seguro de eliminar "${titulo}"?`)) {
      try {
        await temporadaService.delete(id);
        alert('Temporada eliminada correctamente');
        cargarTemporadas();
      } catch (err) {
        alert('Error al eliminar temporada: ' + err.message);
      }
    }
  };

  const handleEstadoBadgeClass = (estado) => {
    switch (estado) {
      case 'emitida':
        return 'bg-success';
      case 'en emisión':
        return 'bg-primary';
      case 'anunciada':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  const temporadasFiltradas = temporadas.filter((temporada) => {
    const matchSearch =
      searchTerm === '' ||
      temporada.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temporada.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = estadoFiltro === '' || temporada.estado === estadoFiltro;
    return matchSearch && matchEstado;
  });

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📺 Temporadas</h2>
        <Link to="/temporadas/nueva" className="btn btn-primary">
          <i className="bi bi-plus-lg"></i> Nueva Temporada
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
                placeholder="Buscar por título o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Filtrar por Estado</label>
              <select
                className="form-select"
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="emitida">Emitida</option>
                <option value="en emisión">En emisión</option>
                <option value="anunciada">Anunciada</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de tarjetas */}
      {temporadasFiltradas.length === 0 ? (
        <div className="alert alert-info">
          No se encontraron temporadas con los filtros seleccionados.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {temporadasFiltradas.map((temporada) => (
            <div key={temporada._id} className="col">
              <div className="card h-100 temporada-card">
                <img
                  src={getImagenTemporada(temporada)}
                  className="card-img-top"
                  alt={temporada.titulo}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">
                      Temporada {temporada.numero_temporada}
                    </h5>
                    <span
                      className={`badge ${handleEstadoBadgeClass(
                        temporada.estado
                      )}`}
                    >
                      {temporada.estado}
                    </span>
                  </div>
                  <h6 className="text-muted mb-3">{temporada.titulo}</h6>
                  <p className="card-text text-truncate-3">
                    {temporada.descripcion}
                  </p>
                  <div className="mb-3">
                    <small className="text-muted">
                      <i className="bi bi-calendar3"></i>{' '}
                      {new Date(temporada.fecha_estreno).toLocaleDateString('es-ES')}
                    </small>
                    <br />
                    <small className="text-muted">
                      <i className="bi bi-collection-play"></i> {temporada.numero_episodios} episodios
                    </small>
                    <br />
                    <small className="text-muted">
                      <i className="bi bi-building"></i> {temporada.estudio_animacion}
                    </small>
                  </div>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <div className="d-flex gap-2 mb-2">
                    <button
                      className="btn btn-sm btn-primary w-100"
                      onClick={() => navigate(`/episodios?temporada=${temporada._id}`)}
                    >
                      <i className="bi bi-collection-play"></i> Ver Episodios
                    </button>
                  </div>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/temporadas/${temporada._id}`}
                      className="btn btn-sm btn-info flex-fill"
                    >
                      <i className="bi bi-eye"></i> Ver
                    </Link>
                    <Link
                      to={`/temporadas/editar/${temporada._id}`}
                      className="btn btn-sm btn-warning flex-fill"
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </Link>
                    <button
                      className="btn btn-sm btn-danger flex-fill"
                      onClick={() =>
                        handleDelete(temporada._id, temporada.titulo)
                      }
                    >
                      <i className="bi bi-trash"></i> Eliminar
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

export default TemporadaList;
