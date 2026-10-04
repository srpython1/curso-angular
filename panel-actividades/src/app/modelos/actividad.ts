export type EstadoActividad = 'pendiente' | 'en_progreso' | 'completada';

export type Prioridad = 'baja' | 'media' | 'alta';

export interface Actividad {
  id: number;
  titulo: string;
  estado: EstadoActividad;
  prioridad: Prioridad;
  creadaEn: string;
  destacada: boolean;
}

export type FiltroEstado = EstadoActividad | 'todas';
export type FiltroPrioridad = Prioridad | 'todas';
