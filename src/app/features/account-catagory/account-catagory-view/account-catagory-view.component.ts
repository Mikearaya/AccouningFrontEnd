import { Component, OnInit, Output, ViewChild } from "@angular/core";
import { AccountCatagoryApiService } from "../../../core/account-catagory-api.service";
import { DataStateChangeEventArgs } from "@syncfusion/ej2-grids";
import { Subject } from "rxjs";
import { DataViewComponent } from "src/app/shared/data-view/data-view.component";
import { AccountCatagoryView } from "../account-catagory-domain";
import { PageSizes } from "src/app/page-model";

@Component({
  selector: "app-account-catagory-view",
  templateUrl: "./account-catagory-view.component.html",
  styleUrls: ["./account-catagory-view.component.css"]
})
export class AccountCatagoryViewComponent implements OnInit {
  public data: Subject<DataStateChangeEventArgs>;
  @ViewChild("gird")
  public grid: DataViewComponent;
  public customAttributes: { class: string };
  public filterOptions: { type: string };
  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: number; pageSizes: string[] };
  public columnBluePrint = [
    {
      key: "Id",
      header: "Id",
      visible: false,
      width: "40",
      type: "number"
    },
    {
      key: "CategoryName",
      header: "Catagory Name",
      visible: true,

      type: "string"
    },
    {
      key: "AccountType",
      header: "Account Type",
      visible: true,
      width: "50",
      type: "string"
    }
  ];
  constructor(private accountCatagApi: AccountCatagoryApiService) {
    this.data = this.accountCatagApi;
    this.initialPage = { pageSize: 20, pageSizes: this.pageSizes };
  }

  ngOnInit() {
    const state = { skip: 0, take: 50 };
    this.accountCatagApi.execute(state);
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.accountCatagApi.execute(state);
  }

  deleteCatagory(data: any) {
    this.accountCatagApi
      .deleteAccountCatagory(data["Id"])
      .subscribe(() => alert("deleted"));
  }
}
