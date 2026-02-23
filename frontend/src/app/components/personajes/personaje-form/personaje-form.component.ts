import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajeService } from '../../../services/personaje.service';
import { SharedService } from '../../../services/shared.service';
import { Personaje } from '../../../models/interfaces';

@Component({
  selector: 'app-personaje-form',
  standalone: true,
  templateUrl: './personaje-form.component.html',
  styleUrls: ['./personaje-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PersonajeFormComponent implements OnInit {
  personajeForm!: FormGroup;
  isEditMode = false;
  personajeId: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personajeService: PersonajeService,
    private sharedService: SharedService
  ) {
    this.initForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.personajeId = id;
      this.cargarPersonaje(id);
    }
  }

  initForm() {
    this.personajeForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      alias: [''],
      edad: ['', [Validators.min(0), Validators.max(120)]],
      rol: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      habilidades: this.fb.array([]),
      organizacion: ['']
    });
  }

  get habilidades(): FormArray {
    return this.personajeForm.get('habilidades') as FormArray;
  }

  agregarHabilidad() {
    this.habilidades.push(this.fb.control('', Validators.required));
  }

  eliminarHabilidad(index: number) {
    this.habilidades.removeAt(index);
  }

  cargarPersonaje(id: string) {
    this.sharedService.showLoading();
    this.personajeService.getById(id).subscribe({
      next: (response) => {
        this.sharedService.hideLoading();
        if (response.success && response.data) {
          const personaje = response.data;
          
          // Limpiar array de habilidades
          while (this.habilidades.length !== 0) {
            this.habilidades.removeAt(0);
          }
          
          // Agregar habilidades existentes
          if (personaje.habilidades && personaje.habilidades.length > 0) {
            personaje.habilidades.forEach(habilidad => {
              this.habilidades.push(this.fb.control(habilidad, Validators.required));
            });
          }
          
          this.personajeForm.patchValue({
            nombre: personaje.nombre,
            alias: personaje.alias || '',
            edad: personaje.edad || '',
            rol: personaje.rol,
            descripcion: personaje.descripcion,
            organizacion: personaje.organizacion || ''
          });
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

  onSubmit() {
    this.submitted = true;

    if (this.personajeForm.invalid) {
      this.sharedService.showWarning('Por favor, completa todos los campos requeridos');
      return;
    }

    const personajeData: Personaje = {
      ...this.personajeForm.value,
      alias: this.personajeForm.value.alias || null,
      edad: this.personajeForm.value.edad || null,
      organizacion: this.personajeForm.value.organizacion || null
    };

    this.sharedService.showLoading();

    if (this.isEditMode && this.personajeId) {
      this.personajeService.update(this.personajeId, personajeData).subscribe({
        next: (response) => {
          this.sharedService.hideLoading();
          if (response.success) {
            this.sharedService.showSuccess('Personaje actualizado correctamente');
            this.router.navigate(['/personajes', this.personajeId]);
          }
        },
        error: (error) => {
          this.sharedService.hideLoading();
          this.sharedService.showError(
            error.error?.message || 'Error al actualizar el personaje'
          );
          console.error(error);
        }
      });
    } else {
      this.personajeService.create(personajeData).subscribe({
        next: (response) => {
          this.sharedService.hideLoading();
          if (response.success) {
            this.sharedService.showSuccess('Personaje creado correctamente');
            this.router.navigate(['/personajes']);
          }
        },
        error: (error) => {
          this.sharedService.hideLoading();
          this.sharedService.showError(
            error.error?.message || 'Error al crear el personaje'
          );
          console.error(error);
        }
      });
    }
  }

  get f() { return this.personajeForm.controls; }

  cancelar() {
    this.router.navigate(['/personajes']);
  }
}
