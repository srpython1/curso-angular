import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginaActividades } from './actividades/pagina-actividades/pagina-actividades';
import { PaginaEstadisticas } from './estadisticas/pagina-estadisticas/pagina-estadisticas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PaginaActividades, PaginaEstadisticas],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
