/*
 * @CreateTime: May 15, 2019 10:11 AM
 * @Author: Naol
 * @Contact: nnale8899@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 15, 2019 10:21 AM
 * @Description: Modify Here, Please
 */
import { ChecklistService } from "./checklist.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CoreModule } from "src/app/core/core.module";
import { RouterTestingModule } from "@angular/router/testing";
import { JornalEntryViewModel, LedgerEntry } from "../../ledgers/ledger";
import { Checklist } from "../report";

describe("Ledger service", () => {
  let checklistService: ChecklistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule, RouterTestingModule],
      providers: [ChecklistService]
    });

    // inject the service
    checklistService = TestBed.get(ChecklistService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("Should get all checklists successfull", () => {
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
    checklistService.getChecklistReport().subscribe((data: any) => {
      expect(data).toEqual(response);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:5000/checklist",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush(response);

    httpMock.verify();
  });
});
