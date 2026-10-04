import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormField, form, maxLength, minLength, required, validate } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { ActividadesService } from '../actividades';
import { LIMITES, Prioridad } from '../../modelos/actividad';

interface DatosActividad {
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
}

const VACIO: DatosActividad = { titulo: '', descripcion: '', prioridad: 'media' };

@Component({
  selector: 'app-formulario-actividad',
  imports: [FormField, RouterLink],
  templateUrl: './formulario-actividad.html',
  styleUrl: './formulario-actividad.css',
})
export class FormularioActividad {
  private readonly servicio = inject(ActividadesService);
  private readonly router = inject(Router);

  readonly id = input<string>();

  protected readonly modelo = signal<DatosActividad>({ ...VACIO });
  protected readonly original = signal<DatosActividad>({ ...VACIO });

  protected readonly f = form(this.modelo, (campo) => {
    required(campo.titulo, { message: 'El título es obligatorio.' });

    minLength(campo.titulo, LIMITES.tituloMin, {
      message: `El título necesita al menos ${LIMITES.tituloMin} caracteres.`,
    });

    maxLength(campo.titulo, LIMITES.tituloMax, {
      message: `El título no puede pasar de ${LIMITES.tituloMax} caracteres.`,
    });

    validate(campo.titulo, ({ value }) =>
      value().length > 0 && value().trim().length === 0
        ? { kind: 'soloEspacios', message: 'El título no puede ser solo espacios.' }
        : null,
    );

    maxLength(campo.descripcion, LIMITES.descripcionMax, {
      message: `La descripción no puede pasar de ${LIMITES.descripcionMax} caracteres.`,
    });
  });

  protected readonly restantes = computed(
    () => LIMITES.descripcionMax - this.modelo().descripcion.length,
  );

  protected readonly erroresTitulo = computed(() =>
    this.f.titulo().touched() ? this.f.titulo().errors().map((e) => e.message ?? '') : [],
  );

  protected readonly erroresDescripcion = computed(() =>
    this.f.descripcion().touched() ? this.f.descripcion().errors().map((e) => e.message ?? '') : [],
  );

  protected readonly errorEnvio = signal('');

  protected readonly editando = computed(() => this.id() !== undefined);

  protected readonly titulo = computed(() =>
    this.editando() ? 'Editar actividad' : 'Nueva actividad',
  );

  protected readonly textoBoton = computed(() =>
    this.editando() ? 'Guardar cambios' : 'Crear actividad',
  );

  readonly tieneCambios = computed(() => {
    const a = this.modelo();
    const b = this.original();
    return a.titulo !== b.titulo || a.descripcion !== b.descripcion || a.prioridad !== b.prioridad;
  });

  constructor() {
    effect(() => {
      const id = this.id();

      if (id === undefined) {
        this.modelo.set({ ...VACIO });
        this.original.set({ ...VACIO });
        return;
      }

      const actividad = this.servicio.buscarPorId(Number(id));

      const datos: DatosActividad = actividad
        ? {
            titulo: actividad.titulo,
            descripcion: actividad.descripcion,
            prioridad: actividad.prioridad,
          }
        : { ...VACIO };

      this.modelo.set({ ...datos });
      this.original.set({ ...datos });
    });
  }

  protected enviar(): void {
    this.errorEnvio.set('');

    if (!this.f().valid()) {
      return;
    }

    const { titulo, descripcion, prioridad } = this.modelo();
    const id = this.id();

    if (id === undefined) {
      const creada = this.servicio.crear(titulo, descripcion, prioridad);

      if (!creada) {
        this.errorEnvio.set('Ya existe una actividad con ese título. Cambia el título y vuelve a intentarlo.');
        return;
      }

      this.original.set({ titulo, descripcion, prioridad });
      this.router.navigate(['/actividades', creada.id], { replaceUrl: true });
      return;
    }

    if (!this.servicio.actualizar(Number(id), titulo, descripcion, prioridad)) {
      this.errorEnvio.set('Ya existe otra actividad con ese título. Cambia el título y vuelve a intentarlo.');
      return;
    }

    this.original.set({ titulo, descripcion, prioridad });
    this.router.navigate(['/actividades', Number(id)], { replaceUrl: true });
  }

  protected restablecer(): void {
    this.modelo.set({ ...this.original() });
    this.errorEnvio.set('');
  }
}
