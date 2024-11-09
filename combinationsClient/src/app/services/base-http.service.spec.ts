import { TestBed } from '@angular/core/testing';

import { BaseBaseHTTPService } from './base-http.service';

describe('BaseBaseHTTPService', () => {
  let service: BaseBaseHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseBaseHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
