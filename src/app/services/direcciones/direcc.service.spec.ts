import { TestBed } from '@angular/core/testing';

import { DireccService } from './direcc.service';

describe('DireccService', () => {
  let service: DireccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
