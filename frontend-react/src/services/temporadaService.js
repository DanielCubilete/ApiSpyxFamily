import ApiService from './api';

class TemporadaService extends ApiService {
  constructor() {
    super('temporadas');
  }

  async getByNumero(numero) {
    const response = await fetch(`${this.baseUrl}/numero/${numero}`);
    return this.handleResponse(response);
  }

  handleResponse(response) {
    if (!response.ok) {
      throw new Error('Error en la petición');
    }
    return response.json();
  }
}

export default new TemporadaService();
