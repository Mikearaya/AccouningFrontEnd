import { TestBed } from '@angular/core/testing';

import { AccountingApiService } from './accounting-api.service';

describe('AccountingApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountingApiService = TestBed.get(AccountingApiService);
    expect(service).toBeTruthy();
  });
});
