import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { LookupService } from "./lookup.service";
import { LookupView, Lookup } from "./lookups";
import { AccountCategory } from "../account-catagory/account-catagory-domain";

fdescribe("Lookup service", () => {
  let lookupApi: LookupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LookupService]
    });

    // inject the service
    lookupApi = TestBed.get(LookupService);
    httpMock = TestBed.get(HttpTestingController);
  });
  // expecting the correct(but faked) result: propery 'Name' with value 'Account1'
  it("Should get lookup successfull", () => {
    const returnedSingleLookup: LookupView = {
      Id: 1,
      Type: "type",
      Value: "value"
    };

    lookupApi.getLookupId(1).subscribe((data: any) => {
      expect(data.Id).toBe(1);
      expect(data.Type).toBe("type");
      expect(data.Value).toBe("value");
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:3000/lookups/1",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush({
      Id: 1,
      Type: "type",
      Value: "value"
    });

    httpMock.verify();
  });
  it("Should get all lookups successfull", () => {
    const returnedLookups: LookupView[] = [
      {
        Id: 1,
        Type: "type",
        Value: "value"
      },
      {
        Id: 2,
        Type: "type",
        Value: "value"
      }
    ];
    lookupApi.getLookups().subscribe((data: any) => {
      expect(data).toEqual(returnedLookups);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:3000/lookups?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush([
      {
        Id: 1,
        Type: "type",
        Value: "value"
      },
      {
        Id: 2,
        Type: "type",
        Value: "value"
      }
    ]);

    httpMock.verify();
  });
  it("Should create lookup", () => {
    const newLookup: Lookup = {
      Id: 1,
      Type: "type",
      Value: "value"
    };
    lookupApi.createLookup(newLookup).subscribe((data: any) => {
      expect(data.Id).toBe(1);
      expect(data.Type).toBe("type");
      expect(data.Value).toBe("value");
    });
    const req = httpMock.expectOne(
      "http://localhost:3000/lookups",
      "post to api"
    );
    expect(req.request.method).toBe("POST");
    req.flush({
      Id: 1,
      Type: "type",
      Value: "value"
    });
    httpMock.verify();
  });
  it("Should update lookup", () => {
    const updatedLookup: Lookup = {
      Id: 1,
      Type: "type",
      Value: "value"
    };
    lookupApi
      .updateLookup(updatedLookup.Id, updatedLookup)
      .subscribe((data: any) => {
        expect(data.Id).toBe(1);
        expect(data.Type).toBe("type");
        expect(data.Value).toBe("value");
      });
    const req = httpMock.expectOne(
      "http://localhost:3000/lookups/1",
      "put to api"
    );
    expect(req.request.method).toBe("PUT");

    req.flush({
      Id: 1,
      Type: "type",
      Value: "value"
    });

    httpMock.verify();
  });
  it("Should delete lookups", () => {
    lookupApi.deleteLookup(2).subscribe((data: any) => {
      expect(data).toBe(2);
    });

    const req = httpMock.expectOne(
      "http://localhost:3000/lookups/2",
      "delete to api"
    );
    expect(req.request.method).toBe("DELETE");

    req.flush(2);

    httpMock.verify();
  });
});
/* import { of } from "rxjs";
import { AccountCatagoryApiService } from "./account-catagory-api.service";
import {
  AccountCategory,
  AccountCatagoryView
} from "../features/account-catagory/account-catagory-domain";

describe("Account catagory service", () => {
  let accountCatagApi: AccountCatagoryApiService;
  let httpClient;
  let accountCatagories: AccountCategory[];
  let accountCatagory: AccountCatagoryView;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj(["get", "post", "put", "delete"]);
    accountCatagApi = new AccountCatagoryApiService(httpClient);
    accountCatagories = [
      {
        Id: 1,
        CatagoryName: "Catag 1",
        AccountType: "Asset"
      },
      {
        Id: 2,
        CatagoryName: "Catag 2",
        AccountType: "Expense"
      }
    ];
  });
  describe("Check Account catagory api", () => {
    it("Should be created", () => {
      expect(accountCatagApi).toBeTruthy();
    });
  });

  describe("Get account catagories", () => {
    let catags;
    it("Should return account catagories", () => {
      spyOn(accountCatagApi, "getAccountCatagories").and.returnValue(
        of(accountCatagories)
      );
      accountCatagApi
        .getAccountCatagories()
        .subscribe(comps => (catags = comps));
      expect(catags).toBe(accountCatagories);
    });
  });

  describe("Create account catagory", () => {
    it("Should return single account catagory", () => {
      const newCatag: AccountCategory = {
        Id: 5,
        CatagoryName: "Account 3",
        AccountType: "Capital"
      };
      httpClient.post.and.returnValue(of(newCatag));
      accountCatagApi
        .createAccountCatagory(newCatag)
        .subscribe((comp: AccountCatagoryView) => (accountCatagory = comp));

      expect(accountCatagory).toBe(newCatag);
    });
  });

  describe("Update account catagory", () => {
    it("Should return true on success", () => {
      httpClient.put.and.returnValue(of(true));
      let updated;
      const updatedComp: AccountCategory = {
        Id: 1,
        CatagoryName: "Catag 1",
        AccountType: "Revenue"
      };
      accountCatagApi
        .updateAccountCatagory(1, updatedComp)
        .subscribe(result => (updated = result));

      expect(updated).toBe(true);
    });
  });

  // Test AccountsService Deleteaccount Function
   describe("Delete account catagory", () => {
    it("Should return true on Success", () => {
      // httpClient.delete.and.returnValue(of(true));
      let deleted = false;
      let id: number;
      spyOn(accountCatagApi, "deleteAccountCatagory").and.returnValue(of(true));
      accountCatagApi
        .deleteAccountCatagory(id)
        .subscribe(res => (deleted = res));

      expect(deleted).toBe(true);
    });
  }); 
}); */

/* import { LookupService } from "./lookup.service";
import { Lookup } from "./lookups";
import { of } from "rxjs";

describe("Lookup api", () => {
  let lookupApi: LookupService;
  let httpClient;
  let lookups: Lookup[];
  let lookup: Lookup;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj(["get", "post", "put", "delete"]);
    lookupApi = new LookupService(httpClient);
    lookups = [
      {
        Id: 1,
        Type: "Appdiv",
        Value: "123"
      },
      {
        Id: 2,
        Type: "appdiv",
        Value: "321"
      }
    ];
  });
  describe("Check lookup api", () => {
    it("Should be created", () => {
      expect(lookupApi).toBeTruthy();
    });
  });

  describe("Get lookups", () => {
    let lookupsValues;
    it("Should return lookup vlues", () => {
      spyOn(lookupApi, "getLookups").and.returnValue(of(lookups));
      lookupApi.getLookups().subscribe(comps => (lookupsValues = comps));
      expect(lookupsValues).toBe(lookups);
    });
  });

  describe("Create lookup", () => {
    it("Should return single lookup ", () => {
      const newLookup: Lookup = {
        Id: 5,
        Value: "123",
        Type: "Appdiv"
      };
      httpClient.post.and.returnValue(of(newLookup));
      lookupApi
        .createLookup(newLookup)
        .subscribe((comp: Lookup) => (lookup = comp));

      expect(lookup).toBe(newLookup);
    });
  });

  describe("Update lookup", () => {
    it("Should return true on success", () => {
      httpClient.put.and.returnValue(of(true));
      let updated;
      const updatedComp: Lookup = {
        Id: 1,
        Type: "Appdiv",
        Value: "123"
      };
      lookupApi
        .updateLookup(1, updatedComp)
        .subscribe(result => (updated = result));

      expect(updated).toBe(true);
    });
  });

  // Test Lookup Deleteaccount Function
  describe("Delete lookup", () => {
    it("Should return true on Success", () => {
      let deleted;
      let id: number;
      spyOn(lookupApi, "deleteLookup").and.returnValue(of(true));
      lookupApi.deleteLookup(id).subscribe(res => (deleted = res));
      expect(deleted).toBe(true);
    });
  });
});
 */
