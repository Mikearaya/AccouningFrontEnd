import { Component, OnInit, ViewChild } from "@angular/core";
import { ReportApiService } from "../report-api.service";
import { GridModel, DataStateChangeEventArgs } from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { TrialBalanceDetailViewModel } from "../report";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { PageSizes } from "src/app/page-model";
import { Subject } from "rxjs";
import { TrialBalanceDetailApiService } from "./trial-balance-detail-api.service";
import { map } from "rxjs/operators";
import { ReportFilterModel } from "src/app/shared/filter-option/filter";

@Component({
  selector: "app-trial-balance-detail",
  templateUrl: "./trial-balance-detail.component.html",
  styleUrls: ["./trial-balance-detail.component.css"]
})
export class TrialBalanceDetailComponent implements OnInit {
  public gridData: object[];
  public data: Subject<DataStateChangeEventArgs>;
  public toolbar: object;
  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: string; pageSizes: string[] };
  lastFilter: any;
  filterData: ReportFilterModel;
  stateData: DataStateChangeEventArgs;
  filterOptions: { type: string };

  constructor(
    private reportService: ReportApiService,
    private trialBalanceDetailApi: TrialBalanceDetailApiService
  ) {
    this.initialPage = {
      pageSize: this.pageSizes[0],
      pageSizes: this.pageSizes
    };

    this.filterOptions = { type: "Menu" };
    this.stateData = { skip: 0, take: 50 };
    this.filterData = new ReportFilterModel();

    this.data = this.trialBalanceDetailApi;
  }

  public childGrid: GridModel = {
    dataSource: this.data,
    queryString: "ControlAccountId",
    columns: [
      {
        field: "AccountId",
        headerText: "Account Id",
        textAlign: "Left",
        width: 120
      },
      { field: "AccountName", headerText: "AccountName", width: 150 },
      { field: "Debit", headerText: "Debit", format: "N2", width: 150 },
      { field: "Credit", headerText: "Credit", format: "N2", width: 150 }
    ],
    aggregates: [
      {
        columns: [
          {
            type: "Sum",
            field: "Debit",
            format: "N2",
            footerTemplate: "${Sum}"
          },
          {
            type: "Sum",
            field: "Credit",
            format: "N2",
            footerTemplate: "${Sum}"
          }
        ]
      }
    ]
  };

  @ViewChild("grid")
  public grid: GridComponent;

  ngOnInit() {
    this.data
      .pipe(
        map((response: any) => {
          const trialDetails = [];
          response.result.forEach(element => {
            element.Entries.forEach(elementTrial => {
              trialDetails.push(elementTrial);
            });
          });
          return trialDetails;
        })
      )
      .subscribe(e => (this.childGrid.dataSource = e));
    // this.grid.detailRowModule.expandAll();

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

    this.trialBalanceDetailApi.execute({ skip: 0, take: 50 }, this.filterData);
  }

  generateSearchString(): string {
    return `pageSize=${this.grid.pageSettings.pageSize};pageNumber=${
      this.grid.pageSettings.currentPage
    }`;
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
    this.trialBalanceDetailApi.execute(this.stateData, filterData);
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.stateData = state;
    this.trialBalanceDetailApi.execute(state, this.filterData);
  }

  onFiltered(data: any): void {
    this.lastFilter = data;
  }
}
