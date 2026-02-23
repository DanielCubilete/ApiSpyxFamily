import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tomo, ApiResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TomoService {
  private apiUrl = 'http://localhost:3000/api/v1/tomos';

  constructor(private http: HttpClient) { 
    console.log('🔧 TomoService inicializado');
    console.log('📡 API URL:', this.apiUrl);
  }

  getAll(): Observable<ApiResponse<Tomo[]>> {
    console.log('📞 Llamando a TomoService.getAll() ->', this.apiUrl);
    return this.http.get<ApiResponse<Tomo[]>>(this.apiUrl);
  }

  getById(id: string): Observable<ApiResponse<Tomo>> {
    return this.http.get<ApiResponse<Tomo>>(`${this.apiUrl}/${id}`);
  }

  getByNumero(numero: number): Observable<ApiResponse<Tomo>> {
    return this.http.get<ApiResponse<Tomo>>(`${this.apiUrl}/numero/${numero}`);
  }

  getByISBN(isbn: string): Observable<ApiResponse<Tomo>> {
    return this.http.get<ApiResponse<Tomo>>(`${this.apiUrl}/isbn/${isbn}`);
  }

  getByEditorial(editorial: string): Observable<ApiResponse<Tomo[]>> {
    return this.http.get<ApiResponse<Tomo[]>>(`${this.apiUrl}/editorial/${editorial}`);
  }

  getByFechas(desde?: string, hasta?: string): Observable<ApiResponse<Tomo[]>> {
    let params = new HttpParams();
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);
    return this.http.get<ApiResponse<Tomo[]>>(`${this.apiUrl}/fechas`, { params });
  }

  search(query: string): Observable<ApiResponse<Tomo[]>> {
    const params = new HttpParams().set('query', query);
    return this.http.get<ApiResponse<Tomo[]>>(`${this.apiUrl}/search`, { params });
  }

  create(tomo: Tomo): Observable<ApiResponse<Tomo>> {
    return this.http.post<ApiResponse<Tomo>>(this.apiUrl, tomo);
  }

  update(id: string, tomo: Partial<Tomo>): Observable<ApiResponse<Tomo>> {
    return this.http.put<ApiResponse<Tomo>>(`${this.apiUrl}/${id}`, tomo);
  }

  delete(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
