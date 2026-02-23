import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TemporadaService } from '../../../services/temporada.service';
import { SharedService } from '../../../services/shared.service';
import { Temporada } from '../../../models/interfaces';

@Component({
  selector: 'app-temporada-detail',
  standalone: true,
  templateUrl: './temporada-detail.component.html',
  styleUrls: ['./temporada-detail.component.css'],
  imports: [CommonModule, RouterModule]
})
export class TemporadaDetailComponent implements OnInit {
  temporada: Temporada | null = null;
  temporadaId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private temporadaService: TemporadaService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.temporadaId = this.route.snapshot.paramMap.get('id') || '';
    if (this.temporadaId) {
      this.cargarTemporada();
    }
  }

  cargarTemporada() {
    console.log('🔍 Cargando temporada ID:', this.temporadaId);
    this.sharedService.showLoading();
    this.temporadaService.getById(this.temporadaId).subscribe({
      next: (response) => {
        console.log('✅ Temporada recibida:', response);
        this.sharedService.hideLoading();
        if (response.success && response.data) {
          this.temporada = response.data;
          console.log('📊 Temporada cargada:', this.temporada);
          console.log('🎬 Episodios incluidos:', this.temporada.episodios?.length || 0);
        }
      },
      error: (error) => {
        console.error('❌ Error al cargar temporada:', error);
        this.sharedService.hideLoading();
        this.sharedService.showError('Error al cargar la temporada');
        console.error(error);
      }
    });
  }

  eliminar() {
    if (!this.temporada?._id) return;

    if (confirm(`¿Estás seguro de eliminar ${this.temporada.titulo}?`)) {
      this.sharedService.showLoading();
      this.temporadaService.delete(this.temporada._id).subscribe({
        next: (response) => {
          this.sharedService.hideLoading();
          if (response.success) {
            this.sharedService.showSuccess('Temporada eliminada correctamente');
            this.router.navigate(['/temporadas']);
          }
        },
        error: (error) => {
          this.sharedService.hideLoading();
          this.sharedService.showError('Error al eliminar temporada');
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

  volver() {
    this.router.navigate(['/temporadas']);
  }
}
