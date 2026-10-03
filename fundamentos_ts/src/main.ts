import { actividades } from './datos.js';
import { GestorActividades } from './gestor.js';
import { crearResumen, presentarResumen } from './resumen.js';
import { leerActividadesJson } from './validacion.js';

async function cargarActividades(): Promise<string> {
  return Promise.resolve(JSON.stringify(actividades));
}

async function iniciar(): Promise<void> {
  try {
    const texto = await cargarActividades();
    const actividadesLeidas = leerActividadesJson(texto);
    const gestor = new GestorActividades(actividadesLeidas);
    const actualizadas = gestor.completar(3);

    console.log(presentarResumen(crearResumen(actualizadas)));
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error desconocido';
    console.error(`No fue posible crear el resumen: ${mensaje}`);
  }
}

void iniciar();
