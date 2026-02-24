import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import personajeService from '../../services/personajeService';
import Loading from '../Loading';
import './PersonajeForm.css';

const PersonajeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [errors, setErrors] = useState({});
  const [habilidadInput, setHabilidadInput] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    alias: '',
    edad: '',
    rol: 'secundario',
    descripcion: '',
    habilidades: [],
    organizacion: '',
    imagen_url: '',
  });

  useEffect(() => {
    if (isEditing) {
      cargarPersonaje();
    }
  }, [id]);

  const cargarPersonaje = async () => {
    try {
      const personaje = await personajeService.getById(id);
      setFormData({
        nombre: personaje.nombre,
        alias: personaje.alias || '',
        edad: personaje.edad || '',
        rol: personaje.rol,
        descripcion: personaje.descripcion,
        habilidades: personaje.habilidades || [],
        organizacion: personaje.organizacion || '',
        imagen_url: personaje.imagen_url || '',
      });
    } catch (err) {
      alert('Error al cargar personaje: ' + err.message);
      navigate('/personajes');
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

  const handleAddHabilidad = () => {
    if (habilidadInput.trim()) {
      setFormData({
        ...formData,
        habilidades: [...formData.habilidades, habilidadInput.trim()],
      });
      setHabilidadInput('');
    }
  };

  const handleRemoveHabilidad = (index) => {
    setFormData({
      ...formData,
      habilidades: formData.habilidades.filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHabilidad();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre || formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (formData.edad && (formData.edad < 0 || formData.edad > 120)) {
      newErrors.edad = 'La edad debe estar entre 0 y 120 años';
    }

    if (!formData.rol) {
      newErrors.rol = 'El rol es requerido';
    }

    if (!formData.descripcion || formData.descripcion.trim().length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
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
        edad: formData.edad ? Number(formData.edad) : null,
        alias: formData.alias || null,
        organizacion: formData.organizacion || null,
        imagen_url: formData.imagen_url || '',
      };

      if (isEditing) {
        await personajeService.update(id, dataToSend);
        alert('Personaje actualizado correctamente');
      } else {
        await personajeService.create(dataToSend);
        alert('Personaje creado correctamente');
      }
      navigate('/personajes');
    } catch (err) {
      alert('Error al guardar personaje: ' + err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{isEditing ? 'Editar Personaje' : 'Nuevo Personaje'}</h2>
        <Link to="/personajes" className="btn btn-secondary">
          Cancelar
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label">Nombre *</label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  maxLength="100"
                />
                {errors.nombre && (
                  <div className="invalid-feedback">{errors.nombre}</div>
                )}
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Rol *</label>
                <select
                  className={`form-select ${errors.rol ? 'is-invalid' : ''}`}
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                >
                  <option value="principal">Principal</option>
                  <option value="secundario">Secundario</option>
                  <option value="recurrente">Recurrente</option>
                </select>
                {errors.rol && <div className="invalid-feedback">{errors.rol}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Alias</label>
                <input
                  type="text"
                  className="form-control"
                  name="alias"
                  value={formData.alias}
                  onChange={handleChange}
                  maxLength="100"
                  placeholder="Nombre código o apodo"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Edad</label>
                <input
                  type="number"
                  className={`form-control ${errors.edad ? 'is-invalid' : ''}`}
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  min="0"
                  max="120"
                  placeholder="Opcional"
                />
                {errors.edad && (
                  <div className="invalid-feedback">{errors.edad}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción *</label>
              <textarea
                className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                placeholder="Descripción del personaje..."
              ></textarea>
              {errors.descripcion && (
                <div className="invalid-feedback">{errors.descripcion}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Organización</label>
              <input
                type="text"
                className="form-control"
                name="organizacion"
                value={formData.organizacion}
                onChange={handleChange}
                maxLength="100"
                placeholder="Ej: WISE, Garden, etc."
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Habilidades</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={habilidadInput}
                  onChange={(e) => setHabilidadInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe una habilidad y presiona Enter"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleAddHabilidad}
                >
                  <i className="bi bi-plus-lg"></i> Agregar
                </button>
              </div>
              {formData.habilidades.length > 0 && (
                <div className="d-flex flex-wrap gap-2">
                  {formData.habilidades.map((habilidad, index) => (
                    <span key={index} className="badge bg-primary d-flex align-items-center gap-2">
                      {habilidad}
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => handleRemoveHabilidad(index)}
                      ></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">URL de Imagen</label>
              <input
                type="url"
                className="form-control"
                name="imagen_url"
                value={formData.imagen_url}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.imagen_url && (
                <div className="mt-2">
                  <img
                    src={formData.imagen_url}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x300/6c757d/ffffff?text=Sin+Imagen';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <Link to="/personajes" className="btn btn-secondary">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Actualizar' : 'Crear'} Personaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonajeForm;
