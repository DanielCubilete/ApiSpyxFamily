import ApiService from './api';

class PersonajeService extends ApiService {
  constructor() {
    super('personajes');
  }

  async getByRol(rol) {
    const response = await fetch(`${this.baseUrl}/rol/${rol}`);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Error en la petición'
      }));
      throw new Error(error.message || 'Error en la petición');
    }
    
    const json = await response.json();
    return json.data !== undefined ? json.data : json;
  }

  async search(query) {
    const response = await fetch(`${this.baseUrl}/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Error en la petición'
      }));
      throw new Error(error.message || 'Error en la petición');
    }
    
    const json = await response.json();
    return json.data !== undefined ? json.data : json;
  }
}

export default new PersonajeService();
