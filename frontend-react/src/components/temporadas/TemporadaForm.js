import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import temporadaService from '../../services/temporadaService';
import Loading from '../Loading';

const TemporadaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    numero_temporada: '',
    titulo: '',
    descripcion: '',
    fecha_estreno: '',
    fecha_finalizacion: '',
    numero_episodios: '',
    estudio_animacion: '',
    estado: 'emitida',
  });

  useEffect(() => {
    if (isEditing) {
      cargarTemporada();
    }
  }, [id]);

  const cargarTemporada = async () => {
    try {
      const temporada = await temporadaService.getById(id);
      setFormData({
        numero_temporada: temporada.numero_temporada,
        titulo: temporada.titulo,
        descripcion: temporada.descripcion,
        fecha_estreno: temporada.fecha_estreno.split('T')[0],
        fecha_finalizacion: temporada.fecha_finalizacion
          ? temporada.fecha_finalizacion.split('T')[0]
          : '',
        numero_episodios: temporada.numero_episodios,
        estudio_animacion: temporada.estudio_animacion,
        estado: temporada.estado,
      });
    } catch (err) {
      alert('Error al cargar temporada: ' + err.message);
      navigate('/temporadas');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.numero_temporada || formData.numero_temporada < 1) {
      newErrors.numero_temporada = 'El número de temporada debe ser mayor a 0';
    }

    if (!formData.titulo || formData.titulo.trim().length < 3) {
      newErrors.titulo = 'El título debe tener al menos 3 caracteres';
    }

    if (!formData.descripcion || formData.descripcion.trim().length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!formData.fecha_estreno) {
      newErrors.fecha_estreno = 'La fecha de estreno es requerida';
    }

    if (!formData.numero_episodios || formData.numero_episodios < 1) {
      newErrors.numero_episodios = 'Debe tener al menos 1 episodio';
    }

    if (!formData.estudio_animacion || formData.estudio_animacion.trim().length < 3) {
      newErrors.estudio_animacion = 'El estudio de animación debe tener al menos 3 caracteres';
    }

    if (!formData.estado) {
      newErrors.estado = 'El estado es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        numero_temporada: Number(formData.numero_temporada),
        numero_episodios: Number(formData.numero_episodios),
        fecha_finalizacion: formData.fecha_finalizacion || null,
      };

      if (isEditing) {
        await temporadaService.update(id, dataToSend);
        alert('Temporada actualizada correctamente');
      } else {
        await temporadaService.create(dataToSend);
        alert('Temporada creada correctamente');
      }
      navigate('/temporadas');
    } catch (err) {
      alert('Error al guardar temporada: ' + err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Editar Temporada' : 'Nueva Temporada'}</h2>
        <Link to="/temporadas" className="btn btn-secondary">
          Cancelar
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Número de Temporada *</label>
                <input
                  type="number"
                  className={`form-control ${errors.numero_temporada ? 'is-invalid' : ''}`}
                  name="numero_temporada"
                  value={formData.numero_temporada}
                  onChange={handleChange}
                  min="1"
                />
                {errors.numero_temporada && (
                  <div className="invalid-feedback">{errors.numero_temporada}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Estado *</label>
                <select
                  className={`form-select ${errors.estado ? 'is-invalid' : ''}`}
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <option value="emitida">Emitida</option>
                  <option value="en emisión">En emisión</option>
                  <option value="anunciada">Anunciada</option>
                </select>
                {errors.estado && <div className="invalid-feedback">{errors.estado}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Título *</label>
              <input
                type="text"
                className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                maxLength="100"
              />
              {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción *</label>
              <textarea
                className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
              ></textarea>
              {errors.descripcion && (
                <div className="invalid-feedback">{errors.descripcion}</div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Fecha de Estreno *</label>
                <input
                  type="date"
                  className={`form-control ${errors.fecha_estreno ? 'is-invalid' : ''}`}
                  name="fecha_estreno"
                  value={formData.fecha_estreno}
                  onChange={handleChange}
                />
                {errors.fecha_estreno && (
                  <div className="invalid-feedback">{errors.fecha_estreno}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Fecha de Finalización</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_finalizacion"
                  value={formData.fecha_finalizacion}
                  onChange={handleChange}
                />
                <small className="text-muted">Opcional (dejar vacío si está en emisión)</small>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Número de Episodios *</label>
                <input
                  type="number"
                  className={`form-control ${errors.numero_episodios ? 'is-invalid' : ''}`}
                  name="numero_episodios"
                  value={formData.numero_episodios}
                  onChange={handleChange}
                  min="1"
                />
                {errors.numero_episodios && (
                  <div className="invalid-feedback">{errors.numero_episodios}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Estudio de Animación *</label>
                <input
                  type="text"
                  className={`form-control ${errors.estudio_animacion ? 'is-invalid' : ''}`}
                  name="estudio_animacion"
                  value={formData.estudio_animacion}
                  onChange={handleChange}
                />
                {errors.estudio_animacion && (
                  <div className="invalid-feedback">{errors.estudio_animacion}</div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to="/temporadas" className="btn btn-secondary">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Actualizar' : 'Crear'} Temporada
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TemporadaForm;
