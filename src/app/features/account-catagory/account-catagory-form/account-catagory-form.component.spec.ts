import {
  ComponentFixture,
  TestModuleMetadata,
  TestBed,
  async
} from "@angular/core/testing";

import { DebugElement } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";

import { RouterTestingModule } from "@angular/router/testing";

import { ActivatedRoute, convertToParamMap } from "@angular/router";

import { AccountCatagoryFormComponent } from "./account-catagory-form.component";
import { AccountCatagoryApiService } from "../../../core/account-catagory-api.service";

describe(" Account catagory form component", () => {
  let component: AccountCatagoryFormComponent;
  let fixture: ComponentFixture<AccountCatagoryFormComponent>;
  let debugEl: DebugElement;
  let activatedRoute;

  const makeCompiledTestBed = (provider?: object): void => {
    const moduleDef: TestModuleMetadata = {
      imports: [SharedModule, RouterTestingModule],
      declarations: [AccountCatagoryFormComponent],
      providers: [AccountCatagoryApiService]
    };
    if (moduleDef.providers && provider) {
      moduleDef.providers.push(provider);
    }
    TestBed.configureTestingModule(moduleDef).compileComponents();
  };
  const setupTestVars = (): void => {
    fixture = TestBed.createComponent(AccountCatagoryFormComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRoute.testParamMap = { category: "api-02" };
    activatedRoute.testQueryParamMap = { period: "2018", size: "14" };
  };

  describe("When id is not provided in the url param--(Create account catagory form)", () => {
    beforeEach(async(makeCompiledTestBed));
    beforeEach(setupTestVars);
    it("Should be created ", () => {
      expect(component).toBeTruthy();
    });

    it("should check if form have been filled out", () => {
      TestBed.get(ActivatedRoute);
      expect(component.CategoryName.valid).toBeFalsy();
    });

    describe("OnSubmit", () => {
      it("Should be called", () => {
        spyOn(component, "onSubmit");
        component.onSubmit();
        expect(component.onSubmit).toHaveBeenCalled();
      });
    });
    describe("Account catagory form", () => {
      let err = {};
      const obj1 = {
        createCatagoryForm: () => null
      };
      it("Should be created", () => {
        spyOn(obj1, "createCatagoryForm");
        obj1.createCatagoryForm();
        expect(obj1.createCatagoryForm).toBeTruthy();
      });
      const obj2 = {
        initializeCatagory: () => null
      };
      it("should be created for initialize catagory", () => {
        spyOn(obj2, "initializeCatagory");
        obj2.initializeCatagory();
        expect(obj2.initializeCatagory).toBeTruthy();
      });

      it("Should be invalid when empty", () => {
        expect(component.catagoryForm.valid).toBeFalsy();
      });
      it("Catagory name field validity", () => {
        const catagoryName = component.CategoryName;
        expect(catagoryName.valid).toBeFalsy();
        catagoryName.setValue("appdiv");
        expect(catagoryName.valid).toBeTruthy();
        err = catagoryName.errors || {};
        expect(err["required"]).toBeFalsy();
        catagoryName.setValue("");
        err = catagoryName.errors || {};
        expect(err["required"]).toBeTruthy();
      });

      it("Account type field validity", () => {
        const accountType = component.AccountType;
        expect(accountType.valid).toBeFalsy();
        accountType.setValue("appdiv");
        expect(accountType.valid).toBeTruthy();
        expect(accountType.value).toEqual("appdiv");
        err = accountType.errors || {};
        expect(err["required"]).toBeFalsy();
        accountType.setValue("");
        err = accountType.errors || {};
        expect(err["required"]).toBeTruthy();
      });

      it("Should be valid when not empty", () => {
        component.CategoryName.setValue("Appdiv");
        component.AccountType.setValue("Appdiv");
        expect(component.catagoryForm.valid).toBeTruthy();
      });
    });
  });

  describe("When an id is provided in the url param--(Update account catagory form)", () => {
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

    /*  let catagoryId = 1;
    let accountCatagory;
    accountCatagory = ActivatedRoute.snapshot.paramMap.get(catagoryId);
    it("should ..", () => {
      expect(accountCatagory).toBe(1);
    }); */
    describe("Initialize catagory", () => {
      let data: any;
      it("Should be called", () => {
        spyOn(component, "initializeCatagory");
        component.initializeCatagory(data);
        expect(component.initializeCatagory).toHaveBeenCalled();
      });
    });
  });
});
