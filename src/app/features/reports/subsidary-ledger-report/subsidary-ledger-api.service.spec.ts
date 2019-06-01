import { TestBed } from '@angular/core/testing';

import { SubsidaryLedgerApiService } from './subsidary-ledger-api.service';

describe('SubsidaryLedgerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubsidaryLedgerApiService = TestBed.get(SubsidaryLedgerApiService);
    expect(service).toBeTruthy();
  });
});
