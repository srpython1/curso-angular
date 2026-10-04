import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaEstadisticas } from './pagina-estadisticas';

describe('PaginaEstadisticas', () => {
  let component: PaginaEstadisticas;
  let fixture: ComponentFixture<PaginaEstadisticas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaEstadisticas],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaEstadisticas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
