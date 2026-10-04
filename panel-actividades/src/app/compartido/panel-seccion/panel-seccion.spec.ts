import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelSeccion } from './panel-seccion';

describe('PanelSeccion', () => {
  let component: PanelSeccion;
  let fixture: ComponentFixture<PanelSeccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelSeccion],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelSeccion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
