import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { TarjetaActividad } from './tarjeta-actividad';
import { Actividad } from '../../modelos/actividad';

const ACTIVIDAD: Actividad = {
  id: 7,
  titulo: 'Revisar el contraste',
  descripcion: 'En los cuatro estados.',
  estado: 'en_progreso',
  prioridad: 'alta',
  creadaEn: '2026-08-12',
  destacada: false,
};

describe('TarjetaActividad', () => {
  async function montar(actividad: Actividad = ACTIVIDAD, seleccionada = false) {
    await TestBed.configureTestingModule({ imports: [TarjetaActividad] }).compileComponents();

    const fixture = TestBed.createComponent(TarjetaActividad);
    fixture.componentRef.setInput('actividad', actividad);
    fixture.componentRef.setInput('seleccionada', seleccionada);
    await fixture.whenStable();

    return fixture;
  }

  function boton(raiz: HTMLElement, etiqueta: string): HTMLButtonElement {
    const b = Array.from(raiz.querySelectorAll<HTMLButtonElement>('button')).find((x) =>
      (x.textContent ?? '').includes(etiqueta),
    );
    if (!b) throw new Error(`No hay botón «${etiqueta}»`);
    return b;
  }

  it('pinta el título y el estado con su etiqueta en español', async () => {
    const fixture = await montar();
    const raiz = fixture.nativeElement as HTMLElement;

    expect(raiz.querySelector('h4')?.textContent).toContain('Revisar el contraste');
    expect(raiz.querySelector('.estado')?.textContent).toContain('En progreso');
  });

  it('da a cada botón de eliminar un nombre accesible propio', async () => {
    const fixture = await montar();
    const raiz = fixture.nativeElement as HTMLElement;

    expect(boton(raiz, 'Eliminar').getAttribute('aria-label')).toBe(
      'Eliminar Revisar el contraste',
    );
  });

  it('cuenta la selección con aria-pressed y con el texto', async () => {
    const fixture = await montar(ACTIVIDAD, true);
    const raiz = fixture.nativeElement as HTMLElement;

    const seleccionar = boton(raiz, 'Quitar selección');
    expect(seleccionar.getAttribute('aria-pressed')).toBe('true');
  });

  it('deshabilita avanzar cuando la actividad está completada', async () => {
    const fixture = await montar({ ...ACTIVIDAD, estado: 'completada' });
    const raiz = fixture.nativeElement as HTMLElement;

    expect(boton(raiz, 'Avanzar estado').disabled).toBe(true);
  });

  it('emite el identificador y no cambia la actividad', async () => {
    const fixture = await montar();
    const raiz = fixture.nativeElement as HTMLElement;

    const recibidos: number[] = [];
    fixture.componentInstance.avanceSolicitado.subscribe((id) => recibidos.push(id));

    boton(raiz, 'Avanzar estado').click();
    await fixture.whenStable();

    expect(recibidos).toEqual([7]);
    expect(ACTIVIDAD.estado).toBe('en_progreso');
  });
});
