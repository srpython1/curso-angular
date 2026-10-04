import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResumenActividades } from './actividades/resumen-actividades/resumen-actividades';
import { TarjetaActividad } from './actividades/tarjeta-actividad/tarjeta-actividad';
import { ListaActividades } from './actividades/lista-actividades/lista-actividades';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ResumenActividades, TarjetaActividad, ListaActividades],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
