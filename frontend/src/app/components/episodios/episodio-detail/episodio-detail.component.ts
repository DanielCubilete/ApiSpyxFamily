import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EpisodioService } from '../../../services/episodio.service';
import { SharedService } from '../../../services/shared.service';
import { Episodio } from '../../../models/interfaces';

@Component({
  selector: 'app-episodio-detail',
  standalone: true,
  templateUrl: './episodio-detail.component.html',
  styleUrls: ['./episodio-detail.component.css'],
  imports: [CommonModule, RouterModule]
})
export class EpisodioDetailComponent implements OnInit {
  episodio: Episodio | null = null;
  episodioId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private episodioService: EpisodioService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.episodioId = this.route.snapshot.paramMap.get('id') || '';
    if (this.episodioId) {
      this.cargarEpisodio();
    }
  }

  cargarEpisodio() {
    this.sharedService.showLoading();
    this.episodioService.getById(this.episodioId).subscribe({
      next: (response) => {
        this.sharedService.hideLoading();
        if (response.success && response.data) {
          this.episodio = response.data;
        }
      },
      error: (error) => {
        this.sharedService.hideLoading();
        this.sharedService.showError('Error al cargar el episodio');
        console.error(error);
      }
    });
  }

  eliminar() {
    if (!this.episodio?._id) return;

    if (confirm(`¿Estás seguro de eliminar "${this.episodio.titulo}"?`)) {
      this.sharedService.showLoading();
      this.episodioService.delete(this.episodio._id).subscribe({
        next: (response) => {
          this.sharedService.hideLoading();
          if (response.success) {
            this.sharedService.showSuccess('Episodio eliminado correctamente');
            this.router.navigate(['/episodios']);
          }
        },
        error: (error) => {
          this.sharedService.hideLoading();
          this.sharedService.showError('Error al eliminar episodio');
          console.error(error);
        }
      });
    }
  }

  getTemporadaTitulo(temporada: any): string {
    return temporada?.titulo || 'Temporada ' + temporada?.numero_temporada || 'N/A';
  }

  volver() {
    this.router.navigate(['/episodios']);
  }
}
