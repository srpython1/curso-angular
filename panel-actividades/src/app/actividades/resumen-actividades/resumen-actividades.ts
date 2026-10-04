import { Component, input } from '@angular/core';

@Component({
  selector: 'app-resumen-actividades',
  templateUrl: './resumen-actividades.html',
  styleUrl: './resumen-actividades.css',
})
export class ResumenActividades {
  readonly total = input.required<number>();
  readonly pendientes = input.required<number>();
  readonly enProgreso = input.required<number>();
  readonly completadas = input.required<number>();
  readonly porcentaje = input(0);
}
