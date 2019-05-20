import { Component, OnInit, ViewChild } from "@angular/core";
import { GridModel } from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { Checklist } from "../report";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ReportApiService } from "../report-api.service";
import { ActionCompleteEventArgs } from "@syncfusion/ej2-inputs";
@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"]
})
export class ChecklistComponent implements OnInit {
  public gridData: object[];
  public data: Checklist[];
  public toolbar: object;
  public Dialog: any;
  public initialPage: object;
  public summaryRows;
  constructor(private checklistService: ReportApiService) {}
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
      { field: "Debit", headerText: "Debit", width: 150 },
      { field: "Credit", headerText: "Credit", width: 150 }
    ]
  };
  lastFilter = "";
  @ViewChild("grid")
  public grid: GridComponent;

  ngOnInit(): void {
    this.initialPage = {
      pageSizes: ["20", "50", "100", "200", "500", "1000", "All"],
      pageSize: 20
    };
    this.checklistService
      .getChecklistReport(this.generateSearchString())
      .subscribe((data: Checklist[]) => {
        this.gridData = data;
        const x = [];
        data.forEach(element => {
          element.Entries.forEach(elementx => {
            x.push(elementx);
          });
        });

        this.childGrid.dataSource = x;
      });
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
  }

  generateSearchString(): string {
    return `pageSize=${this.grid.pageSettings.pageSize}&pageNumber=${
      this.grid.pageSettings.currentPage
    }`;
  }
  onFiltered(data: any): void {
    this.lastFilter = data;
    this.checklistService
      .getChecklistReport(`${data}${this.generateSearchString()}`)
      .subscribe((result: Checklist[]) => {
        this.data = result;
        this.gridData = this.data;
        const x = [];
        this.data.forEach(element => {
          element.Entries.forEach(elementx => {
            x.push(elementx);
          });
        });
        this.childGrid.dataSource = x;
      });
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

  gridStateChanged($event: any) {
    console.log($event);
    if ($event.requestType === "referesh") {
      this.onFiltered(this.lastFilter);
    }
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
}
