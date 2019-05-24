import { Component, OnInit } from "@angular/core";
import { AccountingApiService } from "src/app/Services/accounting-api.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-create-new-year-data",
  template: `
    <div>
      <button ejs-button class="e-primary" (click)="create()">Create</button>
    </div>
  `,
  styleUrls: ["./create-new-year-data.component.css"]
})
export class CreateNewYearDataComponent {
  constructor(private accountingApi: AccountingApiService) {}

  create() {
    this.accountingApi
      .createNextFiscalPeriod()
      .subscribe(
        () => alert("Accounts for the next fiscal period created successfuly"),
        (error: HttpErrorResponse) => alert(error.message)
      );
  }
}
