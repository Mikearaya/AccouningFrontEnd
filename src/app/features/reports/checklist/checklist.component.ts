/* import { Component, OnInit } from "@angular/core";
import { CustomGridColumns } from "src/app/shared/data-view/data-view.component";
import { HttpErrorResponse } from "@angular/common/http";
import { ChecklistService } from "./checklist.service";
import { Checklist } from "../report";

@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"]
})
export class ChecklistComponent implements OnInit {
  public data: object;
  private checklist: Checklist[];

  public columnBluePrint: CustomGridColumns[] = [
    {
      key: "ControlAccountId",
      header: "Parent Account",
      visible: true,
      width: 40,
      type: "string"
    },
    {
      key: "SubAccountId",
      header: "Sub account id",
      visible: true,
      width: 40,
      type: "string"
    },
    {
      key: "Date",
      header: "Date",
      visible: true,
      width: 30,
      type: "date",
      format: "yMd"
    },
    {
      key: "AccountName",
      header: "Account name",
      visible: true,
      width: 90,
      type: "string"
    },
    {
      key: "Description",
      header: "Description",
      visible: true,
      width: 90,
      type: "string"
    },
    {
      key: "Debit",
      header: "Debit",
      visible: true,
      width: 30,
      type: "number"
    },
    {
      key: "Credit",
      header: "Credit",
      visible: true,
      width: 30,
      type: "number"
    }
  ];

  constructor(private checklistService: ChecklistService) {}
  ngOnInit() {
    this.loadChecklistReports();
  }
  loadChecklistReports() {
    this.checklistService
      .getChecklistReport()
      .subscribe((data: Checklist[]) => {
        this.data = data;
        console.log(data);
        // (error: HttpErrorResponse) => console.error(error);
      });
  }

  printPage() {
    window.print();
  }
} */
/* import { Component, OnInit } from "@angular/core";
import { Checklist } from "../report";
import { ChecklistService } from "./checklist.service";
@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"]
})
export class ChecklistComponent implements OnInit {
  public TData: object[];

  constructor(private checklistService: ChecklistService) {}

  ngOnInit(): void {
    this.checklistService
      .getChecklistReport()
      .subscribe((data: Checklist[]) => {
        this.TData = data;
        console.log("tree data:", this.TData);
      });
  }
} */

import { Component, OnInit, ViewChild } from "@angular/core";
import { GridModel } from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { Checklist } from "../report";
import { ChecklistService } from "./checklist.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"]
})
export class ChecklistComponent implements OnInit {
  public gridData: object[];
  public data: Checklist[];
  constructor(private checklistService: ChecklistService) {}
  public childGrid: GridModel = {
    dataSource: this.data,
    queryString: "LedgerId",
    columns: [
      {
        field: "ControlAccountID",
        headerText: "General",
        textAlign: "Left",
        width: 120
      },
      { field: "LedgerId", headerText: "Ledgeddddr", width: 150 },
      { field: "AccountName", headerText: "Account name", width: 150 },
      { field: "Debit", headerText: "Debit", width: 150 },
      { field: "Credit", headerText: "Credit", width: 150 }
    ]
  };
  @ViewChild("grid")
  public grid: GridComponent;

  ngOnInit(): void {
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
  }

  expand(): void {
    this.grid.detailRowModule.expandAll();
  }

  collapse(): void {
    this.grid.detailRowModule.collapseAll();
  }

  printPage() {
    this.expand();
    window.print();
  }
}
