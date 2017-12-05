import { TestBed, inject } from '@angular/core/testing';

import { ErrorGuardService } from './error-guard.service';

describe('ErrorGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorGuardService]
    });
  });

  it('should be created', inject([ErrorGuardService], (service: ErrorGuardService) => {
    expect(service).toBeTruthy();
  }));
});
