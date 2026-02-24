import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { EpisodioService } from '../../../services/episodio.service';
import { TemporadaService } from '../../../services/temporada.service';
import { SharedService } from '../../../services/shared.service';
import { Episodio, Temporada } from '../../../models/interfaces';

@Component({
  selector: 'app-episodio-list',
  standalone: true,
  templateUrl: './episodio-list.component.html',
  styleUrls: ['./episodio-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class EpisodioListComponent implements OnInit {
  episodios: Episodio[] = [];
  episodiosFiltrados: Episodio[] = [];
  episodiosPaginados: Episodio[] = [];
  temporadas: Temporada[] = [];
  searchTerm = '';
  filtroTemporada = '';
  
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  Math = Math;

  constructor(
    private episodioService: EpisodioService,
    private temporadaService: TemporadaService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('🎬 Iniciando EpisodioListComponent...');
    this.cargarTemporadas();
    this.cargarEpisodios();
    
    // Leer parámetro de temporada de la URL
    this.route.queryParams.subscribe(params => {
      if (params['temporada']) {
        this.filtroTemporada = params['temporada'];
        this.aplicarFiltros();
      }
    });
  }

  cargarTemporadas() {
    this.temporadaService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.temporadas = response.data;
        }
      },
      error: (error) => {
        console.error('❌ Error al cargar temporadas:', error);
      }
    });
  }

  cargarEpisodios() {
    console.log('🔄 Cargando episodios desde API...');
    this.sharedService.showLoading();
    
    this.episodioService.getAll()
      .pipe(
        finalize(() => this.sharedService.hideLoading())
      )
      .subscribe({
        next: (response) => {
          console.log('✅ Respuesta recibida:', response);
          if (response.success && response.data) {
            console.log(`✅ ${response.data.length} episodios cargados`);
            this.episodios = response.data;
            this.aplicarFiltros();
            setTimeout(() => this.cdr.detectChanges(), 0);
          } else {
            console.warn('⚠️ Respuesta sin datos válidos:', response);
          }
        },
        error: (error) => {
          console.error('❌ Error al cargar episodios:', error);
          this.sharedService.showError('Error al cargar episodios');
        }
      });
  }

  aplicarFiltros() {
    console.log('🔍 Aplicando filtros. Total episodios:', this.episodios.length);
    let filtered = [...this.episodios];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(e => 
        e.titulo.toLowerCase().includes(term) ||
        e.descripcion.toLowerCase().includes(term)
      );
    }

    if (this.filtroTemporada) {
      filtered = filtered.filter(e => {
        const tempId = typeof e.temporada_id === 'object' && e.temporada_id !== null 
          ? (e.temporada_id as any)._id 
          : e.temporada_id;
        return tempId === this.filtroTemporada;
      });
    }

    this.episodiosFiltrados = filtered;
    this.totalPages = Math.ceil(this.episodiosFiltrados.length / this.itemsPerPage);
    this.currentPage = 1;
    console.log('✅ Episodios filtrados:', this.episodiosFiltrados.length, 'Total páginas:', this.totalPages);
    console.log('📋 Array episodiosFiltrados:', this.episodiosFiltrados);
    
    // Actualizar paginación en el siguiente ciclo para evitar ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => this.actualizarPaginacion(), 0);
  }

  actualizarPaginacion() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.episodiosPaginados = this.episodiosFiltrados.slice(start, end);
    console.log(`📄 Página ${this.currentPage}: mostrando ${this.episodiosPaginados.length} episodios (${start}-${end})`);
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.actualizarPaginacion();
    }
  }

  verDetalle(id: string) {
    this.router.navigate(['/episodios', id]);
  }

  editar(id: string) {
    this.router.navigate(['/episodios/editar', id]);
  }

  eliminar(episodio: Episodio) {
    if (!episodio._id) return;

    if (confirm(`¿Estás seguro de eliminar "${episodio.titulo}"?`)) {
      this.sharedService.showLoading();
      
      this.episodioService.delete(episodio._id)
        .pipe(
          finalize(() => this.sharedService.hideLoading())
        )
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.sharedService.showSuccess('Episodio eliminado correctamente');
              this.cargarEpisodios();
            }
          },
          error: (error) => {
            this.sharedService.showError('Error al eliminar episodio');
            console.error(error);
          }
        });
    }
  }

  getTemporadaTitulo(temporada: any): string {
    return temporada?.titulo || 'Temporada ' + temporada?.numero_temporada || 'N/A';
  }

  getTemporadaNumero(episodio: Episodio): string {
    if (typeof episodio.temporada_id === 'object' && episodio.temporada_id !== null) {
      return 'T' + ((episodio.temporada_id as any).numero_temporada || 'N/A');
    }
    return 'N/A';
  }

  limpiarFiltros() {
    this.searchTerm = '';
    this.filtroTemporada = '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
    this.aplicarFiltros();
  }
}
