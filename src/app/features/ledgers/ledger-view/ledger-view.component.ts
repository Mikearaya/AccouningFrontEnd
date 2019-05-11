import { Component, OnInit } from "@angular/core";

import { LedgerService } from "../../../core/services/ledger.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CustomGridColumns } from "src/app/shared/data-view/data-view.component";

@Component({
  selector: "app-ledger-view",
  templateUrl: "./ledger-view.component.html",
  styleUrls: ["./ledger-view.component.css"]
})
export class LedgerViewComponent implements OnInit {
  public data: Object;

  public columnBluePrint: CustomGridColumns[] = [
    {
      key: "Id",
      header: "Id",
      visible: false,
      width: 30,
      type: "number"
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
      key: "Description",
      header: "Description",
      visible: true,
      width: 90,
      type: "string"
    },
    {
      key: "Reference",
      header: "DocumentNo",
      visible: true,
      width: 50,
      type: "string"
    },
    {
      key: "VoucherId",
      header: "Voucher no",
      visible: true,
      width: 50,
      type: "string"
    },
    {
      key: "DateAdded",
      header: "Added",
      visible: false,
      width: 90,
      type: "date",
      format: "yMd"
    },
    {
      key: "DateUpdated",
      header: "Updated",
      visible: false,
      width: 90,
      type: "date",
      format: "yMd"
    }
  ];

  constructor(private ledgerService: LedgerService) {}
  ngOnInit() {
    this.loadLedgerEntries();
  }
  loadLedgerEntries() {
    this.ledgerService
      .getAllLedgerEntries()
      .subscribe(
        (data: any) => (this.data = data),
        (error: HttpErrorResponse) => console.error(error)
      );
  }
  deleteLedgerEntry(data: any) {
    this.ledgerService
      .deleteLedgerEntry(data["Id"])
      .subscribe(() => alert("deleted"));
  }

  dataQuiredHandler(event: string): void {
    this.ledgerService
      .getAllLedgerEntries(event)
      .subscribe(data => (this.data = data));
  }
}
