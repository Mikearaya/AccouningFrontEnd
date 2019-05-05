/*
 * @CreateTime: Dec 14, 2018 10:22 AM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: Apr 25, 2019 2:21 PM
 * @Description: Modify Here, Please
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  GridComponent,
  ExcelExportProperties,
  GroupSettingsModel,
  FilterSettingsModel,
  ToolbarItems,
  TextWrapSettingsModel,
  EditSettingsModel,
  SelectionSettingsModel,
  PageSettingsModel,
  CommandModel,
  RowSelectEventArgs,
  GridModel,
  ActionEventArgs,
  DeleteEventArgs,
  Column,
  IRow
} from "@syncfusion/ej2-angular-grids";
import { Router, ActivatedRoute } from "@angular/router";

import { HttpErrorResponse } from "@angular/common/http";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { Accounts, AccountViewModel } from "../accounts";
import {
  QueryString,
  FilterEventModel
} from "src/app/shared/data-view/data-view.model";
import { AccountsService } from "../../../core/services/accounts.service";
import { closest } from "@syncfusion/ej2-base";

@Component({
  selector: "app-accounts-view",
  templateUrl: "./accounts-view.component.html",
  styleUrls: ["./accounts-view.component.css"]
})
export class AccountsViewComponent implements OnInit {
  title = "Fiscal Calander Period";

  @ViewChild("grid")
  public grid: GridComponent;
  public data: AccountViewModel[];
  public excelExportProperties: ExcelExportProperties;
  public filterSettings: FilterSettingsModel;
  public toolbarOptions: Object[];
  public wrapSettings: TextWrapSettingsModel;
  public toolbar: ToolbarItems[];
  public editSettings: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public commands: CommandModel[];
  public groupOptions: GroupSettingsModel = { showDropArea: false };

  public childGrid: GridModel;
  query: QueryString;
  initialPage: { pageSize: any; pageSizes: boolean };

  constructor(
    private router: Router,
    private accountApi: AccountsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialPage = { pageSize: 10, pageSizes: true };
    this.query = new QueryString();
  }

  ngOnInit() {
    this.accountApi.getAccountsList().subscribe(
      (data: AccountViewModel[]) => {
        this.data = data;
        this.childGrid.dataSource = data;
      },
      (error: HttpErrorResponse) => alert(error.message)
    );

    this.childGrid = {
      queryString: "ParentAccount",
      columns: [
        {
          field: "AccountId",
          headerText: "Account Id",
          textAlign: "Right",
          width: 120
        },
        { field: "AccountName", headerText: "Name", width: 150 },
        { field: "Active", headerText: "Status", width: 150 },
        { field: "ParentAccount", headerText: "Parent", width: 150 }
      ]
    };

    this.filterOptions = { type: "Menu" }; // put unique filter menue for each column based on the column type
    this.selectionOptions = { type: "Single" }; // allow only single row to be selected at a time for edit or delete

    this.toolbarOptions = ["Create Account", "Search"];
    this.commands = [
      {
        type: "Edit",
        buttonOption: {
          cssClass: "e-flat",
          iconCss: "e-edit e-icons",
          click: this.editAccount.bind(this)
        }
      },
      {
        type: "Delete",
        buttonOption: {
          cssClass: "e-flat",
          iconCss: "e-delete e-icons",
          click: this.deleteAccount.bind(this)
        }
      }
    ];
    this.pageSettings = { pageSize: 15 }; // initial page row size for the grid
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
  }

  editAccount(data: Event): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(data.target as Element, ".e-row").getAttribute("data-uid")
    );

    if (rowObj.data["Id"]) {
      this.router.navigate([`${rowObj.data["Id"]}/update`], {
        relativeTo: this.activatedRoute
      });
    }
  }

  deleteAccount(data: Event): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(data.target as Element, ".e-row").getAttribute("data-uid")
    );

    this.accountApi.deleteAccount(rowObj.data["Id"]).subscribe();
  }

  onDataBound() {
    this.grid.detailRowModule.expandAll();
  }
  // Click handler for when the toolbar is cliked
  toolbarClick(args: ClickEventArgs): void {
    console.log(args.item.id);
    if (args.item.id.toUpperCase() === "ACCOUNTS_CREATE ACCOUNT") {
      this.router.navigate(["accounts/new"]); // when user click add route to the accounts form
    }
  }

  actionEndHandler(args: ActionEventArgs) {
    this.query.selectedColumns = [];

    this.grid
      .getColumns()
      .filter(c => c.visible && c.field !== undefined)
      .forEach(s => this.query.selectedColumns.push(s.field));

    switch (args.requestType) {
      case "sorting":
        this.query.sortDirection = args["direction"];
        this.query.sortColumn = args["columnName"];

        break;
      case "filtering":
        const filteringModel = new FilterEventModel();
        filteringModel.columnName = args["currentFilterObject"]["field"];
        filteringModel.operator = args["currentFilterObject"]["operator"];
        filteringModel.value = args["currentFilterObject"]["value"];

        break;
      case "searching":
        this.query.searchString = args["searchString"];

        break;
    }

    if (args.requestType !== "refresh") {
      this.prepareQuery();
    }

    if (
      this.query.pageSize !== this.grid.pageSettings.pageSize ||
      this.query.pageNumber !== this.grid.pageSettings.currentPage
    ) {
      this.query.pageSize = this.grid.pageSettings.pageSize;
      this.query.pageNumber = this.grid.pageSettings.currentPage;

      this.prepareQuery();
    }
  }

  private prepareQuery(): void {
    let searchString = `selectedColumns=${this.query.selectedColumns.toString()}&`;

    if (this.query.searchString) {
      searchString += `searchString=${this.query.searchString}&`;
    }

    searchString += `pageSize=${this.query.pageSize}&pageNumber=${
      this.query.pageNumber
    }`;
    this.accountApi
      .getAccountsList(searchString)
      .subscribe(data => (this.data = data));
  }
}
