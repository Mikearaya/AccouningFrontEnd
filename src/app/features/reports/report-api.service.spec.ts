import { TestBed } from '@angular/core/testing';

import { ReportApiService } from './report-api.service';

describe('ReportApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportApiService = TestBed.get(ReportApiService);
    expect(service).toBeTruthy();
  });
});
