import { Component, OnInit, ViewChild } from "@angular/core";
import { SubsidaryLedgerViewModel } from "../report";
import {
  GridModel,
  DataStateChangeEventArgs,
  GroupSettingsModel
} from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ReportApiService } from "../report-api.service";
import { PageSizes } from "src/app/page-model";
import { Subject } from "rxjs";
import { ReportFilterModel } from "src/app/shared/filter-option/filter";
import { SubsidaryLedgerApiService } from "./subsidary-ledger-api.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-subsidary-ledger-report",
  templateUrl: "./subsidary-ledger-report.component.html",
  styleUrls: ["./subsidary-ledger-report.component.css"]
})
export class SubsidaryLedgerReportComponent implements OnInit {
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
  constructor(private subsidaryService: SubsidaryLedgerApiService) {
    this.initialPage = {
      pageSize: this.pageSizes[0],
      pageSizes: this.pageSizes
    };
    this.groupOptions = {
      disablePageWiseAggregates: false,
      showDropArea: false,
      columns: ["AccountId"]
    };
    this.filterOptions = { type: "Menu" };
    this.stateData = { skip: 0, take: 50 };
    this.filterData = new ReportFilterModel();

    this.data = this.subsidaryService;
  }
  public childGrid: GridModel = {
    dataSource: this.data,
    queryString: "Id",
    columns: [
      {
        field: "VoucherId",
        headerText: "Voucher no",
        textAlign: "Left",
        width: 120
      },
      // { field: "LedgerId", headerText: "Ledgeddddr", width: 150 },
      { field: "Date", headerText: "Date", width: 150 },
      { field: "ReferenceNumber", headerText: "Reference", width: 150 },
      { field: "Debit", headerText: "Debit", format: "N2", width: 150 },
      { field: "Credit", headerText: "Credit", format: "N2", width: 150 },
      { field: "Balance", headerText: "Balance", format: "N2", width: 150 }
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

    this.subsidaryService.execute({ skip: 0, take: 50 }, this.filterData);
  }

  onFiltered(data: string = ""): void {
    this.lastFilter = data;
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
      }, 1000);
    }
    if (args.item.id === "Grid_excelexport") {
      this.grid.detailRowModule.expandAll();
      setTimeout(() => {
        this.grid.excelExport();
      }, 1000);
    }
  }
  expand(): void {
    this.grid.detailRowModule.expandAll();
  }

  onFilterStateChange(filterData: ReportFilterModel): void {
    this.filterData = filterData;
    this.subsidaryService.execute(this.stateData, filterData);
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.stateData = state;
    this.subsidaryService.execute(state, this.filterData);
  }
  collapse(): void {
    this.grid.detailRowModule.collapseAll();
  }
}
