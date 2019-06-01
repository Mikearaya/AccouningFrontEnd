import { Component, OnInit, ViewChild } from "@angular/core";
import { SubsidaryLedgerViewModel } from "../report";
import { GridModel } from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ReportApiService } from "../report-api.service";
import { PageSizes } from "src/app/page-model";

@Component({
  selector: "app-subsidary-ledger-report",
  templateUrl: "./subsidary-ledger-report.component.html",
  styleUrls: ["./subsidary-ledger-report.component.css"]
})
export class SubsidaryLedgerReportComponent implements OnInit {
  public gridData: object[];
  public data: SubsidaryLedgerViewModel[];
  public toolbar: object;
  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: string; pageSizes: string[] };
  lastFilter: string;

  constructor(private subsidaryService: ReportApiService) {
    this.initialPage = {
      pageSize: this.pageSizes[0],
      pageSizes: this.pageSizes
    };
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
      { field: "Debit", headerText: "Debit", width: 150 },
      { field: "Credit", headerText: "Credit", width: 150 },
      { field: "Balance", headerText: "Balance", width: 150 }
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
    this.subsidaryService
      .getSubsidaryLedgerReport(this.generateSearchString())
      .subscribe((data: SubsidaryLedgerViewModel[]) => {
        this.data = data;
        this.gridData = data;
        const subsidaryDetails = [];
        let totalCredit = 0;

        this.data.forEach(element => {
          element.Entries.forEach(elementSubsidary => {
            subsidaryDetails.push(elementSubsidary);
            totalCredit += elementSubsidary.Credit;
          });
        });

        this.childGrid.dataSource = subsidaryDetails;
        console.log();
        console.log(totalCredit);
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

  onFiltered(data: string = ""): void {
    this.lastFilter = data;

    this.subsidaryService
      .getSubsidaryLedgerReport(`${data}&${this.generateSearchString()}`)
      .subscribe((result: SubsidaryLedgerViewModel[]) => {
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
  expand(): void {
    this.grid.detailRowModule.expandAll();
  }

  collapse(): void {
    this.grid.detailRowModule.collapseAll();
  }
}
