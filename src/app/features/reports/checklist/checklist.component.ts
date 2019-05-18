import { Component, OnInit, ViewChild } from "@angular/core";
import {
  GridModel,
  CustomSummaryType,
  AggregateColumnModel,
  getForeignData
} from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { Checklist } from "../report";

import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { getValue } from "@syncfusion/ej2-base";
import { ReportApiService } from "../report-api.service";
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

  @ViewChild("grid")
  public grid: GridComponent;

  ngOnInit(): void {
    this.initialPage = {
      pageSizes: ["20", "50", "100", "200", "500", "1000", "All"],
      pageSize: 20
    };
    this.checklistService
      .getChecklistReport()
      .subscribe((data: Checklist[]) => {
        this.data = data;
        this.gridData = this.data;
        const x = [];
        this.data.forEach(element => {
          element.Entries.forEach(elementx => {
            x.push(elementx);
          });
        });
        console.log(x);
        this.childGrid.dataSource = x;
        console.log("child", this.childGrid.dataSource);
      });
    this.toolbar = [
      { text: "Expand All", prefixIcon: "e-expand", id: "expandall" },
      { text: "Collapse All", prefixIcon: "e-collapse", id: "collapseall" },
      { text: "Print", prefixIcon: "e-print", id: "print" },
      {
        text: "ExcelExport",
        prefixIcon: "e-ExcelExport",
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
