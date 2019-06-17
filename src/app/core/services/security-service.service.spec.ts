import { TestBed } from "@angular/core/testing";
import { SecurityService } from "./security-service.service";

describe("SecurityServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SecurityService = TestBed.get(SecurityService);
    expect(service).toBeTruthy();
  });
});
