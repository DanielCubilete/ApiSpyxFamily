import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EpisodioService } from '../../../services/episodio.service';
import { TemporadaService } from '../../../services/temporada.service';
import { SharedService } from '../../../services/shared.service';
import { Episodio, Temporada } from '../../../models/interfaces';

@Component({
  selector: 'app-episodio-form',
  standalone: true,
  templateUrl: './episodio-form.component.html',
  styleUrls: ['./episodio-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EpisodioFormComponent implements OnInit {
  episodioForm!: FormGroup;
  isEditMode = false;
  episodioId: string | null = null;
  submitted = false;
  temporadas: Temporada[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private episodioService: EpisodioService,
    private temporadaService: TemporadaService,
    private sharedService: SharedService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.cargarTemporadas();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.episodioId = id;
      this.cargarEpisodio(id);
    }
  }

  initForm() {
    this.episodioForm = this.fb.group({
      numero_episodio: ['', [Validators.required, Validators.min(1)]],
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      sinopsis: [''],
      duracion_minutos: ['', [Validators.required, Validators.min(1), Validators.max(180)]],
      fecha_emision: ['', Validators.required],
      temporada_id: ['', Validators.required],
      director: [''],
      guionista: [''],
      valoracion: ['', [Validators.min(0), Validators.max(10)]],
      imagen_url: ['']
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
        console.error('Error al cargar temporadas:', error);
      }
    });
  }

  cargarEpisodio(id: string) {
    this.sharedService.showLoading();
    this.episodioService.getById(id)
      .pipe(finalize(() => this.sharedService.hideLoading()))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const episodio = response.data;
            
            // Convertir fecha a formato yyyy-MM-dd para input type="date"
            const fechaEmision = episodio.fecha_emision ? 
              new Date(episodio.fecha_emision).toISOString().split('T')[0] : '';
            
            // Obtener el ID de la temporada (puede venir como objeto o string)
            const temporadaId = typeof episodio.temporada_id === 'object' && episodio.temporada_id !== null
              ? (episodio.temporada_id as any)._id
              : episodio.temporada_id;
            
            this.episodioForm.patchValue({
              numero_episodio: episodio.numero_episodio,
              titulo: episodio.titulo,
              descripcion: episodio.descripcion,
              sinopsis: episodio.sinopsis || '',
              duracion_minutos: episodio.duracion_minutos,
              fecha_emision: fechaEmision,
              temporada_id: temporadaId,
              director: episodio.director || '',
              guionista: episodio.guionista || '',
              valoracion: episodio.valoracion || '',
              imagen_url: episodio.imagen_url || ''
            });
          }
        },
        error: (error) => {
          this.sharedService.showError('Error al cargar el episodio');
          console.error(error);
          this.router.navigate(['/episodios']);
        }
      });
  }

  onSubmit() {
    this.submitted = true;

    if (this.episodioForm.invalid) {
      this.sharedService.showWarning('Por favor, completa todos los campos requeridos');
      return;
    }

    const episodioData: Partial<Episodio> = {
      ...this.episodioForm.value,
      sinopsis: this.episodioForm.value.sinopsis || null,
      director: this.episodioForm.value.director || null,
      guionista: this.episodioForm.value.guionista || null,
      valoracion: this.episodioForm.value.valoracion || null,
      imagen_url: this.episodioForm.value.imagen_url || null
    };

    this.sharedService.showLoading();

    if (this.isEditMode && this.episodioId) {
      this.episodioService.update(this.episodioId, episodioData)
        .pipe(finalize(() => this.sharedService.hideLoading()))
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.sharedService.showSuccess('Episodio actualizado correctamente');
              this.router.navigate(['/episodios']);
            }
          },
          error: (error) => {
            this.sharedService.showError(
              error.error?.message || 'Error al actualizar el episodio'
            );
            console.error(error);
          }
        });
    } else {
      this.episodioService.create(episodioData as Episodio)
        .pipe(finalize(() => this.sharedService.hideLoading()))
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.sharedService.showSuccess('Episodio creado correctamente');
              this.router.navigate(['/episodios']);
            }
          },
          error: (error) => {
            this.sharedService.showError(
              error.error?.message || 'Error al crear el episodio'
            );
            console.error(error);
          }
        });
    }
  }

  get f() { return this.episodioForm.controls; }

  cancelar() {
    this.router.navigate(['/episodios']);
  }
}
