import { Component, OnInit, Output } from "@angular/core";
import { AccountCatagoryApiService } from "../../../core/account-catagory-api.service";
import { AccountCatagoryView } from "../account-catagory-domain";
import { PageSizes } from "src/app/page-model";

@Component({
  selector: "app-account-catagory-view",
  templateUrl: "./account-catagory-view.component.html",
  styleUrls: ["./account-catagory-view.component.css"]
})
export class AccountCatagoryViewComponent implements OnInit {
  public data: any;
  public customAttributes: { class: string };
  public filterOptions: { type: string };
  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: number; pageSizes: string[] };
  public columnBluePrint = [
    {
      key: "Id",
      header: "Id",
      visible: true,
      width: "40",
      type: "number"
    },
    {
      key: "CategoryName",
      header: "Catagory Name",
      visible: true,
      width: "100",
      type: "string"
    },
    {
      key: "AccountType",
      header: "Account Type",
      visible: true,
      width: "100",
      type: "string"
    }
  ];
  constructor(private accountCatagApi: AccountCatagoryApiService) {
    this.initialPage = { pageSize: 20, pageSizes: this.pageSizes };
  }

  ngOnInit() {
    this.accountCatagApi
      .getAccountCatagories("")
      .subscribe((data: AccountCatagoryView[]) => {
        this.data = data;
      });
  }

  deleteCatagory(data: any) {
    this.accountCatagApi
      .deleteAccountCatagory(data["Id"])
      .subscribe(() => alert("deleted"));
  }
  loadCatagories(search: string = "") {
    this.accountCatagApi
      .getAccountCatagories(search)
      .subscribe((data: AccountCatagoryView[]) => {
        this.data = data;
      });
  }

  filterAccountCategory(data: any) {
    this.loadCatagories(data);
  }
}
