/*
 * @CreateTime: May 8, 2019 11:45 AM
 * @Author: Naol
 * @Contact: nnale8899@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 8, 2019 3:45 PM
 * @Description: Modify Here, Please
 */
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { LedgerService } from "./ledger.service";
import {
  JornalEntryViewModel,
  CreateLedgerEntry,
  UpdateLedgerEntryModel
} from "src/app/features/ledgers/ledger";

fdescribe("Ledger service", () => {
  let ledgerService: LedgerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LedgerService]
    });

    // inject the service
    ledgerService = TestBed.get(LedgerService);
    httpMock = TestBed.get(HttpTestingController);
  });
  // expecting the correct(but faked) result: propery with values
  it("Should get ledger successfull", () => {
    const returnedLedger: JornalEntryViewModel[] = [
      {
        Id: 1,
        VoucherId: "1212",
        Date: new Date(),
        Description: "description",
        Reference: "refernce",
        Posted: true,
        DateAdded: new Date(),
        DateUpdated: new Date(),
        Entries: [
          { AccountId: "0001", Credit: 0, Debit: 0 },
          { AccountId: "0002", Credit: 1, Debit: 1 }
        ]
      }
    ];
    ledgerService.getLedgerEntryById(1).subscribe((data: any) => {
      expect(data.VoucherId).toBe("1212");
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:3000/ledgers/1",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush({
      Id: 1,
      VoucherId: "1212",
      Date: new Date(),
      Description: "description",
      Reference: "refernce",
      Posted: true,
      DateAdded: new Date(),
      DateUpdated: new Date(),
      Entries: [
        { AccountId: "0001", Credit: 0, Debit: 0 },
        { AccountId: "0002", Credit: 1, Debit: 1 }
      ]
    });

    httpMock.verify();
  });
  it("Should get all ledger entries successfull", () => {
    const returnedLedgerEntries: JornalEntryViewModel[] = [
      {
        Id: 1,
        VoucherId: "1212",
        Date: new Date(),
        Description: "description",
        Reference: "refernce",
        Posted: true,
        DateAdded: new Date(),
        DateUpdated: new Date(),
        Entries: [
          { AccountId: "0001", Credit: 0, Debit: 0 },
          { AccountId: "0002", Credit: 1, Debit: 1 }
        ]
      },
      {
        Id: 2,
        VoucherId: "12",
        Date: new Date(),
        Description: "description",
        Reference: "refernce",
        Posted: true,
        DateAdded: new Date(),
        DateUpdated: new Date(),
        Entries: [
          { AccountId: "0001", Credit: 0, Debit: 0 },
          { AccountId: "0002", Credit: 1, Debit: 1 }
        ]
      }
    ];
    ledgerService.getAllLedgerEntries().subscribe((data: any) => {
      expect(data).toEqual(returnedLedgerEntries);
      console.log(data);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:3000/ledgers?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush([
      {
        Id: 1,
        VoucherId: "1212",
        Date: new Date(),
        Description: "description",
        Reference: "refernce",
        Posted: true,
        DateAdded: new Date(),
        DateUpdated: new Date(),
        Entries: [
          { AccountId: "0001", Credit: 0, Debit: 0 },
          { AccountId: "0002", Credit: 1, Debit: 1 }
        ]
      },
      {
        Id: 2,
        VoucherId: "12",
        Date: new Date(),
        Description: "description",
        Reference: "refernce",
        Posted: true,
        DateAdded: new Date(),
        DateUpdated: new Date(),
        Entries: [
          { AccountId: "0001", Credit: 0, Debit: 0 },
          { AccountId: "0002", Credit: 1, Debit: 1 }
        ]
      }
    ]);

    httpMock.verify();
  });
  it("Should create ledger", () => {
    const newLedgerEntry: CreateLedgerEntry = {
      VoucherId: "1212",
      Date: new Date(),
      Description: "description",
      Reference: "refernce",
      Posted: true,
      Entries: [
        { AccountId: "0001", Credit: 0, Debit: 0 },
        { AccountId: "0002", Credit: 1, Debit: 1 }
      ]
    };
    ledgerService.addLedgerEntry(newLedgerEntry).subscribe((data: any) => {
      expect(data.VoucherId).toBe("1212");
    });
    const req = httpMock.expectOne(
      "http://localhost:3000/ledgers",
      "post to api"
    );
    expect(req.request.method).toBe("POST");
    req.flush({
      VoucherId: "1212",
      Date: new Date(),
      Description: "description",
      Reference: "refernce",
      Posted: true,
      Entries: [
        { AccountId: "0001", Credit: 0, Debit: 0 },
        { AccountId: "0002", Credit: 1, Debit: 1 }
      ]
    });
    httpMock.verify();
  });
  it("Should update ledger", () => {
    const updatedLedger: UpdateLedgerEntryModel = {
      Id: 1,
      VoucherId: "1212",
      Date: new Date(),
      Description: "description",
      Reference: "refernce",
      Posted: true,
      Entries: [
        { Id: 1, AccountId: "0001", Credit: 0, Debit: 0 },
        { Id: 2, AccountId: "0002", Credit: 1, Debit: 1 }
      ]
    };
    ledgerService
      .updateLedgerEntry(updatedLedger.Id, updatedLedger)
      .subscribe((data: any) => {
        expect(data.VoucherId).toBe("1212");
      });
    const req = httpMock.expectOne(
      "http://localhost:3000/ledgers/1",
      "put to api"
    );
    expect(req.request.method).toBe("PUT");

    req.flush({
      Id: 1,
      VoucherId: "1212",
      Date: new Date(),
      Description: "description",
      Reference: "refernce",
      Posted: true,
      Entries: [
        { Id: 1, AccountId: "0001", Credit: 0, Debit: 0 },
        { Id: 2, AccountId: "0002", Credit: 1, Debit: 1 }
      ]
    });

    httpMock.verify();
  });
  it("Should delete account", () => {
    ledgerService.deleteLedgerEntry(1).subscribe((data: any) => {
      expect(data).toBe(1);
    });

    const req = httpMock.expectOne(
      "http://localhost:3000/ledgers/1",
      "delete to api"
    );
    expect(req.request.method).toBe("DELETE");

    req.flush(1);

    httpMock.verify();
  });
});