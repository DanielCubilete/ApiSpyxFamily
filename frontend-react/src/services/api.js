
// Configuración base de la API
// En producción Vercel sirve el backend en /api, en desarrollo usa localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 
                     (process.env.NODE_ENV === 'production' 
                       ? '/api/v1' 
                       : 'http://localhost:3000/api/v1');

// Función auxiliar para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Error en la petición'
    }));
    throw new Error(error.message || 'Error en la petición');
  }
  const json = await response.json();
  // El backend devuelve { success: true, data: [...] }
  // Extraemos solo la data para simplificar el uso en los componentes
  return json.data !== undefined ? json.data : json;
};

// Servicio genérico base
class ApiService {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.baseUrl = `${API_BASE_URL}/${endpoint}`;
  }

  async getAll() {
    const response = await fetch(this.baseUrl);
    return handleResponse(response);
  }

  async getById(id) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return handleResponse(response);
  }

  async create(data) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }

  async update(id, data) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }

  async delete(id) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  }
}

export default ApiService;
