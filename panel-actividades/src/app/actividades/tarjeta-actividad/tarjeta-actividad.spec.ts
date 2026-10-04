import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaActividad } from './tarjeta-actividad';

describe('TarjetaActividad', () => {
  let component: TarjetaActividad;
  let fixture: ComponentFixture<TarjetaActividad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaActividad],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaActividad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
