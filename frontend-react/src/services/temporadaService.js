import ApiService from './api';

class TemporadaService extends ApiService {
  constructor() {
    super('temporadas');
  }

  async getByNumero(numero) {
    const response = await fetch(`${this.baseUrl}/numero/${numero}`);
    
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

export default new TemporadaService();
