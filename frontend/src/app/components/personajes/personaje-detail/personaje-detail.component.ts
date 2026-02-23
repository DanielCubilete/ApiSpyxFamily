import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonajeService } from '../../../services/personaje.service';
import { SharedService } from '../../../services/shared.service';
import { Personaje } from '../../../models/interfaces';

@Component({
  selector: 'app-personaje-detail',
  standalone: true,
  templateUrl: './personaje-detail.component.html',
  styleUrls: ['./personaje-detail.component.css'],
  imports: [CommonModule, RouterModule]
})
export class PersonajeDetailComponent implements OnInit {
  personaje: Personaje | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personajeService: PersonajeService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarPersonaje(id);
    }
  }

  cargarPersonaje(id: string) {
    this.sharedService.showLoading();
    this.personajeService.getById(id).subscribe({
      next: (response) => {
        this.sharedService.hideLoading();
        if (response.success && response.data) {
          this.personaje = response.data;
        }
      },
      error: (error) => {
        this.sharedService.hideLoading();
        this.sharedService.showError('Error al cargar el personaje');
        console.error(error);
        this.router.navigate(['/personajes']);
      }
    });
  }

  editar() {
    if (this.personaje && this.personaje._id) {
      this.router.navigate(['/personajes', 'editar', this.personaje._id]);
    }
  }

  eliminar() {
    if (!this.personaje || !this.personaje._id) return;

    if (confirm(`¿Estás seguro de eliminar a ${this.personaje.nombre}?`)) {
      this.sharedService.showLoading();
      this.personajeService.delete(this.personaje._id).subscribe({
        next: (response) => {
          this.sharedService.hideLoading();
          if (response.success) {
            this.sharedService.showSuccess('Personaje eliminado correctamente');
            this.router.navigate(['/personajes']);
          }
        },
        error: (error) => {
          this.sharedService.hideLoading();
          this.sharedService.showError('Error al eliminar el personaje');
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

  volver() {
    this.router.navigate(['/personajes']);
  }
}
