import { Component, OnInit, ViewChild } from "@angular/core";
import { ReportApiService } from "../report-api.service";
import { ConsolidatedTrialBalanceViewModel } from "../report";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import {
  GridComponent,
  DataStateChangeEventArgs
} from "@syncfusion/ej2-angular-grids";
import { ConsolidatedTrialBalanceApiService } from "./consolidated-trial-balance-api.service";
import { Subject } from "rxjs";
import { ReportFilterModel } from "src/app/shared/filter-option/filter";

@Component({
  selector: "app-consolidated-trial-balance",
  templateUrl: "./consolidated-trial-balance.component.html",
  styleUrls: ["./consolidated-trial-balance.component.css"]
})
export class ConsolidatedTrialBalanceComponent implements OnInit {
  public data: Subject<DataStateChangeEventArgs>;
  public initialPage: object;
  public toolbar: object;
  lastFilter: string;
  public filterData: ReportFilterModel;
  public stateData: DataStateChangeEventArgs;
  filterOptions: { type: string };

  constructor(
    private consolidatedTrialApi: ConsolidatedTrialBalanceApiService
  ) {
    this.initialPage = {
      pageSizes: ["20", "50", "100", "200", "500", "1000", "All"],
      pageSize: 20
    };
    this.filterOptions = { type: "Menu" };
    this.filterData = new ReportFilterModel();

    this.data = this.consolidatedTrialApi;
  }
  @ViewChild("grid")
  public grid: GridComponent;
  ngOnInit() {
    this.toolbar = [
      { text: "Print", prefixIcon: "e-print", id: "print" },
      {
        text: "ExcelExport",
        prefixIcon: "e-Excel_Export",
        id: "Grid_excelexport"
      }
    ];

    this.consolidatedTrialApi.execute({ skip: 0, take: 50 }, this.filterData);
  }

  onFilterStateChange(filterData: ReportFilterModel): void {
    this.filterData = filterData;
    this.consolidatedTrialApi.execute(this.stateData, filterData);
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.stateData = state;
    this.consolidatedTrialApi.execute(state, this.filterData);
  }

  generateSearchString(): string {
    return `pageSize=${this.grid.pageSettings.pageSize};pageNumber=${
      this.grid.pageSettings.currentPage
    }`;
  }
  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === "print") {
      window.print();
    }
    if (args.item.id === "Grid_excelexport") {
      this.grid.excelExport();
    }
  }
}
