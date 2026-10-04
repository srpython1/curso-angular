import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableroPrioridades } from './tablero-prioridades';

describe('TableroPrioridades', () => {
  let component: TableroPrioridades;
  let fixture: ComponentFixture<TableroPrioridades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroPrioridades],
    }).compileComponents();

    fixture = TestBed.createComponent(TableroPrioridades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

