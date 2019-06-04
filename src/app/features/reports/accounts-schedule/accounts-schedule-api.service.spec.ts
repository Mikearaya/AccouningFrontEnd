import { TestBed } from '@angular/core/testing';

import { AccountsScheduleApiService } from './accounts-schedule-api.service';

describe('AccountsScheduleApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountsScheduleApiService = TestBed.get(AccountsScheduleApiService);
    expect(service).toBeTruthy();
  });
});
