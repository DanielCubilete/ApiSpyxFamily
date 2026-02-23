import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TomoService } from '../../../services/tomo.service';
import { SharedService } from '../../../services/shared.service';
import { Tomo } from '../../../models/interfaces';

@Component({
  selector: 'app-tomo-list',
  standalone: true,
  templateUrl: './tomo-list.component.html',
  styleUrls: ['./tomo-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class TomoListComponent implements OnInit {
  tomos: Tomo[] = [];
  tomosFiltrados: Tomo[] = [];
  searchTerm = '';
  
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  Math = Math;

  constructor(
    private tomoService: TomoService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('🚀 TomoListComponent inicializado');
    this.cargarTomos();
  }

  cargarTomos() {
    console.log('🔍 Cargando tomos...');
    this.sharedService.showLoading();
    this.tomoService.getAll().subscribe({
      next: (response) => {
        console.log('✅ Respuesta recibida:', response);
        this.sharedService.hideLoading();
        if (response.success && response.data) {
          this.tomos = response.data;
          console.log('📊 Total tomos:', this.tomos.length);
          this.aplicarFiltros();
        }
      },
      error: (error) => {
        console.error('❌ Error al cargar tomos:', error);
        this.sharedService.hideLoading();
        this.sharedService.showError('Error al cargar tomos');
        console.error(error);
      }
    });
  }

  aplicarFiltros() {
    let filtered = [...this.tomos];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.titulo.toLowerCase().includes(term) ||
        t.isbn.toLowerCase().includes(term) ||
        t.editorial.toLowerCase().includes(term)
      );
    }

    this.tomosFiltrados = filtered;
    this.totalPages = Math.ceil(this.tomosFiltrados.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get tomosPaginados(): Tomo[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.tomosFiltrados.slice(start, end);
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  verDetalle(id: string) {
    this.router.navigate(['/tomos', id]);
  }

  eliminar(tomo: Tomo) {
    if (!tomo._id) return;

    if (confirm(`¿Estás seguro de eliminar "${tomo.titulo}"?`)) {
      this.sharedService.showLoading();
      this.tomoService.delete(tomo._id).subscribe({
        next: (response) => {
          this.sharedService.hideLoading();
          if (response.success) {
            this.sharedService.showSuccess('Tomo eliminado correctamente');
            this.cargarTomos();
          }
        },
        error: (error) => {
          this.sharedService.hideLoading();
          this.sharedService.showError('Error al eliminar tomo');
          console.error(error);
        }
      });
    }
  }

  limpiarFiltros() {
    this.searchTerm = '';
    this.aplicarFiltros();
  }

  getImagenTomo(tomo: Tomo): string {
    if (tomo.imagen_url) {
      return tomo.imagen_url;
    }
    return `https://picsum.photos/seed/spyxfamily-tomo${tomo.numero_tomo}/300/450`;
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/300x450/6c757d/ffffff?text=Tomo';
  }
}
