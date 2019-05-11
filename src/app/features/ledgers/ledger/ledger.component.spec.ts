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
import { LedgerComponent } from "./ledger.component";
import { LedgerService } from "src/app/core/services/ledger.service";
import { AccountsService } from "src/app/core/services/accounts.service";

fdescribe(" ledger form component", () => {
  let component: LedgerComponent;
  let fixture: ComponentFixture<LedgerComponent>;
  let debugEl: DebugElement;

  const makeCompiledTestBed = (provider?: object): void => {
    const moduleDef: TestModuleMetadata = {
      imports: [SharedModule, RouterTestingModule],
      declarations: [LedgerComponent],
      providers: [LedgerService, AccountsService]
    };
    if (moduleDef.providers && provider) {
      moduleDef.providers.push(provider);
    }
    TestBed.configureTestingModule(moduleDef).compileComponents();
  };
  const setupTestVars = (): void => {
    fixture = TestBed.createComponent(LedgerComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  };

  describe("When id is not provided in the url param--(Ledger form)", () => {
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
    describe("Ledger form", () => {
      let err = {};
      const obj1 = {
        createLedgerForm: () => null
      };
      it("Should be created", () => {
        spyOn(obj1, "createLedgerForm");
        obj1.createLedgerForm();
        expect(obj1.createLedgerForm).toBeTruthy();
      });
      const obj = {
        initializeLedger: () => null
      };
      it("should be created for initialize ledger", () => {
        spyOn(obj, "initializeLedger");
        obj.initializeLedger();
        expect(obj.initializeLedger).toBeTruthy();
      });

      it("Should be invalid when empty", () => {
        expect(component.ledgerForm.valid).toBeFalsy();
      });
      it("Voucher id field validity", () => {
        const voucherId = component.VoucherId;
        expect(voucherId.valid).toBeFalsy();
        voucherId.setValue("appdiv");
        expect(voucherId.valid).toBeTruthy();
        err = voucherId.errors || {};
        expect(err["required"]).toBeFalsy();
        voucherId.setValue("");
        err = voucherId.errors || {};
        expect(err["required"]).toBeTruthy();
      });

      it("Description field validity", () => {
        const description = component.Description;
        expect(description.valid).toBeFalsy();
        description.setValue("appdiv");
        expect(description.valid).toBeTruthy();
        expect(description.value).toEqual("appdiv");
        err = description.errors || {};
        expect(err["required"]).toBeFalsy();
        description.setValue("");
        err = description.errors || {};
        expect(err["required"]).toBeTruthy();
      });

      it("Date field validity", () => {
        const date = component.Date;
        // expect(date.valid).toBeFalsy();
        date.setValue(new Date());
        expect(date.valid).toBeTruthy();
        expect(date.value).toEqual(new Date());
        err = date.errors || {};
        expect(err["required"]).toBeFalsy();
        date.setValue("");
        err = date.errors || {};
        expect(err["required"]).toBeTruthy();
      });
      it("Reference field validity", () => {
        const reference = component.Reference;
        expect(reference.valid).toBeTruthy();
        reference.setValue("reference");
        expect(reference.value).toEqual("reference");
      });
      it("Entry array validity", () => {
        const entries = component.Entries;
        expect(entries.valid).toBeFalsy();
        entries.setValue([
          { AccountId: "01", Credit: 2, Debit: 2 },
          { AccountId: "02", Credit: 12, Debit: 12 }
        ]);
        expect(entries.valid).toBeTruthy();
        expect(entries.length).toEqual(2);
      });

      it("Should be valid when not empty", () => {
        component.VoucherId.setValue("Appdiv");
        component.Date.setValue(new Date());
        component.Description.setValue("Appdiv");
        component.Reference.setValue("Appdiv");
        // component.Type.setValue("Appdiv");
        component.Entries.setValue([
          { AccountId: "01", Credit: 2, Debit: 2 },
          { AccountId: "02", Credit: 12, Debit: 12 }
        ]);
        expect(component.ledgerForm.valid).toBeTruthy();
      });
    });
  });
});
