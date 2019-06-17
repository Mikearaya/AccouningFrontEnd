import { TestBed } from "@angular/core/testing";

import { SystemCacheService } from "./system-cache.service";

describe("SystemCacheService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SystemCacheService = new SystemCacheService();
    expect(service).toBeTruthy();
  });
});
