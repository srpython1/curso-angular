import { Service } from '@angular/core';

@Service()
export class AlmacenamientoService {
  guardar(clave: string, valor: unknown): boolean {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch {
      return false;
    }
  }

  existe(clave: string): boolean {
    try {
      return localStorage.getItem(clave) !== null;
    } catch {
      return false;
    }
  }

  leer(clave: string): unknown {
    try {
      const texto = localStorage.getItem(clave);
      return texto === null ? null : JSON.parse(texto);
    } catch {
      return null;
    }
  }
}

