import { of, Observable } from "rxjs";
import { AccountCatagoryApiService } from "./account-catagory-api.service";
import { AccountCatagory } from "./account-catagory-domain";

fdescribe("Account catagory api", () => {
  let accountCatagApi: AccountCatagoryApiService;
  let httpClient;
  let accountCatagories: AccountCatagory[];
  let accountCatagory: AccountCatagory;

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
      const newCatag: AccountCatagory = {
        Id: 5,
        CatagoryName: "Account 3",
        AccountType: "Capital"
      };
      httpClient.post.and.returnValue(of(newCatag));
      accountCatagApi
        .createAccountCatagory(newCatag)
        .subscribe((comp: AccountCatagory) => (accountCatagory = comp));

      expect(accountCatagory).toBe(newCatag);
    });
  });

  describe("Update account catagory", () => {
    it("Should return true on success", () => {
      httpClient.put.and.returnValue(of(true));
      let updated = false;
      const updatedComp: AccountCatagory = {
        Id: 1,
        CatagoryName: "Catag 1",
        AccountType: "Revenue"
      };
      accountCatagApi
        .updateAccountCatagory("1", updatedComp)
        .subscribe(result => (updated = result));

      expect(updated).toBe(true);
    });
  });

  // Test AccountsService Deleteaccount Function
  describe("Delete account catagory", () => {
    it("Should return true on Success", () => {
      httpClient.delete.and.returnValue(of(true));
      let deleted = false;
      accountCatagApi
        .deleteAccountCatagory("Catag 1")
        .subscribe(res => (deleted = res));

      expect(deleted).toBe(true);
    });
  });
});
