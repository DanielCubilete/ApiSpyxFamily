import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import temporadaService from '../../services/temporadaService';
import episodioService from '../../services/episodioService';
import Loading from '../Loading';

const TemporadaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [temporada, setTemporada] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarTemporada();
    cargarEpisodios();
  }, [id]);

  const cargarTemporada = async () => {
    try {
      const data = await temporadaService.getById(id);
      setTemporada(data);
    } catch (err) {
      setError('Error al cargar temporada: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const cargarEpisodios = async () => {
    try {
      const data = await episodioService.getByTemporada(id);
      setEpisodios(data);
    } catch (err) {
      console.error('Error al cargar episodios:', err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!temporada) return <div className="alert alert-warning">Temporada no encontrada</div>;

  const getImagenTemporada = () => {
    if (temporada.imagen_url) {
      return temporada.imagen_url;
    }
    return `https://picsum.photos/seed/spyxfamily-temporada${temporada.numero_temporada}/400/600`;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📺 Detalle de Temporada</h2>
        <div>
          <Link to="/temporadas" className="btn btn-secondary">
            ← Volver a la lista
          </Link>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <img
            src={getImagenTemporada()}
            alt={temporada.titulo}
            className="img-fluid rounded shadow"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="mb-3">{temporada.titulo}</h3>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Número de Temporada:</strong> {temporada.numero_temporada}
                  </p>
                  <p>
                    <strong>Fecha de Estreno:</strong>{' '}
                    {new Date(temporada.fecha_estreno).toLocaleDateString('es-ES')}
                  </p>
                  <p>
                    <strong>Fecha de Finalización:</strong>{' '}
                    {temporada.fecha_finalizacion
                      ? new Date(temporada.fecha_finalizacion).toLocaleDateString('es-ES')
                      : 'En emisión'}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Número de Episodios:</strong> {temporada.numero_episodios}
                  </p>
                  <p>
                    <strong>Estudio de Animación:</strong> {temporada.estudio_animacion}
                  </p>
                  <p>
                    <strong>Estado:</strong>{' '}
                    <span
                      className={`badge ${
                        temporada.estado === 'emitida'
                          ? 'bg-success'
                          : temporada.estado === 'en emisión'
                          ? 'bg-primary'
                          : 'bg-warning'
                      }`}
                    >
                      {temporada.estado}
                    </span>
                  </p>
                </div>
              </div>
              <hr />
              <p>
                <strong>Descripción:</strong>
              </p>
              <p>{temporada.descripcion}</p>
            </div>
          </div>
        </div>
      </div>

      {episodios.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h5>Episodios ({episodios.length})</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>Duración</th>
                    <th>Fecha Emisión</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {episodios.map((episodio) => (
                    <tr key={episodio._id}>
                      <td>{episodio.numero_episodio}</td>
                      <td>{episodio.titulo}</td>
                      <td>{episodio.duracion_minutos} min</td>
                      <td>
                        {new Date(episodio.fecha_emision).toLocaleDateString('es-ES')}
                      </td>
                      <td>
                        <Link
                          to={`/episodios/${episodio._id}`}
                          className="btn btn-sm btn-info"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemporadaDetail;
