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
import { AccountsService } from "./accounts.service";
import { Accounts } from "../../features/accounts/accounts";
import { TestBed } from "@angular/core/testing";

describe("Accounts service", () => {
  let accountService: AccountsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountsService]
    });

    // inject the service
    accountService = TestBed.get(AccountsService);
    httpMock = TestBed.get(HttpTestingController);
  });
  // expecting the correct(but faked) result: propery 'Name' with value 'Account1'
  it("Should get account successfull", () => {
    accountService.getAccountById(1).subscribe((data: any) => {
      expect(data.Name).toBe("Appdiv");
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:3000/accounts/1",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush({
      Name: "Appdiv"
    });

    httpMock.verify();
  });
  it("Should get all account successfull", () => {
    const returnedAccounts: Accounts[] = [
      {
        Id: 1,
        AccountId: "1111",
        Name: "Account 1",
        OpeningBalance: 1,
        Active: false,
        CatagoryId: 1,
        ParentAccount: 3,
        CostCenter: "lookup"
      },
      {
        Id: 2,
        AccountId: "2222",
        Name: "Account 2",
        OpeningBalance: 1,
        Active: false,
        CatagoryId: 1,
        ParentAccount: 3,
        CostCenter: "lookup"
      }
    ];
    accountService.getAccountsList().subscribe((data: any) => {
      expect(data).toEqual(returnedAccounts);
      console.log(data);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:3000/accounts?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush([
      {
        Id: 1,
        AccountId: "1111",
        Name: "Account 1",
        OpeningBalance: 1,
        Active: false,
        CatagoryId: 1,
        ParentAccount: 3,
        CostCenter: "lookup"
      },
      {
        Id: 2,
        AccountId: "2222",
        Name: "Account 2",
        OpeningBalance: 1,
        Active: false,
        CatagoryId: 1,
        ParentAccount: 3,
        CostCenter: "lookup"
      }
    ]);

    httpMock.verify();
  });
  it("Should create account", () => {
    const newAccount: Accounts = {
      Id: 2,
      AccountId: "2222",
      Name: "Account 2",
      OpeningBalance: 1,
      Active: false,
      CatagoryId: 1,
      ParentAccount: 3,
      CostCenter: "lookup"
    };
    accountService.createAccount(newAccount).subscribe((data: any) => {
      expect(data.Id).toBe(2);
    });
    const req = httpMock.expectOne(
      "http://localhost:3000/accounts",
      "post to api"
    );
    expect(req.request.method).toBe("POST");
    req.flush({
      Id: 2,
      AccountId: "2222",
      Name: "Account 2",
      OpeningBalance: 1,
      Active: false,
      CatagoryId: 1,
      ParentAccount: 3,
      CostCenter: "lookup"
    });
    httpMock.verify();
  });
  it("Should update account", () => {
    const updatedAccount: Accounts = {
      Id: 2,
      AccountId: "2222",
      Name: "Account 2",
      OpeningBalance: 1,
      Active: false,
      CatagoryId: 1,
      ParentAccount: 3,
      CostCenter: "lookup"
    };
    accountService
      .updateAccount(updatedAccount.Id, updatedAccount)
      .subscribe((data: any) => {
        expect(data.AccountId).toBe("2222");
      });
    const req = httpMock.expectOne(
      "http://localhost:3000/accounts/2",
      "put to api"
    );
    expect(req.request.method).toBe("PUT");

    req.flush({
      Id: 2,
      AccountId: "2222",
      Name: "Account 2",
      OpeningBalance: 1,
      Active: false,
      CatagoryId: 1,
      ParentAccount: 3,
      CostCenter: "lookup"
    });

    httpMock.verify();
  });
  it("Should delete account", () => {
    accountService.deleteAccount(2).subscribe((data: any) => {
      expect(data).toBe(2);
    });

    const req = httpMock.expectOne(
      "http://localhost:3000/accounts/2",
      "delete to api"
    );
    expect(req.request.method).toBe("DELETE");

    req.flush(2);

    httpMock.verify();
  });
});
/* fdescribe("AccountsService", () => {
  let accountsService: AccountsService;
  let httpClient;
  let accountView: AccountViewModel;
  let accounts: Accounts[];
  let returnedCompanies: Accounts[];
  let returned: Accounts;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj(["get", "post", "put", "delete"]);
    accountsService = new AccountsService(httpClient);
    accounts = [
      {
        Id: 2,
        AccountId: "1221",
        Name: "Account 2",
        OpeningBalance: 1,
        Active: false,
        ParentAccount: 3,
        CatagoryId: 1,
        CostCenter: "lookup"
      },
      {
        Id: 2,
        AccountId: "1212",
        Name: "Account 2",
        OpeningBalance: 1,
        Active: false,
        CatagoryId: 1,
        ParentAccount: 3,
        CostCenter: "lookup"
      }
    ];
    accountView = {
      Id: 2,
      AccountId: "2121",
      Name: "Account 2",
      OpeningBalance: 1,
      Active: false,
      Category: "catag1",
      CategoryId: 1,
      ParentAccount: "3",
      CostCenter: "lookup",
      Year: "string",
      DateAdded: "string",
      DateUpdated: "string"
    };
  });
  describe("Check AccountsService", () => {
    it("Should be created", () => {
      expect(accountsService).toBeTruthy();
    });
  });

  // Tests AccountsService GetaccountById Function
  describe("GetaccountById", () => {
    it("Should Return single account", () => {
      let result: AccountViewModel;
      spyOn(accountsService, "getAccountById").and.returnValue(of(accountView));
      accountsService.getAccountById(1).subscribe(com => (result = com));
      console.log(result);
      expect(result).toBe(accountView);
    });
  });

  // tests account Service GetAllCompanies Function
  describe("GetAllaccount", () => {
    it("Should Return array of Accounts", () => {
      let returnedCompanies;
      spyOn(accountsService, "getAccountsList").and.returnValue(of(accounts));
      accountsService
        .getAccountsList()
        .subscribe(comps => (returnedCompanies = comps));
      expect(returnedCompanies).toBe(accounts);
    });
  });

  // Test AccountsService Create account Function
  describe("Createaccount", () => {
    it("Should Return A Single account", () => {
      const newComp: Accounts = {
        Id: 2,
        AccountId: "2222",
        Name: "Account 2",
        OpeningBalance: 1,
        Active: false,
        CatagoryId: 1,
        ParentAccount: 3,
        CostCenter: "lookup"
      };
      httpClient.post.and.returnValue(of(newComp));
      accountsService
        .createAccount(newComp)
        .subscribe((comp: Accounts) => (returned = comp));

      expect(returned).toBe(newComp);
    });
  });

  // test account service Update  Function
  describe("Updateaccount", () => {
    it("Should Return True on Success", () => {
      httpClient.put.and.returnValue(of(true));
      let updated;
      const updatedComp: Accounts = {
        Id: 2,
        AccountId: "1111",
        Name: "Account 2",
        OpeningBalance: 1,
        Active: false,
        CatagoryId: 1,
        ParentAccount: 3,
        CostCenter: "lookup"
      };

      accountsService.updateAccount(1, updatedComp).subscribe();
      updated = updatedComp;

      expect(updated).toBeTruthy();
    });
  });

  // Test AccountsService Deleteaccount Function
  describe("Deleteaccount", () => {
    it("Should Return True on Success", () => {
      httpClient.delete.and.returnValue(of(true));
      const deleted = false;
      accountsService.deleteAccount(1).subscribe();

      expect(deleted).toBe(true);
    });
  });
});
 */
