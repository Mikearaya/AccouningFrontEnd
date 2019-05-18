import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FilterOptionComponent } from "./filter-option.component";
import { DebugElement } from "@angular/core";
import { SharedModule } from "../shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { FilterService } from "./filter.service";

describe("FilterOptionComponent", () => {
  let component: FilterOptionComponent;
  let fixture: ComponentFixture<FilterOptionComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      // declarations: [FilterOptionComponent],
      providers: [FilterService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterOptionComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Filter form", () => {
    const obj = { createForm: () => null };
    it("Should be created", () => {
      spyOn(obj, "createForm");
      obj.createForm();
      expect(obj.createForm).toBeTruthy();
    });
    it("Should be valid", () => {
      expect(component.filterForm.valid).toBeTruthy();
    });
    it("Year field validity", () => {
      const year = component.Year;
      expect(year.valid).toBeTruthy();
      year.setValue("appdiv");
      expect(year.valid).toBeTruthy();
      expect(year.value).toEqual("appdiv");
    });
    it("VoucherStartId field validity", () => {
      const vsd = component.VoucherStartId;
      // expect(vsd.valid).toBeTruthy();
      vsd.setValue("appdiv");
      expect(vsd.valid).toBeTruthy();
      expect(vsd.value).toEqual("appdiv");
    });
    it("VoucherEndId field validity", () => {
      const ved = component.VoucherEndId;
      expect(ved.valid).toBeTruthy();
      ved.setValue("appdiv");
      expect(ved.valid).toBeTruthy();
      expect(ved.value).toEqual("appdiv");
    });
    it("Cost center field validity", () => {
      const costCenter = component.CostCenter;
      expect(costCenter.valid).toBeTruthy();
      costCenter.setValue("appdiv");
      expect(costCenter.valid).toBeTruthy();
      expect(costCenter.value).toEqual("appdiv");
    });
    it("Subsidary field validity", () => {
      const subsidary = component.Subsidary;
      expect(subsidary.valid).toBeTruthy();
      subsidary.setValue("appdiv");
      expect(subsidary.valid).toBeTruthy();
      expect(subsidary.value).toEqual("appdiv");
    });
    it("ControlAccount field validity", () => {
      const controlAccount = component.ControlAccount;
      expect(controlAccount.valid).toBeTruthy();
      controlAccount.setValue("appdiv");
      expect(controlAccount.valid).toBeTruthy();
      expect(controlAccount.value).toEqual("appdiv");
    });
    it("StartDate field validity", () => {
      const startDate = component.StartDate;
      startDate.setValue(new Date());
      expect(startDate.valid).toBeTruthy();
      expect(startDate.value).toEqual(new Date());
    });
    it("ControlAccount field validity", () => {
      const endDate = component.EndDate;
      endDate.setValue(new Date());
      expect(endDate.valid).toBeTruthy();
      expect(endDate.value).toEqual(new Date());
    });
    it("Should be called filter", () => {
      const obj1 = { filter: () => null };
      spyOn(obj1, "filter");
      obj1.filter();
      expect(obj1.filter).toBeTruthy();
    });
  });
});
