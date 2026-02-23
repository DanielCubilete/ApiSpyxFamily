import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PersonajeService } from '../../../services/personaje.service';
import { SharedService } from '../../../services/shared.service';
import { Personaje } from '../../../models/interfaces';

@Component({
  selector: 'app-personaje-list',
  standalone: true,
  templateUrl: './personaje-list.component.html',
  styleUrls: ['./personaje-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class PersonajeListComponent implements OnInit {
  personajes: Personaje[] = [];
  personajesFiltrados: Personaje[] = [];
  searchTerm = '';
  rolFiltro = '';
  
  // Paginación
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  // Exponer Math para el template
  Math = Math;

  constructor(
    private personajeService: PersonajeService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🚀 PersonajeListComponent inicializado');
    console.log('📡 PersonajeService:', this.personajeService);
    console.log('🔧 SharedService:', this.sharedService);
    console.log('📊 Estado inicial:', {
      personajes: this.personajes,
      personajesFiltrados: this.personajesFiltrados,
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
    this.cargarPersonajes();
  }

  cargarPersonajes() {
    console.log('🔍 Cargando personajes...');
    this.sharedService.showLoading();
    this.personajeService.getAll().subscribe({
      next: (response) => {
        console.log('✅ Respuesta recibida:', response);
        this.sharedService.hideLoading();
        if (response.success && response.data) {
          this.personajes = response.data;
          console.log('📊 Total personajes:', this.personajes.length);
          this.aplicarFiltros();
        } else {
          console.error('❌ Respuesta sin éxito o sin datos');
        }
      },
      error: (error) => {
        console.error('❌ Error al cargar personajes:', error);
        this.sharedService.hideLoading();
        this.sharedService.showError('Error al cargar personajes');
        console.error(error);
      }
    });
  }

  aplicarFiltros() {
    console.log('🔍 Aplicando filtros, total personajes:', this.personajes.length);
    let filtered = [...this.personajes];

    // Filtro por término de búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(term) ||
        (p.alias && p.alias.toLowerCase().includes(term)) ||
        p.descripcion.toLowerCase().includes(term)
      );
    }

    // Filtro por rol
    if (this.rolFiltro) {
      filtered = filtered.filter(p => p.rol === this.rolFiltro);
    }

    this.personajesFiltrados = filtered;
    console.log('📋 Personajes filtrados:', this.personajesFiltrados.length);
    this.totalPages = Math.ceil(this.personajesFiltrados.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get personajesPaginados(): Personaje[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const result = this.personajesFiltrados.slice(start, end);
    console.log(`📄 Página ${this.currentPage}: mostrando ${result.length} personajes (${start}-${end} de ${this.personajesFiltrados.length})`);
    return result;
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  verDetalle(id: string) {
    this.router.navigate(['/personajes', id]);
  }

  editar(id: string) {
    this.router.navigate(['/personajes', 'editar', id]);
  }

  eliminar(personaje: Personaje) {
    if (!personaje._id) return;

    if (confirm(`¿Estás seguro de eliminar a ${personaje.nombre}?`)) {
      this.sharedService.showLoading();
      this.personajeService.delete(personaje._id).subscribe({
        next: (response) => {
          this.sharedService.hideLoading();
          if (response.success) {
            this.sharedService.showSuccess('Personaje eliminado correctamente');
            this.cargarPersonajes();
          }
        },
        error: (error) => {
          this.sharedService.hideLoading();
          this.sharedService.showError('Error al eliminar personaje');
          console.error(error);
        }
      });
    }
  }

  getRolBadgeClass(rol: string): string {
    switch (rol) {
      case 'principal':
        return 'badge bg-primary';
      case 'secundario':
        return 'badge bg-success';
      case 'recurrente':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }

  limpiarFiltros() {
    this.searchTerm = '';
    this.rolFiltro = '';
    this.aplicarFiltros();
  }

  getImagenPersonaje(personaje: Personaje): string {
    if (personaje.imagen_url) {
      return personaje.imagen_url;
    }
    const nombreSlug = personaje.nombre.toLowerCase().replace(/\s+/g, '-');
    return `https://picsum.photos/seed/spyxfamily-${nombreSlug}/400/500`;
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/400x500/6c757d/ffffff?text=Personaje';
  }
}
