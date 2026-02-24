export interface Temporada {
  _id?: string;
  numero_temporada: number;
  titulo: string;
  descripcion: string;
  fecha_estreno: Date | string;
  fecha_finalizacion?: Date | string | null;
  numero_episodios: number;
  estudio_animacion: string;
  director?: string;
  estado: 'emitida' | 'en emisión' | 'anunciada';
  valoracion?: number;
  imagen_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  episodios?: Episodio[];
}

export interface Episodio {
  _id?: string;
  numero_episodio: number;
  titulo: string;
  descripcion: string;
  sinopsis?: string;
  duracion_minutos: number;
  fecha_emision: Date | string;
  imagen_url?: string;
  temporada_id: string | Temporada;
  director?: string;
  guionista?: string;
  valoracion?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Personaje {
  _id?: string;
  nombre: string;
  alias?: string | null;
  edad?: number | null;
  rol: 'principal' | 'secundario' | 'recurrente';
  descripcion: string;
  habilidades: string[];
  organizacion?: string | null;
  imagen_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Tomo {
  _id?: string;
  numero_tomo: number;
  titulo: string;
  isbn: string;
  fecha_publicacion: Date | string;
  numero_capitulos: number;
  paginas: number;
  precio: number;
  editorial: string;
  sinopsis?: string;
  imagen_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  errors?: string[];
}
