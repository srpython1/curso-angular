import { HttpErrorResponse, provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ActividadesApi, aActividades, esActividadRemota } from './actividades-api';
import { mensajeDe } from './mensajes';

const REMOTA = {
  id: 1,
  task_title: 'Revisar el informe',
  description: null,
  priority_level: 3,
  is_done: false,
  created_at: '2026-08-10T09:00:00Z',
};

describe('la traducción del borde', () => {
  it('cambia los nombres del servidor por los del dominio', () => {
    expect(aActividades([REMOTA])[0]).toEqual({
      id: 1,
      titulo: 'Revisar el informe',
      descripcion: '',
      prioridad: 'alta',
      estado: 'pendiente',
      creadaEn: '2026-08-10',
      destacada: false,
    });
  });

  it('descarta lo que no tiene la forma esperada', () => {
    const sinFecha: Record<string, unknown> = { ...REMOTA };
    delete sinFecha['created_at'];

    expect(esActividadRemota(REMOTA)).toBe(true);
    expect(esActividadRemota(sinFecha)).toBe(false);
    expect(aActividades([REMOTA, sinFecha, null, 'texto'])).toHaveLength(1);
    expect(aActividades({ actividades: [] })).toEqual([]);
  });
});

describe('los mensajes de error', () => {
  it('distingue el servidor apagado de un fallo del servidor', () => {
    expect(mensajeDe(new HttpErrorResponse({ status: 0 }))).toContain('No se pudo conectar');
    expect(mensajeDe(new HttpErrorResponse({ status: 404 }))).toContain('no existe');
    expect(mensajeDe(new HttpErrorResponse({ status: 500 }))).toContain('servidor ha fallado');
    expect(mensajeDe(new Error('otra cosa'))).toContain('inesperado');
  });
});

describe('ActividadesApi', () => {
  let api: ActividadesApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch()), provideHttpClientTesting()],
    });

    api = TestBed.inject(ActividadesApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('pide la lista con un GET', () => {
    let recibidas = 0;
    api.listar().subscribe((a) => (recibidas = a.length));

    const peticion = http.expectOne('/api/actividades');
    expect(peticion.request.method).toBe('GET');

    peticion.flush([REMOTA]);
    expect(recibidas).toBe(1);
  });

  it('manda un POST con el cuerpo traducido al idioma del servidor', () => {
    api.crear({ titulo: 'Revisar', descripcion: '', prioridad: 'alta', completada: false })
      .subscribe();

    const peticion = http.expectOne('/api/actividades');

    expect(peticion.request.method).toBe('POST');
    expect(peticion.request.body).toMatchObject({
      task_title: 'Revisar',
      description: null,
      priority_level: 3,
      is_done: false,
    });

    peticion.flush(REMOTA);
  });

  it('deja pasar el error para que decida quien llamó', () => {
    let error: HttpErrorResponse | null = null;
    api.listar().subscribe({ error: (e: HttpErrorResponse) => (error = e) });

    http.expectOne('/api/actividades').flush('vaya', { status: 500, statusText: 'Server Error' });

    expect(error).not.toBeNull();
    expect(mensajeDe(error)).toContain('servidor ha fallado');
  });
});
