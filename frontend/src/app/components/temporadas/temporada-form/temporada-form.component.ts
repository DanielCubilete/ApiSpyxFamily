import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TemporadaService } from '../../../services/temporada.service';
import { SharedService } from '../../../services/shared.service';
import { Temporada } from '../../../models/interfaces';

@Component({
  selector: 'app-temporada-form',
  standalone: true,
  templateUrl: './temporada-form.component.html',
  styleUrls: ['./temporada-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TemporadaFormComponent implements OnInit {
  temporadaForm!: FormGroup;
  isEditMode = false;
  temporadaId: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private temporadaService: TemporadaService,
    private sharedService: SharedService
  ) {
    this.initForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.temporadaId = id;
      this.cargarTemporada(id);
    }
  }

  initForm() {
    this.temporadaForm = this.fb.group({
      numero_temporada: ['', [Validators.required, Validators.min(1)]],
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      fecha_estreno: ['', Validators.required],
      fecha_finalizacion: [''],
      numero_episodios: ['', [Validators.required, Validators.min(1)]],
      estudio_animacion: ['', [Validators.required, Validators.minLength(2)]],
      director: [''],
      estado: ['', Validators.required],
      valoracion: ['', [Validators.min(0), Validators.max(10)]],
      imagen_url: ['']
    });
  }

  cargarTemporada(id: string) {
    this.sharedService.showLoading();
    this.temporadaService.getById(id)
      .pipe(finalize(() => this.sharedService.hideLoading()))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const temporada = response.data;
            
            // Convertir fechas a formato yyyy-MM-dd para input type="date"
            const fechaEstreno = temporada.fecha_estreno ? 
              new Date(temporada.fecha_estreno).toISOString().split('T')[0] : '';
            const fechaFin = temporada.fecha_finalizacion ? 
              new Date(temporada.fecha_finalizacion).toISOString().split('T')[0] : '';
            
            this.temporadaForm.patchValue({
              numero_temporada: temporada.numero_temporada,
              titulo: temporada.titulo,
              descripcion: temporada.descripcion,
              fecha_estreno: fechaEstreno,
              fecha_finalizacion: fechaFin,
              numero_episodios: temporada.numero_episodios,
              estudio_animacion: temporada.estudio_animacion,
              director: temporada.director || '',
              estado: temporada.estado,
              valoracion: temporada.valoracion || '',
              imagen_url: temporada.imagen_url || ''
            });
          }
        },
        error: (error) => {
          this.sharedService.showError('Error al cargar la temporada');
          console.error(error);
          this.router.navigate(['/temporadas']);
        }
      });
  }

  onSubmit() {
    this.submitted = true;

    if (this.temporadaForm.invalid) {
      this.sharedService.showWarning('Por favor, completa todos los campos requeridos');
      return;
    }

    const temporadaData: Partial<Temporada> = {
      ...this.temporadaForm.value,
      fecha_finalizacion: this.temporadaForm.value.fecha_finalizacion || null,
      director: this.temporadaForm.value.director || null,
      valoracion: this.temporadaForm.value.valoracion || null,
      imagen_url: this.temporadaForm.value.imagen_url || null
    };

    this.sharedService.showLoading();

    if (this.isEditMode && this.temporadaId) {
      this.temporadaService.update(this.temporadaId, temporadaData)
        .pipe(finalize(() => this.sharedService.hideLoading()))
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.sharedService.showSuccess('Temporada actualizada correctamente');
              this.router.navigate(['/temporadas']);
            }
          },
          error: (error) => {
            this.sharedService.showError(
              error.error?.message || 'Error al actualizar la temporada'
            );
            console.error(error);
          }
        });
    } else {
      this.temporadaService.create(temporadaData as Temporada)
        .pipe(finalize(() => this.sharedService.hideLoading()))
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.sharedService.showSuccess('Temporada creada correctamente');
              this.router.navigate(['/temporadas']);
            }
          },
          error: (error) => {
            this.sharedService.showError(
              error.error?.message || 'Error al crear la temporada'
            );
            console.error(error);
          }
        });
    }
  }

  get f() { return this.temporadaForm.controls; }

  cancelar() {
    this.router.navigate(['/temporadas']);
  }
}
