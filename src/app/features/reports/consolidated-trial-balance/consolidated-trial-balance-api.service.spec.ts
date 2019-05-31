import { TestBed } from '@angular/core/testing';

import { ConsolidatedTrialBalanceApiService } from './consolidated-trial-balance-api.service';

describe('ConsolidatedTrialBalanceApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsolidatedTrialBalanceApiService = TestBed.get(ConsolidatedTrialBalanceApiService);
    expect(service).toBeTruthy();
  });
});
