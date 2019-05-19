import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { FilterService } from "./filter.service";
import { LookupIndexView, YearIndexView } from "./filter";

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
  public filtered: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.createControls();
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

  disableAll(): void {}
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

  filter() {
    // const costCenter = this.costCenter.value;
    this.searchString = "";
    if (this.Year.value) {
      this.searchString = `year=${this.Year.value}&`;
    }

    if (this.VoucherStartId.value) {
      this.searchString += `fromVoucherId=${this.VoucherStartId.value}&`;
    }

    if (this.VoucherEndId.value) {
      this.searchString += `toVoucherId=${this.VoucherEndId.value}&`;
    }

    if (this.StartDate.value) {
      this.searchString += `startDate=${this.StartDate.value}`;
    }

    if (this.EndDate.value) {
      this.searchString += `endDate=${this.EndDate.value}&`;
    }

    if (this.CostCenter.value) {
      this.searchString += `costCenter=${this.CostCenter.value}&`;
    }

    this.filtered.emit(this.searchString);
  }
}
