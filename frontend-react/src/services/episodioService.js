import ApiService from './api';

class EpisodioService extends ApiService {
  constructor() {
    super('episodios');
  }

  async getByTemporada(temporadaId) {
    const response = await fetch(`${this.baseUrl}/temporada/${temporadaId}`);
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

export default new EpisodioService();
