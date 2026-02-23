import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Endpoint {
  method: string;
  path: string;
  description: string;
  example?: string;
  response?: string;
}

@Component({
  selector: 'app-documentacion',
  standalone: true,
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.css'],
  imports: [CommonModule]
})
export class DocumentacionComponent implements OnInit {
  baseUrl = 'http://localhost:3000/api/v1';
  
  endpoints: { [category: string]: Endpoint[] } = {
    'Temporadas': [
      {
        method: 'GET',
        path: '/temporadas',
        description: 'Obtener todas las temporadas',
        example: `${this.baseUrl}/temporadas`,
        response: '{ success: true, count: 2, data: [...] }'
      },
      {
        method: 'GET',
        path: '/temporadas/:id',
        description: 'Obtener una temporada por ID',
        example: `${this.baseUrl}/temporadas/507f1f77bcf86cd799439011`,
        response: '{ success: true, data: {...} }'
      },
      {
        method: 'GET',
        path: '/temporadas/numero/:numero',
        description: 'Obtener temporada por número',
        example: `${this.baseUrl}/temporadas/numero/1`,
        response: '{ success: true, data: {...} }'
      },
      {
        method: 'GET',
        path: '/temporadas/estadisticas',
        description: 'Obtener estadísticas de temporadas',
        example: `${this.baseUrl}/temporadas/estadisticas`,
        response: '{ success: true, data: { total_temporadas: 2, total_episodios: 24 } }'
      }
    ],
    'Episodios': [
      {
        method: 'GET',
        path: '/episodios',
        description: 'Obtener todos los episodios',
        example: `${this.baseUrl}/episodios`,
        response: '{ success: true, count: 24, data: [...] }'
      },
      {
        method: 'GET',
        path: '/episodios/:id',
        description: 'Obtener un episodio por ID',
        example: `${this.baseUrl}/episodios/507f1f77bcf86cd799439011`,
        response: '{ success: true, data: {...} }'
      },
      {
        method: 'GET',
        path: '/episodios/temporada/:temporadaId',
        description: 'Obtener episodios de una temporada',
        example: `${this.baseUrl}/episodios/temporada/507f1f77bcf86cd799439011`,
        response: '{ success: true, data: [...] }'
      },
      {
        method: 'GET',
        path: '/episodios/search?query=texto',
        description: 'Buscar episodios por título o descripción',
        example: `${this.baseUrl}/episodios/search?query=Anya`,
        response: '{ success: true, data: [...] }'
      },
      {
        method: 'GET',
        path: '/episodios/estadisticas',
        description: 'Obtener estadísticas de episodios',
        example: `${this.baseUrl}/episodios/estadisticas`,
        response: '{ success: true, data: { total_episodios: 24, duracion_total_horas: 9.6 } }'
      }
    ],
    'Personajes': [
      {
        method: 'GET',
        path: '/personajes',
        description: 'Obtener todos los personajes',
        example: `${this.baseUrl}/personajes`,
        response: '{ success: true, count: 10, data: [...] }'
      },
      {
        method: 'GET',
        path: '/personajes/:id',
        description: 'Obtener un personaje por ID',
        example: `${this.baseUrl}/personajes/507f1f77bcf86cd799439011`,
        response: '{ success: true, data: {...} }'
      },
      {
        method: 'GET',
        path: '/personajes/rol/:rol',
        description: 'Obtener personajes por rol (principal, secundario, recurrente)',
        example: `${this.baseUrl}/personajes/rol/principal`,
        response: '{ success: true, data: [...] }'
      },
      {
        method: 'GET',
        path: '/personajes/search?query=texto',
        description: 'Buscar personajes por nombre o alias',
        example: `${this.baseUrl}/personajes/search?query=Twilight`,
        response: '{ success: true, data: [...] }'
      },
      {
        method: 'GET',
        path: '/personajes/estadisticas',
        description: 'Obtener estadísticas de personajes',
        example: `${this.baseUrl}/personajes/estadisticas`,
        response: '{ success: true, data: { total_personajes: 10 } }'
      }
    ],
    'Tomos': [
      {
        method: 'GET',
        path: '/tomos',
        description: 'Obtener todos los tomos del manga',
        example: `${this.baseUrl}/tomos`,
        response: '{ success: true, count: 12, data: [...] }'
      },
      {
        method: 'GET',
        path: '/tomos/:id',
        description: 'Obtener un tomo por ID',
        example: `${this.baseUrl}/tomos/507f1f77bcf86cd799439011`,
        response: '{ success: true, data: {...} }'
      },
      {
        method: 'GET',
        path: '/tomos/numero/:numero',
        description: 'Obtener tomo por número',
        example: `${this.baseUrl}/tomos/numero/1`,
        response: '{ success: true, data: {...} }'
      },
      {
        method: 'GET',
        path: '/tomos/isbn/:isbn',
        description: 'Obtener tomo por ISBN',
        example: `${this.baseUrl}/tomos/isbn/978-8411742501`,
        response: '{ success: true, data: {...} }'
      },
      {
        method: 'GET',
        path: '/tomos/estadisticas',
        description: 'Obtener estadísticas de tomos',
        example: `${this.baseUrl}/tomos/estadisticas`,
        response: '{ success: true, data: { total_tomos: 12, total_paginas: 2400 } }'
      }
    ]
  };

  testingEndpoint = '';
  testingResponse: any = null;
  testingError: string = '';
  testingLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getMethodClass(method: string): string {
    const classes: { [key: string]: string } = {
      'GET': 'method-get',
      'POST': 'method-post',
      'PUT': 'method-put',
      'DELETE': 'method-delete'
    };
    return classes[method] || '';
  }

  testEndpoint(url: string) {
    this.testingEndpoint = url;
    this.testingLoading = true;
    this.testingError = '';
    this.testingResponse = null;

    this.http.get(url).subscribe({
      next: (response) => {
        this.testingResponse = response;
        this.testingLoading = false;
      },
      error: (error) => {
        this.testingError = error.message || 'Error al realizar la petición';
        this.testingLoading = false;
      }
    });
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  copyResponseJson() {
    if (this.testingResponse) {
      const jsonString = JSON.stringify(this.testingResponse, null, 2);
      this.copyToClipboard(jsonString);
    }
  }
}
