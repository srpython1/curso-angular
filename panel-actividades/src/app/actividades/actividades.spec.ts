import { TestBed } from '@angular/core/testing';
import { Actividades } from './actividades';

describe('Actividades', () => {
  let service: Actividades;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Actividades);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
