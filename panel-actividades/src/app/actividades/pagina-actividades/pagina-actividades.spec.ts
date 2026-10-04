import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaActividades } from './pagina-actividades';

describe('PaginaActividades', () => {
  let component: PaginaActividades;
  let fixture: ComponentFixture<PaginaActividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaActividades],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaActividades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
