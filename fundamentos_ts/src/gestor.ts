import type { Actividad } from './tipos.js';

export class GestorActividades {
  constructor(private readonly actividades: Actividad[]) {}

  buscarPorId(id: number): Actividad | undefined {
    return this.actividades.find((actividad) => actividad.id === id);
  }

  completar(id: number): Actividad[] {
    return this.actividades.map((actividad) =>
      actividad.id === id
        ? { ...actividad, estado: 'completada' }
        : actividad,
    );
  }
}
