import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AccountCatagoryApiService } from "./account-catagory-api.service";
import { AccountCategory } from "../features/account-catagory/account-catagory-domain";
import { Accounts } from "../features/accounts/accounts";

describe("Account catagories service", () => {
  let catagoryApi: AccountCatagoryApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountCatagoryApiService]
    });

    // inject the service
    catagoryApi = TestBed.get(AccountCatagoryApiService);
    httpMock = TestBed.get(HttpTestingController);
  });
  // expecting the correct(but faked) result: propery 'Name' with value 'Account1'
  it("Should get catagory successfull", () => {
    const returnedSingleCatagory: AccountCategory = {
      Id: 1,
      AccountType: "Asset",
      CatagoryName: "Catag1"
    };

    catagoryApi.getAccountCatagoryById(1).subscribe((data: any) => {
      expect(data.Id).toBe(1);
      expect(data.AccountType).toBe("Asset");
      expect(data.CatagoryName).toBe("Catag1");
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:3000/account-categories/1",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush({
      Id: 1,
      AccountType: "Asset",
      CatagoryName: "Catag1"
    });

    httpMock.verify();
  });
  it("Should get all catagories successfull", () => {
    const returnedCatagories: AccountCategory[] = [
      {
        Id: 1,
        AccountType: "Asset",
        CatagoryName: "Catag1"
      },
      {
        Id: 2,
        AccountType: "Expence",
        CatagoryName: "Catag2"
      }
    ];
    catagoryApi.getAccountCatagories().subscribe((data: any) => {
      expect(data).toEqual(returnedCatagories);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:3000/account-categories?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush([
      {
        Id: 1,
        AccountType: "Asset",
        CatagoryName: "Catag1"
      },
      {
        Id: 2,
        AccountType: "Expence",
        CatagoryName: "Catag2"
      }
    ]);

    httpMock.verify();
  });
  it("Should create catagory", () => {
    const newCatagory: AccountCategory = {
      Id: 2,
      AccountType: "Expence",
      CatagoryName: "Catag2"
    };
    catagoryApi.createAccountCatagory(newCatagory).subscribe((data: any) => {
      expect(data.Id).toBe(2);
      expect(data.AccountType).toBe("Expence");
      expect(data.CatagoryName).toBe("Catag2");
    });
    const req = httpMock.expectOne(
      "http://localhost:3000/account-categories",
      "post to api"
    );
    expect(req.request.method).toBe("POST");
    req.flush({
      Id: 2,
      AccountType: "Expence",
      CatagoryName: "Catag2"
    });
    httpMock.verify();
  });
  it("Should update catagory", () => {
    const updatedCatagory: AccountCategory = {
      Id: 2,
      AccountType: "Expence",
      CatagoryName: "Catag2"
    };
    catagoryApi
      .updateAccountCatagory(updatedCatagory.Id, updatedCatagory)
      .subscribe((data: any) => {
        expect(data.Id).toBe(2);
        expect(data.AccountType).toBe("Expence");
        expect(data.CatagoryName).toBe("Catag2");
      });
    const req = httpMock.expectOne(
      "http://localhost:3000/account-categories/2",
      "put to api"
    );
    expect(req.request.method).toBe("PUT");

    req.flush({
      Id: 2,
      AccountType: "Expence",
      CatagoryName: "Catag2"
    });

    httpMock.verify();
  });
  it("Should delete catagory", () => {
    catagoryApi.deleteAccountCatagory(2).subscribe((data: any) => {
      expect(data).toBe(2);
    });

    const req = httpMock.expectOne(
      "http://localhost:3000/account-categories/2",
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
