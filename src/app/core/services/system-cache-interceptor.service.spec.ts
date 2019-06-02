import { TestBed } from '@angular/core/testing';

import { SystemCacheInterceptorService } from './system-cache-interceptor.service';

describe('SystemCacheInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemCacheInterceptorService = TestBed.get(SystemCacheInterceptorService);
    expect(service).toBeTruthy();
  });
});
