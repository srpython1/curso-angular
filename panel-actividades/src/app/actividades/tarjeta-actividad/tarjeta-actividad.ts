import { Component, computed, input, output } from '@angular/core';
import { Actividad, ETIQUETAS } from '../../modelos/actividad';

@Component({
  selector: 'app-tarjeta-actividad',
  templateUrl: './tarjeta-actividad.html',
  styleUrl: './tarjeta-actividad.css',
})
export class TarjetaActividad {
  readonly actividad = input.required<Actividad>();
  readonly seleccionada = input(false);

  readonly seleccionCambiada = output<number>();
  readonly destacadoCambiado = output<number>();
  readonly avanceSolicitado = output<number>();
  readonly eliminacionSolicitada = output<number>();

  protected readonly etiquetaEstado = computed(() => ETIQUETAS[this.actividad().estado]);

  protected readonly etiquetaEliminar = computed(() => `Eliminar ${this.actividad().titulo}`);
}

