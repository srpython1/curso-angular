import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaSugerencias } from './pagina-sugerencias';

describe('PaginaSugerencias', () => {
  let component: PaginaSugerencias;
  let fixture: ComponentFixture<PaginaSugerencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaSugerencias],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaSugerencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
