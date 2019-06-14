import { TestBed, async, inject } from "@angular/core/testing";

import { AuthGuardGuard } from "./auth-guard.guard";
import { Router } from "@angular/router";
import { SecurityService } from "./security-service.service";

describe("AuthGuardGuard", () => {
  let router: Router;
  let guard: AuthGuardGuard;
  let securityService: SecurityService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardGuard]
    });
  });

  it("should be created", () => {
    guard = new AuthGuardGuard(securityService, router);
    expect(guard).toBeTruthy();
  });
});
