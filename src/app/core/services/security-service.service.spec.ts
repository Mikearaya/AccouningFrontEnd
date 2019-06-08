import { TestBed } from '@angular/core/testing';

import { SecurityServiceService } from './security-service.service';

describe('SecurityServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurityServiceService = TestBed.get(SecurityServiceService);
    expect(service).toBeTruthy();
  });
});
