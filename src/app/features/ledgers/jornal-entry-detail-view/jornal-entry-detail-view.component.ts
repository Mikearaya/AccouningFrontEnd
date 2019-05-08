import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LedgerService } from "../../../core/services/ledger.service";
import { HttpErrorResponse } from "@angular/common/http";
import { JornalEntryViewModel } from "../ledger";
import { CustomGridColumns } from "src/app/shared/data-view/data-view.component";

@Component({
  selector: "app-jornal-entry-detail-view",
  templateUrl: "./jornal-entry-detail-view.component.html",
  styleUrls: ["./jornal-entry-detail-view.component.css"]
})
export class JornalEntryDetailViewComponent implements OnInit {
  columnBluePrint: CustomGridColumns[] = [
    {
      key: "id",
      header: "Id",
      width: 50,
      type: "number",
      visible: false
    },
    {
      key: "accountId",
      header: "Account Id",
      width: 50,
      type: "string",
      visible: true
    },
    {
      key: "account",
      header: "Account",
      width: 50,
      type: "string",
      visible: true
    },
    {
      key: "amount",
      header: "Amount",
      width: 70,
      type: "number",
      visible: true,
      format: "##"
    },
    {
      key: "dateAdded",
      header: "Added",
      width: 70,
      type: "date",
      visible: false,
      format: "yMd"
    },
    {
      key: "dateUpdated",
      header: "Updated",
      width: 70,
      type: "date",
      visible: false,
      format: "yMd"
    }
  ];

  public data: JornalEntryViewModel[];
  public ledgerId: number;
  public printMode: "CurrentPage";

  public customAttributes: { class: string };
  public filterOptions: { type: string };

  constructor(
    private ledgerApi: LedgerService,
    private activateRoute: ActivatedRoute
  ) {
    this.filterOptions = { type: "Menu" }; // put unique filter menue for each column based on the column type
  }

  ngOnInit(): void {
    this.ledgerId = +this.activateRoute.snapshot.paramMap.get("ledgerId");

    if (this.ledgerId) {
      this.ledgerApi
        .getLedgerEntryById(this.ledgerId)
        .subscribe(
          (data: JornalEntryViewModel[]) => (this.data = data),
          (error: HttpErrorResponse) => alert(error.message)
        );
    }
  }
}
