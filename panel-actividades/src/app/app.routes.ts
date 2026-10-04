import { Routes } from '@angular/router';
import { PaginaActividades } from './actividades/pagina-actividades/pagina-actividades';
import { DetalleActividad } from './actividades/detalle-actividad/detalle-actividad';
import { SeccionActividades } from './actividades/seccion-actividades/seccion-actividades';
import { PaginaNoEncontrada } from './compartido/pagina-no-encontrada/pagina-no-encontrada';

export const routes: Routes = [
  { path: '', redirectTo: 'actividades', pathMatch: 'full' },

  {
    path: 'actividades',
    component: SeccionActividades,
    children: [
      { path: '', component: PaginaActividades, title: 'Actividades' },
      { path: 'nueva', component: PaginaNoEncontrada, title: 'Nueva actividad' },
      { path: ':id', component: DetalleActividad, title: 'Detalle de la actividad' },
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

  { path: '**', component: PaginaNoEncontrada, title: 'Página no encontrada' },
];
