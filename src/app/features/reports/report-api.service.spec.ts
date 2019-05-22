import { TestBed } from "@angular/core/testing";

import { ReportApiService } from "./report-api.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { CoreModule } from "src/app/core/core.module";
import { RouterTestingModule } from "@angular/router/testing";
import {
  Checklist,
  SubsidaryLedgerViewModel,
  TrialBalanceDetailViewModel,
  ConsolidatedTrialBalanceViewModel,
  IncomeStatmentViewModel,
  BalanceSheetViewModel
} from "./report";

describe("ReportApiService", () => {
  let reportApi: ReportApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule, RouterTestingModule],
      providers: [ReportApiService]
    });

    reportApi = TestBed.get(ReportApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(reportApi).toBeTruthy();
  });

  it("Should return all checklists", () => {
    const response: Checklist[] = [
      {
        ReferenceNumber: "100",
        Date: new Date(),
        Description: "Appropration of Truck",
        Entries: [
          {
            ControlAccountId: "12",
            SubAccountId: "11",
            AccountId: "2222",
            Credit: 2,
            Debit: 2
          },
          {
            ControlAccountId: "12",
            SubAccountId: "11",
            AccountId: "2222",
            Credit: 2,
            Debit: 2
          },
          {
            ControlAccountId: "12",
            SubAccountId: "11",
            AccountId: "2222",
            Credit: 2,
            Debit: 2
          }
        ]
      },
      {
        ReferenceNumber: "101",
        Date: new Date(),
        Description: "Appropration of Truck",
        Entries: [
          {
            ControlAccountId: "12",
            SubAccountId: "11",
            AccountId: "2222",
            Credit: 2,
            Debit: 2
          },
          {
            ControlAccountId: "12",
            SubAccountId: "11",
            AccountId: "2222",
            Credit: 2,
            Debit: 2
          },
          {
            ControlAccountId: "12",
            SubAccountId: "11",
            AccountId: "2222",
            Credit: 2,
            Debit: 2
          }
        ]
      }
    ];
    reportApi.getChecklistReport("").subscribe((data: any) => {
      expect(data).toEqual(response);
    });

    const req = httpMock.expectOne(
      "http://localhost:5000/ledger-checklists?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    req.flush(response);

    httpMock.verify();
  });
  it("Should get all subsidaries", () => {
    const response: SubsidaryLedgerViewModel[] = [
      {
        AccountId: "100",
        AccountType: "acc type",
        SubAccountId: "sub acc",
        AccountName: "acc name",
        BBF: 123,
        Entries: [
          {
            ReferenceNumber: "12",
            Date: new Date(),
            VoucherId: "2222",
            Credit: 2,
            Debit: 2,
            Balance: 123
          },
          {
            ReferenceNumber: "12",
            Date: new Date(),
            VoucherId: "2222",
            Credit: 2,
            Debit: 2,
            Balance: 123
          },
          {
            ReferenceNumber: "12",
            Date: new Date(),
            VoucherId: "2222",
            Credit: 2,
            Debit: 2,
            Balance: 123
          }
        ]
      },
      {
        AccountId: "101",
        AccountType: "acc type",
        SubAccountId: "sub acc",
        AccountName: "acc name",
        BBF: 123,
        Entries: [
          {
            ReferenceNumber: "12",
            Date: new Date(),
            VoucherId: "2222",
            Credit: 2,
            Debit: 2,
            Balance: 123
          },
          {
            ReferenceNumber: "12",
            Date: new Date(),
            VoucherId: "2222",
            Credit: 2,
            Debit: 2,
            Balance: 123
          },
          {
            ReferenceNumber: "12",
            Date: new Date(),
            VoucherId: "2222",
            Credit: 2,
            Debit: 2,
            Balance: 123
          }
        ]
      }
    ];
    reportApi.getSubsidaryLedgerReport("").subscribe((data: any) => {
      expect(data).toEqual(response);
    });

    const req = httpMock.expectOne(
      "http://localhost:5000/subsidaries?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    req.flush(response);

    httpMock.verify();
  });
  it("Should get trial balance detail", () => {
    const response: TrialBalanceDetailViewModel[] = [
      {
        Id: 1,
        AccountId: "100",
        AccountName: "acc name",
        Entries: [
          {
            AccountId: "100",
            AccountName: "acc name",
            Credit: 2,
            Debit: 2
          },
          {
            AccountId: "100",
            AccountName: "acc name",
            Credit: 2,
            Debit: 2
          },
          {
            AccountId: "100",
            AccountName: "acc name",
            Credit: 2,
            Debit: 2
          }
        ]
      },
      {
        Id: 2,
        AccountId: "101",
        AccountName: "acc name",
        Entries: [
          {
            AccountId: "100",
            AccountName: "acc name",
            Credit: 2,
            Debit: 2
          },
          {
            AccountId: "100",
            AccountName: "acc name",
            Credit: 2,
            Debit: 2
          },
          {
            AccountId: "100",
            AccountName: "acc name",
            Credit: 2,
            Debit: 2
          }
        ]
      }
    ];
    reportApi.getTrialBalanceDetail("").subscribe((data: any) => {
      expect(data).toEqual(response);
    });

    const req = httpMock.expectOne(
      "http://localhost:5000/trial-balance-detail?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    req.flush(response);

    httpMock.verify();
  });

  it("Should get consolidated trial balance", () => {
    const response: ConsolidatedTrialBalanceViewModel[] = [
      {
        AccountId: "100",
        AccountName: "acc name",
        Credit: 2,
        Debit: 2
      },
      {
        AccountId: "100",
        AccountName: "acc name",
        Credit: 2,
        Debit: 2
      },
      {
        AccountId: "100",
        AccountName: "acc name",
        Credit: 2,
        Debit: 2
      },
      {
        AccountId: "101",
        AccountName: "acc name",
        Credit: 2,
        Debit: 2
      },
      {
        AccountId: "100",
        AccountName: "acc name",
        Credit: 2,
        Debit: 2
      },
      {
        AccountId: "100",
        AccountName: "acc name",
        Credit: 2,
        Debit: 2
      }
    ];

    reportApi.getConsolidatedTrialBalance("").subscribe((data: any) => {
      expect(data).toEqual(response);
    });

    const req = httpMock.expectOne(
      "http://localhost:5000/consolidated-trial-balance?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    req.flush(response);

    httpMock.verify();
  });

  it("Should get income statment", () => {
    const response: IncomeStatmentViewModel[] = [
      {
        Revenue: [
          {
            AccountType: "Net sales",
            Amount: 1000
          },
          {
            AccountType: "Other income",
            Amount: 20000
          }
        ],
        TotalRevenue: 100,
        Expense: [
          {
            AccountType: "Maintainance",
            Amount: 1000
          },
          {
            AccountType: "Water",
            Amount: 20000
          }
        ],
        TotalExpense: 200,
        NetSurplus: 19099
      }
    ];
    reportApi.getIncomeStatment("").subscribe((data: any) => {
      expect(data).toEqual(response);
    });

    const req = httpMock.expectOne(
      "http://localhost:5000/income-statment?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    req.flush(response);

    httpMock.verify();
  });

  it("Should get balance sheet", () => {
    const response: BalanceSheetViewModel[] = [
      {
        Assets: [
          {
            AccountCatagory: "Fixed assets",
            Amount: 1000
          },
          {
            AccountCatagory: "Stock",
            Amount: 20000
          }
        ],
        TotalAsset: 21000,
        Capitals: [
          {
            AccountCatagory: "Share capital",
            Amount: 1000
          },
          {
            AccountCatagory: "Net capital",
            Amount: 20000
          }
        ],
        TotalCapital: 21000,
        Liabilities: [
          {
            AccountCatagory: "Bank overdraft",
            Amount: 200
          },
          {
            AccountCatagory: "Devidend payable",
            Amount: 300
          }
        ],
        TotalLiability: 500
      }
    ];
    reportApi.getBalanceSheet("").subscribe((data: any) => {
      expect(data).toEqual(response);
    });

    const req = httpMock.expectOne(
      "http://localhost:5000/balance-sheet?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    req.flush(response);

    httpMock.verify();
  });
});
