import { TestBed } from '@angular/core/testing';

import { AccountScheduleApiServiceService } from './account-schedule-api-service.service';

describe('AccountScheduleApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountScheduleApiServiceService = TestBed.get(AccountScheduleApiServiceService);
    expect(service).toBeTruthy();
  });
});
