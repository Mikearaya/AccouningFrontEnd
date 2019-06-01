import { TestBed } from '@angular/core/testing';

import { TrialBalanceDetailApiService } from './trial-balance-detail-api.service';

describe('TrialBalanceDetailApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrialBalanceDetailApiService = TestBed.get(TrialBalanceDetailApiService);
    expect(service).toBeTruthy();
  });
});
