import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { TemporadaService } from '../../../services/temporada.service';
import { SharedService } from '../../../services/shared.service';
import { Temporada } from '../../../models/interfaces';

@Component({
  selector: 'app-temporada-list',
  standalone: true,
  templateUrl: './temporada-list.component.html',
  styleUrls: ['./temporada-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class TemporadaListComponent implements OnInit {
  temporadas: Temporada[] = [];
  temporadasFiltradas: Temporada[] = [];
  searchTerm = '';
  estadoFiltro = '';
  
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  Math = Math;

  constructor(
    private temporadaService: TemporadaService,
    private sharedService: SharedService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('🚀 TemporadaListComponent inicializado');
    console.log('📡 TemporadaService:', this.temporadaService);
    console.log('🔧 SharedService:', this.sharedService);
    this.cargarTemporadas();
  }

  cargarTemporadas() {
    console.log('🔍 Cargando temporadas...');
    this.sharedService.showLoading();
    
    this.temporadaService.getAll()
      .pipe(
        finalize(() => this.sharedService.hideLoading())
      )
      .subscribe({
        next: (response) => {
          console.log('✅ Respuesta recibida:', response);
          if (response.success && response.data) {
            this.temporadas = response.data;
            console.log('📊 Total temporadas:', this.temporadas.length);
            // Verificar que todas las temporadas tengan _id
            const temporadasSinId = this.temporadas.filter(t => !t._id);
            if (temporadasSinId.length > 0) {
              console.error('⚠️ Temporadas sin _id:', temporadasSinId);
            } else {
              console.log('✅ Todas las temporadas tienen _id');
            }
            this.aplicarFiltros();
            setTimeout(() => this.cdr.detectChanges(), 0);
          } else {
            console.error('❌ Respuesta sin éxito o sin datos');
          }
        },
        error: (error) => {
          console.error('❌ Error al cargar temporadas:', error);
          this.sharedService.showError('Error al cargar temporadas');
          console.error(error);
        }
      });
  }

  aplicarFiltros() {
    console.log('🔍 Aplicando filtros, total temporadas:', this.temporadas.length);
    let filtered = [...this.temporadas];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.titulo.toLowerCase().includes(term) ||
        t.descripcion.toLowerCase().includes(term)
      );
    }

    if (this.estadoFiltro) {
      filtered = filtered.filter(t => t.estado === this.estadoFiltro);
    }

    this.temporadasFiltradas = filtered;
    console.log('📋 Temporadas filtradas:', this.temporadasFiltradas.length);
    this.totalPages = Math.ceil(this.temporadasFiltradas.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get temporadasPaginadas(): Temporada[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const result = this.temporadasFiltradas.slice(start, end);
    console.log(`📄 Página ${this.currentPage}: mostrando ${result.length} temporadas (${start}-${end} de ${this.temporadasFiltradas.length})`);
    return result;
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  verDetalle(id: string) {
    if (!id) {
      console.error('❌ ID de temporada no válido:', id);
      this.sharedService.showError('Error: ID de temporada no válido');
      return;
    }
    console.log('🔍 Navegando a detalle de temporada:', id);
    this.router.navigate(['/temporadas', id]);
  }

  verEpisodios(temporadaId: string) {
    if (!temporadaId) {
      console.error('❌ ID de temporada no válido:', temporadaId);
      this.sharedService.showError('Error: ID de temporada no válido');
      return;
    }
    console.log('📺 Navegando a episodios de temporada:', temporadaId);
    this.router.navigate(['/episodios'], {
      queryParams: { temporada: temporadaId }
    });
  }

  editar(id: string) {
    if (!id) {
      console.error('❌ ID de temporada no válido:', id);
      this.sharedService.showError('Error: ID de temporada no válido');
      return;
    }
    console.log('✏️ Navegando a editar temporada:', id);
    this.router.navigate(['/temporadas/editar', id]);
  }

  eliminar(temporada: Temporada) {
    if (!temporada._id) return;

    if (confirm(`¿Estás seguro de eliminar la ${temporada.titulo}?`)) {
      this.sharedService.showLoading();
      
      this.temporadaService.delete(temporada._id)
        .pipe(
          finalize(() => this.sharedService.hideLoading())
        )
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.sharedService.showSuccess('Temporada eliminada correctamente');
              this.cargarTemporadas();
            }
          },
          error: (error) => {
            const mensaje = error.error?.message || 'Error al eliminar temporada';
            this.sharedService.showError(mensaje);
            console.error(error);
          }
        });
    }
  }

  getEstadoBadgeClass(estado: string): string {
    switch (estado) {
      case 'emitida':
        return 'badge bg-success';
      case 'en emisión':
        return 'badge bg-primary';
      case 'anunciada':
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  }

  limpiarFiltros() {
    this.searchTerm = '';
    this.estadoFiltro = '';
    this.aplicarFiltros();
  }

  getImagenTemporada(temporada: Temporada): string {
    if (temporada.imagen_url) {
      return temporada.imagen_url;
    }
    return `https://picsum.photos/seed/spyxfamily-temporada${temporada.numero_temporada}/400/600`;
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/400x600/6c757d/ffffff?text=Temporada';
  }
}
