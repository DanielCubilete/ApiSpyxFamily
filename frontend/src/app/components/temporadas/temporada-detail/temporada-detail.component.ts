import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
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
  isLoading: boolean = true;
  loadError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private temporadaService: TemporadaService,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.temporadaId = this.route.snapshot.paramMap.get('id') || '';
    if (this.temporadaId) {
      this.cargarTemporada();
    }
  }

  cargarTemporada() {
    console.log('🔍 Cargando temporada ID:', this.temporadaId);
    this.isLoading = true;
    this.loadError = false;
    this.sharedService.showLoading();
    
    this.temporadaService.getById(this.temporadaId)
      .pipe(
        finalize(() => {
          this.sharedService.hideLoading();
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('✅ Respuesta de temporada recibida:', response);
          if (response.success && response.data) {
            this.temporada = response.data;
            console.log('📊 Temporada cargada exitosamente:', {
              id: this.temporada._id,
              titulo: this.temporada.titulo,
              numero: this.temporada.numero_temporada
            });
            console.log('🎬 Episodios incluidos:', this.temporada.episodios?.length || 0);
            setTimeout(() => this.cdr.detectChanges(), 0);
          } else {
            console.error('❌ Respuesta sin success o sin data:', response);
            this.loadError = true;
            this.sharedService.showError('No se encontró la temporada');
          }
        },
        error: (error) => {
          console.error('❌ Error HTTP al cargar temporada:', error);
          console.error('Status:', error.status);
          console.error('Message:', error.message);
          this.loadError = true;
          this.sharedService.showError('Error al cargar la temporada');
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
