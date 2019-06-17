import { TestBed } from "@angular/core/testing";

import { TrialBalanceDetailApiService } from "./trial-balance-detail-api.service";
import { HttpClient } from "@angular/common/http";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

describe("TrialBalanceDetailApiService", () => {
  let httpClient: HttpClient;
  let accountingApiService: AccountingApiService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TrialBalanceDetailApiService = new TrialBalanceDetailApiService(
      httpClient,
      accountingApiService
    );
    expect(service).toBeTruthy();
  });
});
