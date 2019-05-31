import { TestBed } from '@angular/core/testing';

import { CheckListReportApiService } from './check-list-report-api.service';

describe('CheckListReportApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckListReportApiService = TestBed.get(CheckListReportApiService);
    expect(service).toBeTruthy();
  });
});
