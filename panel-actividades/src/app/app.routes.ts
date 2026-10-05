import { Routes } from '@angular/router';
import { PaginaActividades } from './actividades/pagina-actividades/pagina-actividades';
import { DetalleActividad } from './actividades/detalle-actividad/detalle-actividad';
import { SeccionActividades } from './actividades/seccion-actividades/seccion-actividades';
import { PaginaNoEncontrada } from './compartido/pagina-no-encontrada/pagina-no-encontrada';
import { puedeSalir } from './actividades/puede-salir';

export const routes: Routes = [
  { path: '', redirectTo: 'actividades', pathMatch: 'full' },

  {
    path: 'actividades',
    component: SeccionActividades,
    children: [
      { path: '', component: PaginaActividades, title: 'Actividades' },
      {
        path: 'nueva',
        title: 'Nueva actividad',
        loadComponent: () =>
          import('./actividades/formulario-actividad/formulario-actividad').then(
            (m) => m.FormularioActividad,
          ),
        canDeactivate: [puedeSalir],
      },
      { path: ':id', component: DetalleActividad, title: 'Detalle de la actividad' },
      {
        path: ':id/editar',
        title: 'Editar actividad',
        loadComponent: () =>
          import('./actividades/formulario-actividad/formulario-actividad').then(
            (m) => m.FormularioActividad,
          ),
        canDeactivate: [puedeSalir],
      },
    ],
  },

  {
    path: 'estadisticas',
    title: 'Estadísticas',
    loadComponent: () =>
      import('./estadisticas/pagina-estadisticas/pagina-estadisticas').then(
        (m) => m.PaginaEstadisticas,
      ),
  },

  {
    path: 'sugerencias',
    title: 'Sugerencias',
    loadComponent: () =>
      import('./sugerencias/pagina-sugerencias/pagina-sugerencias').then(
        (m) => m.PaginaSugerencias,
      ),
  },

  { path: '**', component: PaginaNoEncontrada, title: 'Página no encontrada' },
];
