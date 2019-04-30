import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AccountsService } from "./accounts.service";
import { of, Observable } from "rxjs";
import { Accounts } from "./accounts";
import { getTypeNameForDebugging } from "@angular/common/src/directives/ng_for_of";

describe("AccountsService", () => {
  let accountsService: AccountsService;
  let httpClient;
  let account: Accounts;
  let accounts: Accounts[];
  let returnedCompanies: Accounts[];
  let returned: Accounts;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj(["get", "post", "put", "delete"]);
    accountsService = new AccountsService(httpClient);
    accounts = [
      {
        Id: "1",
        AccountName: "Account 1",
        OrganizationId: 0,
        OpeningBalance: 0,
        PostingType: "posting type",
        Active: true,
        IsReconciliation: false,
        IsPosting: true,
        glType: "string",
        AccountType: "Account Type",
        ParentAccount: "3"
      },
      {
        Id: "2",
        AccountName: "Account 2",
        OrganizationId: 1,
        OpeningBalance: 1,
        PostingType: "posting type",
        Active: false,
        IsReconciliation: true,
        IsPosting: true,
        glType: "string",
        AccountType: "Account Type",
        ParentAccount: ""
      }
    ];
    account = {
      Id: "1",
      AccountName: "Account 1",
      OrganizationId: 0,
      OpeningBalance: 0,
      PostingType: "posting type",
      Active: true,
      IsReconciliation: false,
      IsPosting: true,
      glType: "string",
      AccountType: "Account Type",
      ParentAccount: "3"
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
      let result: Accounts;
      spyOn(accountsService, "getAccountById").and.returnValue(of(account));
      accountsService.getAccountById("1").subscribe(com => (result = com));
      console.log(result);
      expect(result).toBe(account);
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
        Id: "5",
        AccountName: "Account 3",
        OrganizationId: 0,
        OpeningBalance: 0,
        Active: true,
        IsReconciliation: false,
        IsPosting: true,
        glType: "string",
        PostingType: "posting type",
        AccountType: "Account Type",
        ParentAccount: "Parent Account"
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
      let updated = false;
      const updatedComp: Accounts = {
        AccountName: "AppDiv",
        OrganizationId: 1,
        Id: "3",
        AccountType: "Account type",
        OpeningBalance: 100,
        ParentAccount: "parent account",
        IsPosting: true,
        IsReconciliation: true,
        glType: "Purchase",
        PostingType: "posting type",
        Active: true
      };

      accountsService
        .updateAccount("1", updatedComp)
        .subscribe(result => (updated = result));

      expect(updated).toBe(true);
    });
  });

  // Test AccountsService Deleteaccount Function
  describe("Deleteaccount", () => {
    it("Should Return True on Success", () => {
      httpClient.delete.and.returnValue(of(true));
      let deleted = false;
      accountsService.deleteAccount("ACC-1").subscribe(res => (deleted = res));

      expect(deleted).toBe(true);
    });
  });
});
