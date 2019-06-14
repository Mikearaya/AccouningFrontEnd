import { TestBed } from "@angular/core/testing";

import { AccountsScheduleApiService } from "./accounts-schedule-api.service";
import { HttpClient } from "@angular/common/http";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

describe("AccountsScheduleApiService", () => {
  let httpClient: HttpClient;
  let accountingApiService: AccountingApiService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AccountsScheduleApiService = new AccountsScheduleApiService(
      httpClient,
      accountingApiService
    );
    expect(service).toBeTruthy();
  });
});
