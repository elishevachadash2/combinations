import { TestBed } from '@angular/core/testing';

import { CombinationsService } from './combinations.service';

describe('CombinationsService', () => {
  let service: CombinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
