import { Component } from '@angular/core';

@Component({
  selector: 'app-resumen-actividades',
  templateUrl: './resumen-actividades.html',
  styleUrl: './resumen-actividades.css',
})
export class ResumenActividades {
  protected readonly total = 4;
  protected readonly pendientes = 2;
  protected readonly enProgreso = 1;
  protected readonly completadas = 1;
}
