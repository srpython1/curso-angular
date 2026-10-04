import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioActividad } from './formulario-actividad';

describe('FormularioActividad', () => {
  let component: FormularioActividad;
  let fixture: ComponentFixture<FormularioActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioActividad],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
