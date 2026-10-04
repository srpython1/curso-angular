import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import type { Actividad } from '../../modelos/actividad';

@Component({
  selector: 'app-lista-actividades',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './lista-actividades.html',
  styleUrl: './lista-actividades.css',
})
export class ListaActividades {
  protected readonly actividades: Actividad[] = [
    { id: 1, titulo: 'Preparar estructura HTML', estado: 'completada', prioridad: 'alta', creadaEn: '2026-08-10' },
    { id: 2, titulo: 'Revisar contraste', estado: 'en_progreso', prioridad: 'media', creadaEn: '2026-08-12' },
    { id: 3, titulo: 'Practicar TypeScript', estado: 'pendiente', prioridad: 'alta', creadaEn: '2026-08-14' },
  ];
}
