/*
 * @CreateTime: Apr 24, 2019 5:26 PM
 * @Author: Naol
 * @Contact: nnale8899@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 6, 2019 4:50 PM
 * @Description: Modify Here, Please
 */

import { AccountFormComponent } from "./account-form.component";
import {
  ComponentFixture,
  TestBed,
  TestModuleMetadata,
  async
} from "@angular/core/testing";
import { AccountsService } from "../../../core/services/accounts.service";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { Accounts } from "../accounts";
import { ActivatedRoute, convertToParamMap } from "@angular/router";
import { DebugElement } from "@angular/core";
import { AccountCatagoryApiService } from "src/app/core/account-catagory-api.service";
import { FormBuilder } from "@angular/forms";
import { LookupService } from "src/app/core/services/lookup.service";

describe(" Account form component", () => {
  let component: AccountFormComponent;
  let fixture: ComponentFixture<AccountFormComponent>;
  let debugEl: DebugElement;

  const makeCompiledTestBed = (provider?: object): void => {
    const moduleDef: TestModuleMetadata = {
      imports: [SharedModule, RouterTestingModule],
      declarations: [AccountFormComponent],
      providers: [AccountsService, AccountCatagoryApiService, LookupService]
    };
    if (moduleDef.providers && provider) {
      moduleDef.providers.push(provider);
    }
    TestBed.configureTestingModule(moduleDef).compileComponents();
  };
  const setupTestVars = (): void => {
    fixture = TestBed.createComponent(AccountFormComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  };
  describe("When id is not provided in the url param--(Create account form)", () => {
    beforeEach(async(makeCompiledTestBed));
    beforeEach(setupTestVars);

    it("Should be created ", () => {
      expect(component).toBeTruthy();
    });

    describe("Delete account", () => {
      it("Should be called", () => {
        spyOn(component, "deleteAccount");
        component.deleteAccount();
        expect(component.deleteAccount).toHaveBeenCalled();
      });
    });

    describe("OnSubmit", () => {
      it("Should be called", () => {
        spyOn(component, "onSubmit");
        component.onSubmit();
        expect(component.onSubmit).toHaveBeenCalled();
      });
    });
    describe("Account form", () => {
      let err = {};
      const obj1 = { createForm: () => null };
      it("Should be created", () => {
        spyOn(obj1, "createForm");
        obj1.createForm();
        expect(obj1.createForm).toBeTruthy();
      });
      const obj2 = { initializeFunction: () => Accounts };
      it("should be created for initialize function", () => {
        spyOn(obj2, "initializeFunction");
        obj2.initializeFunction();
        expect(obj2.initializeFunction).toBeTruthy();
      });
      it("Should be invalid when empty", () => {
        expect(component.accountForm.valid).toBeFalsy();
      });
      it("Account name field validity", () => {
        const accountName = component.Name;
        expect(accountName.valid).toBeFalsy();
        accountName.setValue("appdiv");
        expect(accountName.valid).toBeTruthy();
        err = accountName.errors || {};
        expect(err["required"]).toBeFalsy();
        accountName.setValue("");
        err = accountName.errors || {};
        expect(err["required"]).toBeTruthy();
      });

      it("Account id field validity", () => {
        const accountId = component.AccountId;
        expect(accountId.valid).toBeFalsy();
        accountId.setValue("appd");
        expect(accountId.valid).toBeTruthy();
        expect(accountId.value).toEqual("appd");
        err = accountId.errors || {};
        expect(err["required"]).toBeFalsy();
        accountId.setValue("");
        err = accountId.errors || {};
        expect(err["required"]).toBeTruthy();
      });

      it("Account catagory field validity", () => {
        const accountCatagory = component.CatagoryId;
        expect(accountCatagory.valid).toBeTruthy();
        accountCatagory.setValue("appdiv");
        expect(accountCatagory.valid).toBeTruthy();
        expect(accountCatagory.value).toEqual("appdiv");
      });

      it("Parent account field validity", () => {
        const parentAccount = component.ParentAccount;
        expect(parentAccount.valid).toBeTruthy();
        parentAccount.setValue("Appdiv");
        expect(parentAccount.value).toEqual("Appdiv");
      });

      it("Active field validity", () => {
        const active = component.Active;
        expect(active.valid).toBeTruthy();
        active.setValue("Appdiv");
        expect(active.value).toEqual("Appdiv");
      });
      it("Opening balance field validity", () => {
        const openingBalance = component.OpeningBalance;
        expect(openingBalance.valid).toBeTruthy();
        openingBalance.setValue("Appdiv");
        expect(openingBalance.value).toEqual("Appdiv");
      });
      it("Cost center field validity", () => {
        const constCenter = component.CostCenterId;
        expect(constCenter.valid).toBeTruthy();
        constCenter.setValue("Appdiv");
        expect(constCenter.value).toEqual("Appdiv");
      });
      it("Should be valid when not empty", () => {
        component.Name.setValue("Appdiv");
        component.CatagoryId.setValue("Appdiv");
        component.AccountId.setValue("Appd");
        component.ParentAccount.setValue("Appdiv");
        component.Active.setValue(true);
        component.OpeningBalance.setValue(0);
        expect(component.accountForm.valid).toBeTruthy();
      });
    });
  });
  describe("When an id is provided in the url param", () => {
    beforeEach(async(() => {
      makeCompiledTestBed({
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: convertToParamMap({ id: 1 })
          }
        }
      });
    }));

    beforeEach(setupTestVars);
    /*   describe("Initialize function", () => {
      it("Should be called", () => {
        spyOn(component, "initializeFunction");
        component.initializeFunction;
        expect(component.initializeFunction).toHaveBeenCalled();
      });
    });  */

    it("should show selected item", () => {
      // const a = fixture.debugElement.injector.get(ActivatedRoute);
      console.log(component.accountId);
    });
  });
});
