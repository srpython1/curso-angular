import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { routes } from './app.routes';

const REMOTAS = [
  { id: 1, task_title: 'Revisar el informe', description: null, priority_level: 3, is_done: false, created_at: '2026-08-10T09:00:00Z' },
  { id: 2, task_title: 'Preparar la reunión', description: 'Con el equipo.', priority_level: 2, is_done: false, created_at: '2026-08-12T09:00:00Z' },
  { id: 3, task_title: 'Llamar al proveedor', description: null, priority_level: 1, is_done: true, created_at: '2026-08-14T09:00:00Z' },
];

describe('las direcciones', () => {
  let arnes: RouterTestingHarness;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        provideRouter(routes, withComponentInputBinding()),
      ],
    });

    http = TestBed.inject(HttpTestingController);
    arnes = await RouterTestingHarness.create();
  });

  function texto(): string {
    return (arnes.routeNativeElement as HTMLElement).textContent ?? '';
  }

  function servir(): void {
    http.match('/api/actividades').forEach((p) => p.flush(REMOTAS));
  }

  it('lleva la raíz a la lista', async () => {
    await arnes.navigateByUrl('/');
    servir();

    expect(TestBed.inject(Router).url).toBe('/actividades');
  });

  it('abre el detalle de una actividad por su identificador', async () => {
    await arnes.navigateByUrl('/actividades/2');
    servir();
    arnes.fixture.detectChanges();

    expect(texto()).toContain('Preparar la reunión');
  });

  it('distingue una actividad que ya no existe de una dirección inválida', async () => {
    await arnes.navigateByUrl('/actividades/9999');
    servir();
    arnes.fixture.detectChanges();
    expect(texto()).toContain('ya no existe');

    await arnes.navigateByUrl('/actividades/abc');
    arnes.fixture.detectChanges();
    expect(texto()).toContain('no es válida');
  });

  it('contesta a una dirección inventada con la página de no encontrada', async () => {
    await arnes.navigateByUrl('/lo-que-sea');
    arnes.fixture.detectChanges();

    expect(texto()).toContain('Esa página no existe');
  });

  it('no confunde la ruta reservada con un identificador', async () => {
    await arnes.navigateByUrl('/actividades/nueva');
    servir();
    arnes.fixture.detectChanges();

    expect(texto()).toContain('Nueva actividad');
    expect(texto()).not.toContain('no es válida');
  });
});
