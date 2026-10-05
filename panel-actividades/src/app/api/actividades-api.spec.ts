import { TestBed } from '@angular/core/testing';
import { ActividadesApi } from './actividades-api';

describe('ActividadesApi', () => {
  let service: ActividadesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
