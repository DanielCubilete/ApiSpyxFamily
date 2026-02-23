import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TomoService } from '../../../services/tomo.service';
import { SharedService } from '../../../services/shared.service';
import { Tomo } from '../../../models/interfaces';

@Component({
  selector: 'app-tomo-detail',
  standalone: true,
  templateUrl: './tomo-detail.component.html',
  styleUrls: ['./tomo-detail.component.css'],
  imports: [CommonModule, RouterModule]
})
export class TomoDetailComponent implements OnInit {
  tomo: Tomo | null = null;
  tomoId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tomoService: TomoService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.tomoId = this.route.snapshot.paramMap.get('id') || '';
    if (this.tomoId) {
      this.cargarTomo();
    }
  }

  cargarTomo() {
    this.sharedService.showLoading();
    this.tomoService.getById(this.tomoId).subscribe({
      next: (response) => {
        this.sharedService.hideLoading();
        if (response.success && response.data) {
          this.tomo = response.data;
        }
      },
      error: (error) => {
        this.sharedService.hideLoading();
        this.sharedService.showError('Error al cargar el tomo');
        console.error(error);
      }
    });
  }

  eliminar() {
    if (!this.tomo?._id) return;

    if (confirm(`¿Estás seguro de eliminar  "${this.tomo.titulo}"?`)) {
      this.sharedService.showLoading();
      this.tomoService.delete(this.tomo._id).subscribe({
        next: (response) => {
          this.sharedService.hideLoading();
          if (response.success) {
            this.sharedService.showSuccess('Tomo eliminado correctamente');
            this.router.navigate(['/tomos']);
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

  volver() {
    this.router.navigate(['/tomos']);
  }
}
