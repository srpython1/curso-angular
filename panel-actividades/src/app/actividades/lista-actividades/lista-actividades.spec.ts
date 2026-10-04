import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaActividades } from './lista-actividades';

describe('ListaActividades', () => {
  let component: ListaActividades;
  let fixture: ComponentFixture<ListaActividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaActividades],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaActividades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
