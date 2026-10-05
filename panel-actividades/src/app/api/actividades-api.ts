import { HttpClient, HttpParams } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Actividad, Prioridad } from '../modelos/actividad';

interface ActividadRemota {
  id: number;
  task_title: string;
  description: string | null;
  priority_level: number;
  is_done: boolean;
  created_at: string;
}

export interface DatosActividadRemota {
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  completada: boolean;
}

const PRIORIDADES: Record<number, Prioridad> = { 1: 'baja', 2: 'media', 3: 'alta' };
const NIVELES: Record<Prioridad, number> = { baja: 1, media: 2, alta: 3 };

export function esActividadRemota(valor: unknown): valor is ActividadRemota {
  if (typeof valor !== 'object' || valor === null) {
    return false;
  }

  const v = valor as ActividadRemota;

  return (
    typeof v.id === 'number' &&
    typeof v.task_title === 'string' &&
    typeof v.priority_level === 'number' &&
    typeof v.is_done === 'boolean' &&
    typeof v.created_at === 'string'
  );
}

export function aActividad(remota: ActividadRemota): Actividad {
  return {
    id: remota.id,
    titulo: remota.task_title,
    descripcion: remota.description ?? '',
    prioridad: PRIORIDADES[remota.priority_level] ?? 'media',
    estado: remota.is_done ? 'completada' : 'pendiente',
    creadaEn: remota.created_at.slice(0, 10),
    destacada: false,
  };
}

export function aActividades(datos: unknown): Actividad[] {
  return Array.isArray(datos) ? datos.filter(esActividadRemota).map(aActividad) : [];
}

function aCuerpoRemoto(datos: DatosActividadRemota): Record<string, unknown> {
  return {
    task_title: datos.titulo,
    description: datos.descripcion === '' ? null : datos.descripcion,
    priority_level: NIVELES[datos.prioridad],
    is_done: datos.completada,
    created_at: new Date().toISOString(),
  };
}

@Service()
export class ActividadesApi {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/actividades';

  listar(): Observable<Actividad[]> {
    return this.http.get<unknown>(this.base).pipe(map(aActividades));
  }

  buscar(termino: string): Observable<Actividad[]> {
    const params = new HttpParams().set('q', termino);

    return this.http.get<unknown>(this.base, { params }).pipe(map(aActividades));
  }

  crear(datos: DatosActividadRemota): Observable<Actividad | null> {
    return this.http
      .post<unknown>(this.base, aCuerpoRemoto(datos))
      .pipe(map((r) => (esActividadRemota(r) ? aActividad(r) : null)));
  }

  actualizar(id: number, datos: DatosActividadRemota): Observable<Actividad | null> {
    return this.http
      .put<unknown>(`${this.base}/${id}`, aCuerpoRemoto(datos))
      .pipe(map((r) => (esActividadRemota(r) ? aActividad(r) : null)));
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
