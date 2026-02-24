import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonajeListComponent } from './components/personajes/personaje-list/personaje-list.component';
import { PersonajeDetailComponent } from './components/personajes/personaje-detail/personaje-detail.component';
import { PersonajeFormComponent } from './components/personajes/personaje-form/personaje-form.component';
import { TemporadaListComponent } from './components/temporadas/temporada-list/temporada-list.component';
import { TemporadaDetailComponent } from './components/temporadas/temporada-detail/temporada-detail.component';
import { TemporadaFormComponent } from './components/temporadas/temporada-form/temporada-form.component';
import { EpisodioListComponent } from './components/episodios/episodio-list/episodio-list.component';
import { EpisodioDetailComponent } from './components/episodios/episodio-detail/episodio-detail.component';
import { EpisodioFormComponent } from './components/episodios/episodio-form/episodio-form.component';
import { TomoListComponent } from './components/tomos/tomo-list/tomo-list.component';
import { TomoDetailComponent } from './components/tomos/tomo-detail/tomo-detail.component';
import { DocumentacionComponent } from './components/documentacion/documentacion.component';

export const routes: Routes = [
  { path: '', component: DocumentacionComponent },
  
  // Ruta de documentación
  { path: 'documentacion', component: DocumentacionComponent },
  
  // Home con estadísticas
  { path: 'home', component: HomeComponent },
  
  // Rutas de temporadas (las rutas específicas DEBEN ir antes que las dinámicas con :id)
  { path: 'temporadas', component: TemporadaListComponent },
  { path: 'temporadas/nueva', component: TemporadaFormComponent },
  { path: 'temporadas/editar/:id', component: TemporadaFormComponent },
  { path: 'temporadas/:id', component: TemporadaDetailComponent },
  
  // Rutas de episodios (las rutas específicas DEBEN ir antes que las dinámicas con :id)
  { path: 'episodios', component: EpisodioListComponent },
  { path: 'episodios/nuevo', component: EpisodioFormComponent },
  { path: 'episodios/editar/:id', component: EpisodioFormComponent },
  { path: 'episodios/:id', component: EpisodioDetailComponent },
  
  // Rutas de personajes (las rutas específicas DEBEN ir antes que las dinámicas con :id)
  { path: 'personajes', component: PersonajeListComponent },
  { path: 'personajes/nuevo', component: PersonajeFormComponent },
  { path: 'personajes/editar/:id', component: PersonajeFormComponent },
  { path: 'personajes/:id', component: PersonajeDetailComponent },
  
  // Rutas de tomos
  { path: 'tomos', component: TomoListComponent },
  { path: 'tomos/:id', component: TomoDetailComponent },
  
  // Redirigir rutas no encontradas
  { path: '**', redirectTo: '' }
];
