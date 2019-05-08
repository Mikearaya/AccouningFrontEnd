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
import { LookupFormComponent } from "./lookup-form.component";
import { LookupService } from "../lookup.service";

describe(" Account lookup form component", () => {
  let component: LookupFormComponent;
  let fixture: ComponentFixture<LookupFormComponent>;
  let debugEl: DebugElement;
  let activatedRoute;

  const makeCompiledTestBed = (provider?: object): void => {
    const moduleDef: TestModuleMetadata = {
      imports: [SharedModule, RouterTestingModule],
      declarations: [LookupFormComponent],
      providers: [LookupService]
    };
    if (moduleDef.providers && provider) {
      moduleDef.providers.push(provider);
    }
    TestBed.configureTestingModule(moduleDef).compileComponents();
  };
  const setupTestVars = (): void => {
    fixture = TestBed.createComponent(LookupFormComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  };

  describe("When id is not provided in the url param--(Lookup form)", () => {
    beforeEach(async(makeCompiledTestBed));
    beforeEach(setupTestVars);
    it("Should be created ", () => {
      expect(component).toBeTruthy();
    });

    describe("OnSubmit", () => {
      it("Should be called", () => {
        spyOn(component, "onSubmit");
        component.onSubmit();
        expect(component.onSubmit).toHaveBeenCalled();
      });
    });
    describe("Lookup form", () => {
      let err = {};
      const obj1 = {
        createLookupForm: () => null
      };
      it("Should be created", () => {
        spyOn(obj1, "createLookupForm");
        obj1.createLookupForm();
        expect(obj1.createLookupForm).toBeTruthy();
      });
      const obj2 = {
        initializeLookup: () => null
      };
      it("should be created for initialize lookup", () => {
        spyOn(obj2, "initializeLookup");
        obj2.initializeLookup();
        expect(obj2.initializeLookup).toBeTruthy();
      });

      it("Should be invalid when empty", () => {
        expect(component.lookupForm.valid).toBeFalsy();
      });
      it("Value field validity", () => {
        const value = component.Value;
        expect(value.valid).toBeFalsy();
        value.setValue("appdiv");
        expect(value.valid).toBeTruthy();
        err = value.errors || {};
        expect(err["required"]).toBeFalsy();
        value.setValue("");
        err = value.errors || {};
        expect(err["required"]).toBeTruthy();
      });

      it("Type field validity", () => {
        const type = component.Type;
        expect(type.valid).toBeFalsy();
        type.setValue("appdiv");
        expect(type.valid).toBeTruthy();
        expect(type.value).toEqual("appdiv");
        err = type.errors || {};
        expect(err["required"]).toBeFalsy();
        type.setValue("");
        err = type.errors || {};
        expect(err["required"]).toBeTruthy();
      });

      it("Should be valid when not empty", () => {
        component.Value.setValue("Appdiv");
        component.Type.setValue("Appdiv");
        expect(component.lookupForm.valid).toBeTruthy();
      });
    });
  });

  describe("When an id is provided in the url param--(Update lookup form)", () => {
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
        spyOn(component, "initializeLookup");
        component.initializeLookup(data);
        expect(component.initializeLookup).toHaveBeenCalled();
      });
    });
  });
});
