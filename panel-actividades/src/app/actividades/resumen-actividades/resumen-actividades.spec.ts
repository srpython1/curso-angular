import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenActividades } from './resumen-actividades';

describe('ResumenActividades', () => {
  let component: ResumenActividades;
  let fixture: ComponentFixture<ResumenActividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenActividades],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenActividades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
