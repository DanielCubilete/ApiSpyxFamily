import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje, ApiResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {
  private apiUrl = 'http://localhost:3000/api/v1/personajes';

  constructor(private http: HttpClient) { 
    console.log('🔧 PersonajeService inicializado');
    console.log('📡 API URL:', this.apiUrl);
  }

  getAll(): Observable<ApiResponse<Personaje[]>> {
    console.log('📞 Llamando a PersonajeService.getAll() ->', this.apiUrl);
    return this.http.get<ApiResponse<Personaje[]>>(this.apiUrl);
  }

  getById(id: string): Observable<ApiResponse<Personaje>> {
    return this.http.get<ApiResponse<Personaje>>(`${this.apiUrl}/${id}`);
  }

  getByRol(rol: string): Observable<ApiResponse<Personaje[]>> {
    return this.http.get<ApiResponse<Personaje[]>>(`${this.apiUrl}/rol/${rol}`);
  }

  getByOrganizacion(organizacion: string): Observable<ApiResponse<Personaje[]>> {
    return this.http.get<ApiResponse<Personaje[]>>(`${this.apiUrl}/organizacion/${organizacion}`);
  }

  getByHabilidad(habilidad: string): Observable<ApiResponse<Personaje[]>> {
    return this.http.get<ApiResponse<Personaje[]>>(`${this.apiUrl}/habilidad/${habilidad}`);
  }

  search(query: string): Observable<ApiResponse<Personaje[]>> {
    const params = new HttpParams().set('query', query);
    return this.http.get<ApiResponse<Personaje[]>>(`${this.apiUrl}/search`, { params });
  }

  create(personaje: Personaje): Observable<ApiResponse<Personaje>> {
    return this.http.post<ApiResponse<Personaje>>(this.apiUrl, personaje);
  }

  update(id: string, personaje: Partial<Personaje>): Observable<ApiResponse<Personaje>> {
    return this.http.put<ApiResponse<Personaje>>(`${this.apiUrl}/${id}`, personaje);
  }

  delete(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
