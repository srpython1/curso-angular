import { inject, Service } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Service()
export class TituloConSufijo extends TitleStrategy {
  private readonly titulo = inject(Title);

  override updateTitle(estado: RouterStateSnapshot): void {
    const propio = this.buildTitle(estado);

    this.titulo.setTitle(propio ? `${propio} · Panel de actividades` : 'Panel de actividades');
  }
}
