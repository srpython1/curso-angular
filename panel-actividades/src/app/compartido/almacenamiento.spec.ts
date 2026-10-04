import { TestBed } from '@angular/core/testing';
import { Almacenamiento } from './almacenamiento';

describe('Almacenamiento', () => {
  let service: Almacenamiento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Almacenamiento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
