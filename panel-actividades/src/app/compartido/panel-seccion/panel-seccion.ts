import { Component, input } from '@angular/core';

@Component({
  selector: 'app-panel-seccion',
  templateUrl: './panel-seccion.html',
  styleUrl: './panel-seccion.css',
})
export class PanelSeccion {
  readonly titulo = input.required<string>();
}
