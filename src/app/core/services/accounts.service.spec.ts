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
import { Accounts, AccountViewModel } from "../../features/accounts/accounts";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CoreModule } from "../core.module";
import { SharedModule } from "src/app/shared/shared.module";

describe("Accounts service", () => {
  let accountService: AccountsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoreModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [AccountsService]
    });

    // inject the service
    accountService = TestBed.get(AccountsService);
    httpMock = TestBed.get(HttpTestingController);
  });
  // expecting the correct(but faked) result: propery with value
  it("Should get account successfull", () => {
    const returnedAccount: AccountViewModel = {
      Id: 1,
      AccountId: "2222",
      ParentAccount: "parent account",
      AccountName: "account name",
      Active: false,
      Year: "2019",
      OpeningBalance: 1,
      ParentAccountId: 1,
      Category: "catag1",
      CategoryId: 1,
      CostCenter: "lookup",
      DateAdded: "1212",
      DateUpdated: "12121",
      CostCenterId: 11
    };
    accountService.getAccountById(1).subscribe((data: any) => {
      expect(data.AccountId).toBe("2222");
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:5000/accounts/1",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush(returnedAccount);

    httpMock.verify();
  });
  it("Should get all account successfull", () => {
    const returnedAccounts: AccountViewModel[] = [
      {
        Id: 1,
        AccountId: "2222",
        ParentAccount: "parent account",
        AccountName: "account name",
        Active: false,
        Year: "2019",
        OpeningBalance: 1,
        ParentAccountId: 1,
        Category: "catag1",
        CategoryId: 1,
        CostCenter: "lookup",
        DateAdded: "1212",
        DateUpdated: "12121",
        CostCenterId: 11
      },
      {
        Id: 2,
        AccountId: "2222",
        ParentAccount: "parent account",
        AccountName: "account name",
        Active: false,
        Year: "2019",
        OpeningBalance: 1,
        ParentAccountId: 1,
        Category: "catag1",
        CategoryId: 1,
        CostCenter: "lookup",
        DateAdded: "1212",
        DateUpdated: "12121",
        CostCenterId: 11
      }
    ];
    accountService.getAccountsList().subscribe((data: any) => {
      expect(data).toEqual(returnedAccounts);
      console.log(data);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:5000/accounts?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush(returnedAccounts);

    httpMock.verify();
  });
  it("Should create account", () => {
    const newAccount: Accounts = {
      Id: 3,
      AccountId: "3333",
      Name: "Account 3",
      OpeningBalance: 1,
      Active: false,
      CatagoryId: 1,
      ParentAccount: 3,
      CostCenterId: "12"
    };
    accountService.createAccount(newAccount).subscribe((data: any) => {
      expect(data.Id).toBe(3);
    });
    const req = httpMock.expectOne(
      "http://localhost:5000/accounts",
      "post to api"
    );
    expect(req.request.method).toBe("POST");
    req.flush(newAccount);
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
      CostCenterId: "12"
    };
    accountService
      .updateAccount(updatedAccount.Id, updatedAccount)
      .subscribe((data: any) => {
        expect(data.AccountId).toBe("2222");
      });
    const req = httpMock.expectOne(
      "http://localhost:5000/accounts/2",
      "put to api"
    );
    expect(req.request.method).toBe("PUT");

    req.flush(updatedAccount);

    httpMock.verify();
  });
  it("Should delete account", () => {
    accountService.deleteAccount(2).subscribe((data: any) => {
      expect(data).toBe(2);
    });

    const req = httpMock.expectOne(
      "http://localhost:5000/accounts/2",
      "delete to api"
    );
    expect(req.request.method).toBe("DELETE");

    req.flush(2);

    httpMock.verify();
  });
});
