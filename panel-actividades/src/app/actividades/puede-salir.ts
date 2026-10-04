import { CanDeactivateFn } from '@angular/router';
import { FormularioActividad } from './formulario-actividad/formulario-actividad';

export const puedeSalir: CanDeactivateFn<FormularioActividad> = (componente) =>
  !componente.tieneCambios() ||
  confirm('Tienes cambios sin guardar. ¿Quieres salir igualmente?');
  