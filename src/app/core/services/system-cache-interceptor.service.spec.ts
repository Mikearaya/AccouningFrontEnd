import { TestBed } from "@angular/core/testing";

import { SystemCacheInterceptorService } from "./system-cache-interceptor.service";
import { SystemCacheService } from "./system-cache.service";

describe("SystemCacheInterceptorService", () => {
  let sysCacheService: SystemCacheService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SystemCacheInterceptorService = new SystemCacheInterceptorService(
      sysCacheService
    );
    expect(service).toBeTruthy();
  });
});
