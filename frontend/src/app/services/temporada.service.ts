import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Temporada, ApiResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TemporadaService {
  private apiUrl =
    (window as any).env?.API_URL_TEMPORADAS ||
    (typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app')
      ? 'https://api-spyx-family.vercel.app/api/v1/temporadas'
      : '/api/v1/temporadas');

  constructor(private http: HttpClient) { 
    console.log('🔧 TemporadaService inicializado');
    console.log('📡 API URL:', this.apiUrl);
  }

  getAll(): Observable<ApiResponse<Temporada[]>> {
    console.log('📞 Llamando a getAll() ->', this.apiUrl);
    return this.http.get<ApiResponse<Temporada[]>>(this.apiUrl);
  }

  getById(id: string): Observable<ApiResponse<Temporada>> {
    const url = `${this.apiUrl}/${id}`;
    console.log('📞 TemporadaService.getById() ->', url);
    return this.http.get<ApiResponse<Temporada>>(url);
  }

  getByNumero(numero: number): Observable<ApiResponse<Temporada>> {
    return this.http.get<ApiResponse<Temporada>>(`${this.apiUrl}/numero/${numero}`);
  }

  create(temporada: Temporada): Observable<ApiResponse<Temporada>> {
    return this.http.post<ApiResponse<Temporada>>(this.apiUrl, temporada);
  }

  update(id: string, temporada: Partial<Temporada>): Observable<ApiResponse<Temporada>> {
    return this.http.put<ApiResponse<Temporada>>(`${this.apiUrl}/${id}`, temporada);
  }

  delete(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
