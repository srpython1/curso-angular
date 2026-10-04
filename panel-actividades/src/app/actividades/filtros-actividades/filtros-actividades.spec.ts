import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltrosActividades } from './filtros-actividades';

describe('FiltrosActividades', () => {
  let component: FiltrosActividades;
  let fixture: ComponentFixture<FiltrosActividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosActividades],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosActividades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
