import { Component, OnInit, Input } from "@angular/core";

import { LedgerService } from "../../../core/services/ledger.service";
import { CustomGridColumns } from "src/app/shared/data-view/data-view.component";
import { DataStateChangeEventArgs } from "@syncfusion/ej2-grids";
import { Subject } from "rxjs";

@Component({
  selector: "app-ledger-view",
  templateUrl: "./ledger-view.component.html",
  styleUrls: ["./ledger-view.component.css"]
  // encapsulation: ViewEncapsulation.
})
export class LedgerViewComponent implements OnInit {
  public data: Subject<DataStateChangeEventArgs>;

  @Input()
  public showAddLedger: Boolean = true;
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

  constructor(private ledgerService: LedgerService) {
    this.data = this.ledgerService;
  }
  ngOnInit() {
    this.ledgerService.execute({ skip: 0, take: 50 });
  }

  deleteLedgerEntry(data: any) {
    this.ledgerService.deleteLedgerEntry(data["Id"]).subscribe();
  }

  onDataStateChanged(state: DataStateChangeEventArgs): void {
    this.ledgerService.execute(state);
  }
}
