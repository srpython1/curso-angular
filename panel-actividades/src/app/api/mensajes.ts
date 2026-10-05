import { HttpErrorResponse } from '@angular/common/http';

export function mensajeDe(error: unknown): string {
  if (!(error instanceof HttpErrorResponse)) {
    return 'Ha ocurrido un error inesperado.';
  }

  if (error.status === 0) {
    return 'No se pudo conectar con el servidor. Comprueba que está arrancado.';
  }

  if (error.status === 404) {
    return 'Esa dirección no existe en el servidor.';
  }

  if (error.status >= 500) {
    return 'El servidor ha fallado. Vuelve a intentarlo en un momento.';
  }

  return `El servidor ha rechazado la petición (${error.status}).`;
}
