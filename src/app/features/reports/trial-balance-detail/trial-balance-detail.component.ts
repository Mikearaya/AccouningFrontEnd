import { Component, OnInit, ViewChild } from "@angular/core";
import { ReportApiService } from "../report-api.service";
import { GridModel } from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { TrialBalanceDetailViewModel } from "../report";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { PageSizes } from "src/app/page-model";

@Component({
  selector: "app-trial-balance-detail",
  templateUrl: "./trial-balance-detail.component.html",
  styleUrls: ["./trial-balance-detail.component.css"]
})
export class TrialBalanceDetailComponent implements OnInit {
  public gridData: object[];
  public data: TrialBalanceDetailViewModel[];
  public toolbar: object;
  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: string; pageSizes: string[] };
  lastFilter: any;

  constructor(private reportService: ReportApiService) {
    this.initialPage = {
      pageSize: this.pageSizes[0],
      pageSizes: this.pageSizes
    };
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
      { field: "Debit", headerText: "Debit", width: 150 },
      { field: "Credit", headerText: "Credit", width: 150 }
    ],
    aggregates: [
      {
        columns: [
          {
            type: "Sum",
            field: "Debit",
            footerTemplate: "${Sum}"
          },
          {
            type: "Sum",
            field: "Credit",
            footerTemplate: "${Sum}"
          }
        ]
      }
    ]
  };
  @ViewChild("grid")
  public grid: GridComponent;

  ngOnInit() {
    this.reportService
      .getTrialBalanceDetail(this.generateSearchString())
      .subscribe((data: TrialBalanceDetailViewModel[]) => {
        this.data = data;
        this.gridData = data;
        const trialDetails = [];
        this.data.forEach(element => {
          element.Entries.forEach(elementTrial => {
            trialDetails.push(elementTrial);
          });
        });
        console.log(this.data);
        this.childGrid.dataSource = trialDetails;
        console.log("child", this.childGrid.dataSource);
      });

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

  onFiltered(data: any): void {
    this.lastFilter = data;

    this.reportService
      .getTrialBalanceDetail(`${data}&${this.generateSearchString()}`)
      .subscribe((result: TrialBalanceDetailViewModel[]) => {
        this.data = result;
        this.gridData = result;

        const x = [];
        result.forEach(element => {
          element.Entries.forEach(elementx => {
            x.push(elementx);
          });
        });

        this.childGrid.dataSource = x;
      });
  }
}
