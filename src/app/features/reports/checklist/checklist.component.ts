import { Component, OnInit, ViewChild } from "@angular/core";
import { GridModel, DataStateChangeEventArgs } from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";

import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";

import {
  PageChanged,
  PaginationComponent
} from "src/app/shared/pagination/pagination.component";
import { FilterOptionComponent } from "src/app/shared/filter-option/filter-option.component";
import { PageSizes } from "src/app/page-model";
import { CheckListReportApiService } from "./check-list-report-api.service";
import { ReportFilterModel } from "src/app/shared/filter-option/filter";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"]
})
export class ChecklistComponent implements OnInit {
  @ViewChild("filter")
  public filter: FilterOptionComponent;
  @ViewChild("pagger")
  public pagger: PaginationComponent;
  public gridData: object[];
  public data: Subject<DataStateChangeEventArgs>;
  public toolbar: object;
  public Dialog: any;
  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: number; pageSizes: string[] };
  public summaryRows;
  public totalPages: number;
  public filterData: ReportFilterModel;
  public stateData: DataStateChangeEventArgs;
  public filterSettings: { type: string };

  constructor(private checklistService: CheckListReportApiService) {
    this.filterSettings = { type: "Menu" };

    this.stateData = { skip: 0, take: 50 };
    this.filterData = new ReportFilterModel();
    this.data = this.checklistService;
  }

  public childGrid: GridModel = {
    dataSource: this.data,
    queryString: "LedgerId",
    columns: [
      {
        field: "ControlAccountId",
        headerText: "General",
        textAlign: "Left",
        width: 120
      },
      { field: "AccountName", headerText: "Account name", width: 150 },
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

  lastFilter = "";
  @ViewChild("grid")
  public grid: GridComponent;

  ngOnInit(): void {
    this.checklistService.execute(this.stateData, this.filterData);
    this.initialPage = {
      pageSize: 50,
      pageSizes: this.pageSizes
    };

    this.toolbar = [
      { text: "Expand All", prefixIcon: "e-expand", id: "expandall" },
      { text: "Collapse All", prefixIcon: "e-collapse", id: "collapseall" },
      { text: "Print", prefixIcon: "e-print", id: "print" },
      {
        text: "ExcelExport",
        prefixIcon: "e-Excel_Export",
        id: "Grid_excelexport"
      }
    ];

    this.checklistService.execute({ skip: 0, take: 50 }, this.filterData);

    this.data
      .pipe(
        map((response: any) => {
          const Entries = [];
          response.result.forEach(e => {
            e.Entries.forEach(d => {
              Entries.push(d);
            });
          });
          return Entries;
        })
      )
      .subscribe(e => (this.childGrid.dataSource = e));
  }

  generateSearchString(): string {
    return `pageSize=${this.grid.pageSettings.pageSize}&pageNumber=${
      this.grid.pageSettings.currentPage
    }`;
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.stateData = state;
    this.checklistService.execute(state, this.filterData);
  }

  onPageChanged(event: PageChanged): void {
    const search = this.filter.getFilterContent();
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
      // const currentPageSize = this.grid.pageSettings.pageSize;
      // this.grid.pageSettings.pageSize = this.grid.pageSettings.totalRecordsCount;
      this.grid.detailRowModule.expandAll();
      setTimeout(() => {
        this.grid.excelExport();
        // this.grid.pageSettings.pageSize = currentPageSize;
      }, 1000);
    }
  }

  onFilterStateChange(filterData: ReportFilterModel): void {
    this.filterData = filterData;
    this.checklistService.execute(this.stateData, filterData);
  }

  expand(): void {
    this.grid.detailRowModule.expandAll();
  }

  collapse(): void {
    this.grid.detailRowModule.collapseAll();
  }

  printPage() {
    this.expand();

    setTimeout(() => {
      window.print();
    }, 100);
  }

  dropDownChanged(data: any): void {}
}
