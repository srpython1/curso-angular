import { Component, computed, model } from '@angular/core';
import { FiltroEstado, FiltroPrioridad } from '../../modelos/actividad';

@Component({
  selector: 'app-filtros-actividades',
  templateUrl: './filtros-actividades.html',
  styleUrl: './filtros-actividades.css',
})
export class FiltrosActividades {
  readonly termino = model('');
  readonly estado = model<FiltroEstado>('todas');
  readonly prioridad = model<FiltroPrioridad>('todas');

  protected readonly hayFiltros = computed(
    () => this.termino().trim() !== '' || this.estado() !== 'todas' || this.prioridad() !== 'todas',
  );

  protected escribirTermino(evento: Event): void {
    this.termino.set((evento.target as HTMLInputElement).value);
  }

  protected elegirEstado(evento: Event): void {
    this.estado.set((evento.target as HTMLSelectElement).value as FiltroEstado);
  }

  protected elegirPrioridad(evento: Event): void {
    this.prioridad.set((evento.target as HTMLSelectElement).value as FiltroPrioridad);
  }

  protected limpiar(): void {
    this.termino.set('');
    this.estado.set('todas');
    this.prioridad.set('todas');
  }
}

