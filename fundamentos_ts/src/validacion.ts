import type { Actividad, EstadoActividad, Prioridad } from './tipos.js';

const estados: EstadoActividad[] = ['pendiente', 'en_progreso', 'completada'];
const prioridades: Prioridad[] = ['baja', 'media', 'alta'];

export function esActividad(valor: unknown): valor is Actividad {
  if (typeof valor !== 'object' || valor === null) {
    return false;
  }

  const candidato = valor as Record<string, unknown>;

  return (
    typeof candidato['id'] === 'number' &&
    typeof candidato['titulo'] === 'string' &&
    typeof candidato['estado'] === 'string' &&
    estados.includes(candidato['estado'] as EstadoActividad) &&
    typeof candidato['prioridad'] === 'string' &&
    prioridades.includes(candidato['prioridad'] as Prioridad)
  );
}

export function leerActividadesJson(texto: string): Actividad[] {
  const valor: unknown = JSON.parse(texto);

  if (!Array.isArray(valor) || !valor.every(esActividad)) {
    throw new Error('El JSON no contiene una lista válida de actividades.');
  }

  return valor;
}
