import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AccountingApiService } from "src/app/Services/accounting-api.service";
import { HttpErrorResponse } from "@angular/common/http";
import {
  createSpinner,
  showSpinner,
  hideSpinner,
  setSpinner
} from "@syncfusion/ej2-angular-popups";

@Component({
  selector: "app-create-new-year-data",
  template: `
    <div>
      <button ejs-button class="e-primary" (click)="create()">Create</button>
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
        (error: HttpErrorResponse) => alert(error.message)
      );
  }
  ngOnInit() {
    //createSpinner() method is used to create spinner
    createSpinner({
      // Specify the target for the spinner to show
      target: document.getElementById("container")
    });

    // showSpinner() will make the spinner visible
  }
}
