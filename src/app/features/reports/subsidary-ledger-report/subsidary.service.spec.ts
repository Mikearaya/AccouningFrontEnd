import { TestBed } from "@angular/core/testing";
import { SubsidaryService } from "./subsidary.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { CoreModule } from "src/app/core/core.module";
import { RouterTestingModule } from "@angular/router/testing";
import { Checklist, SubsidaryLedgerViewMdel } from "../report";

describe("Subsidary service", () => {
  let subsidaryService: SubsidaryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule, RouterTestingModule],
      providers: [SubsidaryService]
    });

    // inject the service
    subsidaryService = TestBed.get(SubsidaryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("Should get all subsidaries successfull", () => {
    const response: SubsidaryLedgerViewMdel[] = [
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
    subsidaryService.getSubsidaryLedgerReport().subscribe((data: any) => {
      expect(data).toEqual(response);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:5000/subsidaries",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush(response);

    httpMock.verify();
  });
});
