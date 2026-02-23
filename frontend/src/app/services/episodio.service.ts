import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episodio, ApiResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EpisodioService {
  private apiUrl = 'http://localhost:3000/api/v1/episodios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<Episodio[]>> {
    console.log('📡 EpisodioService.getAll() - Llamando a:', this.apiUrl);
    return this.http.get<ApiResponse<Episodio[]>>(this.apiUrl);
  }

  getById(id: string): Observable<ApiResponse<Episodio>> {
    return this.http.get<ApiResponse<Episodio>>(`${this.apiUrl}/${id}`);
  }

  getByTemporada(temporadaId: string): Observable<ApiResponse<Episodio[]>> {
    return this.http.get<ApiResponse<Episodio[]>>(`${this.apiUrl}/temporada/${temporadaId}`);
  }

  search(query: string): Observable<ApiResponse<Episodio[]>> {
    const params = new HttpParams().set('query', query);
    return this.http.get<ApiResponse<Episodio[]>>(`${this.apiUrl}/search`, { params });
  }

  create(episodio: Episodio): Observable<ApiResponse<Episodio>> {
    return this.http.post<ApiResponse<Episodio>>(this.apiUrl, episodio);
  }

  update(id: string, episodio: Partial<Episodio>): Observable<ApiResponse<Episodio>> {
    return this.http.put<ApiResponse<Episodio>>(`${this.apiUrl}/${id}`, episodio);
  }

  delete(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
