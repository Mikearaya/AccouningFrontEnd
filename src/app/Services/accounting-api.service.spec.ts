import { TestBed } from "@angular/core/testing";

import { AccountingApiService } from "./accounting-api.service";
import { HttpClient } from "@angular/common/http";

describe("AccountingApiService", () => {
  let httpClient: HttpClient;
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AccountingApiService]
    })
  );

  it("should be created", () => {
    const service: AccountingApiService = new AccountingApiService(httpClient);
    expect(service).toBeTruthy();
  });
});
