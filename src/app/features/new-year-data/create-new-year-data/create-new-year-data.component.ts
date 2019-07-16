import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

@Component({
  selector: "app-create-new-year-data",
  template: `
    <div class="container">
      <div class="row text-center">
        <div class="col-6 ">
          <button ejs-button class="e-primary" (click)="create()">
            Create
          </button>
        </div>
        <div class="col-6">
          <button ejs-button class="e-danger" (click)="delete()">Delete</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./create-new-year-data.component.css"]
})
export class CreateNewYearDataComponent implements OnInit {
  constructor(private accountingApi: AccountingApiService) {}

  create() {
    this.accountingApi
      .createNextFiscalPeriod()
      .subscribe(
        () => alert("Accounts for the next fiscal period created successfuly"),
        () => alert("unable to create fiscal year at this period")
      );
  }

  delete() {
    this.accountingApi
      .deleteFiscalPeriod()
      .subscribe(
        e => alert("deleted fiscal year successfuly"),
        () =>
          alert(
            "unable to delete fiscal year accounts, one or more accounts have entries under them"
          )
      );
  }
  ngOnInit() {
    // createSpinner() method is used to create spinner
    // showSpinner() will make the spinner visible
  }
}
