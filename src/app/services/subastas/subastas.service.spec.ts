import { TestBed } from '@angular/core/testing';

import { SubastasService } from './subastas.service';

describe('SubastasService', () => {
  let service: SubastasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubastasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
