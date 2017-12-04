/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomValidatorsService } from './custom-validators.service';

describe('CustomValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomValidatorsService]
    });
  });

  it('should ...', inject([CustomValidatorsService], (service: CustomValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
