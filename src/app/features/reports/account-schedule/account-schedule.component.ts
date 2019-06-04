import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from "rxjs";
import {
  DataStateChangeEventArgs,
  GroupSettingsModel
} from "@syncfusion/ej2-grids";
import { PageSizes } from "src/app/page-model";
import { ReportFilterModel } from "src/app/shared/filter-option/filter";
import { AccountScheduleApiServiceService } from "./account-schedule-api-service.service";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { GridComponent } from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "app-account-schedule",
  templateUrl: "./account-schedule.component.html",
  styleUrls: ["./account-schedule.component.css"]
})
export class AccountScheduleComponent implements OnInit {
  @ViewChild("grid")
  public grid: GridComponent;

  public gridData: object[];
  public data: Subject<DataStateChangeEventArgs>;

  public toolbar: object;
  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: string; pageSizes: string[] };
  lastFilter: string;
  stateData: DataStateChangeEventArgs;
  filterData: ReportFilterModel;
  filterOptions: { type: string };
  public groupOptions: GroupSettingsModel = { showDropArea: false };

  constructor(
    private accountScheduleService: AccountScheduleApiServiceService
  ) {
    this.initialPage = {
      pageSize: this.pageSizes[0],
      pageSizes: this.pageSizes
    };
    this.groupOptions = {
      disablePageWiseAggregates: false,
      showDropArea: false,
      columns: ["ControlAccountId"]
    };
  }

  ngOnInit() {
    this.toolbar = [
      { text: "Expand All", prefixIcon: "e-expand", id: "expandall" },
      {
        text: "Collapse All",
        prefixIcon: "e-collapse",
        id: "collapseall"
      },
      { text: "Print", prefixIcon: "e-print", id: "print" },
      {
        text: "ExcelExport",
        prefixIcon: "e-Excel_Export",
        id: "Grid_excelexport"
      }
    ];
  }

  clickHandler(args: ClickEventArgs): void {
    // var c = confirm("expand all entries or print as is");
    if (args.item.id === "expandall") {
      this.grid.detailRowModule.expandAll();
    }

    if (args.item.id === "collapseall") {
      this.grid.detailRowModule.collapseAll();
    }
    if (args.item.id === "print") {
      this.grid.detailRowModule.expandAll();
      setTimeout(() => {
        window.print();
      }, 400);
    }
    if (args.item.id === "Grid_excelexport") {
      this.grid.detailRowModule.expandAll();
      setTimeout(() => {
        this.grid.excelExport();
      }, 400);
    }
  }

  onFilterStateChange(filterData: ReportFilterModel): void {
    this.filterData = filterData;
    this.accountScheduleService.execute(this.stateData, filterData);
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.stateData = state;
    this.accountScheduleService.execute(state, this.filterData);
  }
}
