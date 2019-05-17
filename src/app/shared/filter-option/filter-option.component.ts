import { Component, OnInit, ViewChild } from "@angular/core";
import { element } from "@angular/core/src/render3";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { TouchSequence } from "selenium-webdriver";
import { FilterService } from "./filter.service";
import { LookupIndexView, YearIndexView } from "./filter";
import { valueAccessor } from "@syncfusion/ej2-grids";

@Component({
  selector: "app-filter-option",
  templateUrl: "./filter-option.component.html",
  styleUrls: ["./filter-option.component.css"]
})
export class FilterOptionComponent implements OnInit {
  @ViewChild("element") element;
  public filterForm: FormGroup;
  public lookupTypeFields: object;
  public lookupsList: object;
  public yearTypeFields: object;
  public yearList: object;

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterService
  ) {
    this.createForm();
    this.filterService.getLookups().subscribe((data: LookupIndexView[]) => {
      this.lookupsList = data;
      this.filterService.getYearList().subscribe((data: YearIndexView[]) => {
        this.yearList = data;
      });
    });
  }

  // ngAfterViewInit() {}

  ngOnInit() {
    this.lookupTypeFields = {
      text: "Name",
      value: "Id"
    };
    this.yearTypeFields = {
      text: "Year",
      value: "Id"
    };
  }

  get Year(): FormControl {
    return this.filterForm.get("Year") as FormControl;
  }

  get VoucherStartDate() {
    return this.filterForm.get("VoucherStartDate") as FormControl;
  }

  get VoucherEndDate() {
    return this.filterForm.get("VoucherEndDate") as FormControl;
  }

  get CostCenter() {
    return this.filterForm.get("CostCenter") as FormControl;
  }

  get Subsidary() {
    return this.filterForm.get("Subsidary") as FormControl;
  }

  get ControlAccount() {
    return this.filterForm.get("ControlAccount") as FormControl;
  }

  get StartDate() {
    return this.filterForm.get("StartDate") as FormControl;
  }

  get EndDate() {
    return this.filterForm.get("EndDate") as FormControl;
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      Year: [""],
      StartDate: [""],
      EndDate: [""],
      VoucherStartId: [""],
      VoucherEndId: [""],
      CostCenter: [""],
      Subsidary: [""],
      ControlAccount: [""]
    });
  }

  filter() {
    alert("filter clicked");
  }
}
