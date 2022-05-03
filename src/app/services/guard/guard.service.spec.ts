/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GuardService } from './guard.service';

describe('Service: Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardService]
    });
  });

  it('should ...', inject([GuardService], (service: GuardService) => {
    expect(service).toBeTruthy();
  }));
});
