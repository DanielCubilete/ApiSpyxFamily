import ApiService from './api';

class PersonajeService extends ApiService {
  constructor() {
    super('personajes');
  }

  async getByRol(rol) {
    const response = await fetch(`${this.baseUrl}/rol/${rol}`);
    return this.handleResponse(response);
  }

  async search(query) {
    const response = await fetch(`${this.baseUrl}/search?query=${encodeURIComponent(query)}`);
    return this.handleResponse(response);
  }

  handleResponse(response) {
    if (!response.ok) {
      throw new Error('Error en la petición');
    }
    return response.json();
  }
}

export default new PersonajeService();
