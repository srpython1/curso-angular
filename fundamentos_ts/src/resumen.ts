import type { Actividad, ResumenActividades } from './tipos.js';

export function crearResumen(actividades: Actividad[]): ResumenActividades {
  return {
    total: actividades.length,
    pendientes: actividades.filter((actividad) => actividad.estado === 'pendiente').length,
    enProgreso: actividades.filter((actividad) => actividad.estado === 'en_progreso').length,
    completadas: actividades.filter((actividad) => actividad.estado === 'completada').length,
    titulosPrioridadAlta: actividades
      .filter((actividad) => actividad.prioridad === 'alta')
      .map((actividad) => actividad.titulo),
  };
}

export function presentarResumen(resumen: ResumenActividades): string {
  const titulos = resumen.titulosPrioridadAlta.length > 0
    ? resumen.titulosPrioridadAlta.join(', ')
    : 'ninguna';

  return [
    `Total: ${resumen.total}`,
    `Pendientes: ${resumen.pendientes}`,
    `En progreso: ${resumen.enProgreso}`,
    `Completadas: ${resumen.completadas}`,
    `Prioridad alta: ${titulos}`,
  ].join('\n');
}

