import { TestBed } from '@angular/core/testing';

import { TokenSesionService } from './token-sesion.service';

describe('TokenSesionService', () => {
  let service: TokenSesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenSesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
