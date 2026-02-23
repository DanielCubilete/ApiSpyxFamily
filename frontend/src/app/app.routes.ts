import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonajeListComponent } from './components/personajes/personaje-list/personaje-list.component';
import { PersonajeDetailComponent } from './components/personajes/personaje-detail/personaje-detail.component';
import { PersonajeFormComponent } from './components/personajes/personaje-form/personaje-form.component';
import { TemporadaListComponent } from './components/temporadas/temporada-list/temporada-list.component';
import { TemporadaDetailComponent } from './components/temporadas/temporada-detail/temporada-detail.component';
import { EpisodioListComponent } from './components/episodios/episodio-list/episodio-list.component';
import { EpisodioDetailComponent } from './components/episodios/episodio-detail/episodio-detail.component';
import { TomoListComponent } from './components/tomos/tomo-list/tomo-list.component';
import { TomoDetailComponent } from './components/tomos/tomo-detail/tomo-detail.component';
import { DocumentacionComponent } from './components/documentacion/documentacion.component';

export const routes: Routes = [
  { path: '', component: DocumentacionComponent },
  
  // Ruta de documentación
  { path: 'documentacion', component: DocumentacionComponent },
  
  // Home con estadísticas
  { path: 'home', component: HomeComponent },
  
  // Rutas de temporadas
  { path: 'temporadas', component: TemporadaListComponent },
  { path: 'temporadas/:id', component: TemporadaDetailComponent },
  
  // Rutas de episodios
  { path: 'episodios', component: EpisodioListComponent },
  { path: 'episodios/:id', component: EpisodioDetailComponent },
  
  // Rutas de personajes
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
