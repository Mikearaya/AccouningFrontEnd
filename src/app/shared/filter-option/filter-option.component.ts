import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { QueryString } from "../data-view/data-view.model";
import { ReportFilterModel } from "./filter";

@Component({
  selector: "app-filter-option",
  templateUrl: "./filter-option.component.html",
  styleUrls: ["./filter-option.component.css"]
})
export class FilterOptionComponent implements OnInit {
  public filterForm: FormGroup;
  public lookupTypeFields: object;
  public lookupsList: object;
  public yearTypeFields: object;
  public yearList: object;
  private reportQueryModel: ReportFilterModel;

  years = ["2011", "2010", "2019"];
  @Input()
  public allowVocherSearch = false;
  @Input()
  public allowDateSearch = false;
  @Input()
  public allowAccountSearch = false;
  @Input()
  public allowCostCenterSearch = false;
  @Input()
  public allwoYearSeach = false;

  public searchString = "";

  @Output()
  public filterChanged: EventEmitter<ReportFilterModel> = new EventEmitter();

  @Output()
  public filtered: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.createControls();
    this.reportQueryModel = new ReportFilterModel();
  }

  createControls(): void {
    this.filterForm = this.formBuilder.group({
      Year: "",
      StartDate: "",
      EndDate: "",
      VoucherStartId: "",
      VoucherEndId: "",
      CostCenter: "",
      ControlAccount: "",
      Subsidary: ""
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
    this.disableAll();

    if (this.allowVocherSearch) {
      this.VoucherEndId.enable();
      this.VoucherStartId.enable();
    }

    if (this.allowAccountSearch) {
      this.ControlAccount.enable();
      this.Subsidary.enable();
    }

    if (this.allwoYearSeach) {
      this.Year.enable();
    }

    if (this.allowCostCenterSearch) {
      this.CostCenter.enable();
    }

    if (this.allowDateSearch) {
      this.StartDate.enable();
      this.EndDate.enable();
    }
  }

  get Year(): FormControl {
    return this.filterForm.get("Year") as FormControl;
  }

  get VoucherStartId() {
    return this.filterForm.get("VoucherStartId") as FormControl;
  }

  get VoucherEndId() {
    return this.filterForm.get("VoucherEndId") as FormControl;
  }

  disableAll(): void {
    this.VoucherEndId.disable();
    this.VoucherStartId.disable();
    this.ControlAccount.disable();
    this.Subsidary.disable();

    this.Year.disable();
    this.CostCenter.disable();

    this.StartDate.disable();
    this.EndDate.disable();
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

  private prepareFilter(): string {
    this.searchString = "";
    this.reportQueryModel = new ReportFilterModel();
    if (this.Year.value) {
      this.searchString = `year=${this.Year.value}`;
      this.reportQueryModel.searchString = this.Year.value;
    }

    if (this.VoucherStartId.value) {
      this.searchString += `&fromVoucherId=${this.VoucherStartId.value}`;
      this.reportQueryModel.FromVoucherId = this.VoucherStartId.value;
    }

    if (this.VoucherEndId.value) {
      this.searchString += `&toVoucherId=${this.VoucherEndId.value}`;
      this.reportQueryModel.ToVoucherId = this.VoucherEndId.value;
    }

    if (this.StartDate.value) {
      this.searchString += `&startDate=${new Date(
        this.StartDate.value
      ).toUTCString()}`;

      this.reportQueryModel.StartDate = this.StartDate.value;
    }

    if (this.EndDate.value) {
      this.searchString += `&endDate=${new Date(
        this.EndDate.value
      ).toUTCString()}`;
      this.reportQueryModel.EndDate = this.EndDate.value;
    }

    if (this.ControlAccount.value) {
      this.searchString += `&controlAccountId=${this.ControlAccount.value}`;
      this.reportQueryModel.ControlAccountId = this.ControlAccount.value;
    }
    if (this.Subsidary.value) {
      this.searchString += `&subsidaryId=${this.Subsidary.value}`;
      this.reportQueryModel.SubsidaryId = this.Subsidary.value;
    }

    if (this.CostCenter.value) {
      this.searchString += `&costCenter=${this.CostCenter.value}`;
      this.reportQueryModel.CostCenter = this.CostCenter.value;
    }

    console.log("filter changed");
    console.log(this.reportQueryModel);
    this.filterChanged.emit(this.reportQueryModel);

    return this.searchString;
  }

  getFilterContent(): string {
    return this.prepareFilter();
  }
}
