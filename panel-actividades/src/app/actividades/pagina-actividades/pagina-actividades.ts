import { Component, computed, signal } from '@angular/core';
import { Actividad, EstadoActividad, FiltroEstado, FiltroPrioridad, Prioridad } from '../../modelos/actividad';
import { ResumenActividades } from '../resumen-actividades/resumen-actividades';
import { FiltrosActividades } from '../filtros-actividades/filtros-actividades';
import { ListaActividades } from '../lista-actividades/lista-actividades';
import { PanelSeccion } from '../../compartido/panel-seccion/panel-seccion';

@Component({
  selector: 'app-pagina-actividades',
  imports: [ResumenActividades, FiltrosActividades, ListaActividades, PanelSeccion],
  templateUrl: './pagina-actividades.html',
  styleUrl: './pagina-actividades.css',
})
export class PaginaActividades {
  private readonly orden: Record<Prioridad, number> = { alta: 0, media: 1, baja: 2 };

  protected readonly actividades = signal<Actividad[]>([
    { id: 1, titulo: 'Preparar estructura HTML', estado: 'completada', prioridad: 'alta', creadaEn: '2026-08-10', destacada: false },
    { id: 2, titulo: 'Revisar contraste', estado: 'en_progreso', prioridad: 'media', creadaEn: '2026-08-12', destacada: true },
    { id: 3, titulo: 'Practicar TypeScript', estado: 'pendiente', prioridad: 'alta', creadaEn: '2026-08-14', destacada: false },
    { id: 4, titulo: 'Comprobar vista estrecha', estado: 'pendiente', prioridad: 'baja', creadaEn: '2026-08-16', destacada: false },
    { id: 5, titulo: 'Ejecutar el build', estado: 'pendiente', prioridad: 'media', creadaEn: '2026-08-18', destacada: false },
  ]);

  protected readonly termino = signal('');
  protected readonly filtroEstado = signal<FiltroEstado>('todas');
  protected readonly filtroPrioridad = signal<FiltroPrioridad>('todas');
  protected readonly seleccionadaId = signal<number | null>(null);

  protected readonly total = computed(() => this.actividades().length);

  protected readonly pendientes = computed(
    () => this.actividades().filter((a) => a.estado === 'pendiente').length,
  );

  protected readonly enProgreso = computed(
    () => this.actividades().filter((a) => a.estado === 'en_progreso').length,
  );

  protected readonly completadas = computed(
    () => this.actividades().filter((a) => a.estado === 'completada').length,
  );

  protected readonly porcentaje = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.completadas() / this.total()) * 100),
  );

  protected readonly visibles = computed(() => {
    const termino = this.termino().trim().toLocaleLowerCase('es');
    const estado = this.filtroEstado();
    const prioridad = this.filtroPrioridad();

    return this.actividades()
      .filter((a) => termino === '' || a.titulo.toLocaleLowerCase('es').includes(termino))
      .filter((a) => estado === 'todas' || a.estado === estado)
      .filter((a) => prioridad === 'todas' || a.prioridad === prioridad)
      .sort((primera, segunda) => this.orden[primera.prioridad] - this.orden[segunda.prioridad]);
  });

  protected readonly mostradas = computed(() => this.visibles().length);

  protected readonly hayFiltros = computed(
    () =>
      this.termino().trim() !== '' ||
      this.filtroEstado() !== 'todas' ||
      this.filtroPrioridad() !== 'todas',
  );

  protected readonly mensajeVacio = computed(() =>
    this.total() === 0
      ? 'Todavía no hay actividades. Crea la primera para empezar.'
      : 'Ninguna actividad coincide con los filtros aplicados.',
  );

  protected readonly seleccionada = computed(
    () => this.actividades().find((a) => a.id === this.seleccionadaId()) ?? null,
  );

  protected alternarDestacada(id: number): void {
    this.actividades.update((actuales) =>
      actuales.map((a) => (a.id === id ? { ...a, destacada: !a.destacada } : a)),
    );
  }

  protected avanzarEstado(id: number): void {
    this.actividades.update((actuales) =>
      actuales.map((a) => (a.id === id ? { ...a, estado: this.siguienteEstado(a.estado) } : a)),
    );
  }

  protected eliminar(id: number): void {
    this.actividades.update((actuales) => actuales.filter((a) => a.id !== id));
    this.seleccionadaId.update((actual) => (actual === id ? null : actual));
  }

  protected seleccionar(id: number): void {
    this.seleccionadaId.update((actual) => (actual === id ? null : id));
  }

  protected limpiarFiltros(): void {
    this.termino.set('');
    this.filtroEstado.set('todas');
    this.filtroPrioridad.set('todas');
  }

  protected restablecer(): void {
    this.actividades.set([]);
    this.limpiarFiltros();
    this.seleccionadaId.set(null);
  }

  private siguienteEstado(estado: EstadoActividad): EstadoActividad {
    if (estado === 'pendiente') return 'en_progreso';
    if (estado === 'en_progreso') return 'completada';
    return 'completada';
  }
}
