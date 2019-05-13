import { Component, OnInit } from "@angular/core";
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
    this.loadCheklistReports();
  }
  loadCheklistReports() {
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
}
