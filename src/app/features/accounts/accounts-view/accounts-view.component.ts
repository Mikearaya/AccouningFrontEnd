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
  GridModel,
  ActionEventArgs,
  Column,
  IRow,
  RowDataBoundEventArgs,
  columnSelectionBegin,
  HierarchyGridPrintMode,
  DataStateChangeEventArgs
} from "@syncfusion/ej2-angular-grids";
import { Router, ActivatedRoute } from "@angular/router";

import { HttpErrorResponse } from "@angular/common/http";
import { ClickEventArgs, ChangeEventArgs } from "@syncfusion/ej2-navigations";
import { AccountViewModel, AccountView } from "../accounts";
import {
  QueryString,
  FilterEventModel
} from "src/app/shared/data-view/data-view.model";
import { AccountsService } from "../../../core/services/accounts.service";
import { closest } from "@syncfusion/ej2-base";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { ContextMenuItem } from "@syncfusion/ej2-treegrid";
import { PieCenter } from "@syncfusion/ej2-charts";
import { Observable } from "rxjs";

@Component({
  selector: "app-accounts-view",
  templateUrl: "./accounts-view.component.html",
  styleUrls: ["./accounts-view.component.css"]
})
export class AccountsViewComponent implements OnInit {
  title = "Fiscal Calander Period";

  @ViewChild("grid")
  public grid: GridComponent;
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
  public initialPage: { pageSize: number; pageSizes: string[] };
  public hierarchyPrintMode: HierarchyGridPrintMode;
  public contextMenuItems: ContextMenuItem[];

  public data: Observable<DataStateChangeEventArgs>;
  public pageOptions: Object;
  public state: DataStateChangeEventArgs;

  public childGrid: GridModel;
  query: QueryString;

  constructor(
    private router: Router,
    private accountApi: AccountsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.data = accountApi;
    this.initialPage = {
      pageSizes: [
        "20",
        "50",
        "100",
        "200",
        "500",
        "1000",
        "3000",
        "4000",
        "All"
      ],
      pageSize: 20
    };
    this.query = new QueryString();
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.accountApi.execute(state);
  }

  ngOnInit() {
    /*     this.accountApi.getAccountsList(this.query).subscribe(
      (data: AccountViewModel) => {
        this.data = data.Items;
        this.grid.pageSettings.totalRecordsCount = data.Count;
      },
      (error: HttpErrorResponse) => alert(error.message)
    ); */

    this.pageSettings = { pageSize: 5, pageCount: 4 };
    const state = { skip: 0, take: 10 };
    this.accountApi.execute(state);

    this.groupOptions = {
      disablePageWiseAggregates: false,
      showDropArea: false,
      columns: ["ParentAccountId"]
    };

    this.filterOptions = { type: "Menu" }; // put unique filter menue for each column based on the column type
    this.selectionOptions = { type: "Single" }; // allow only single row to be selected at a time for edit or delete

    this.editSettings = { allowDeleting: true };
    // this.contextMenuItems = ["Delete", "Edit"];
    this.toolbarOptions = [
      { text: "Create Account", prefixIcon: "e-create" },
      "Search",
      { text: "Expand All", prefixIcon: "e-expand", id: "expandall" },
      { text: "Collapse All", prefixIcon: "e-collapse", id: "collapseall" },
      { text: "Print", prefixIcon: "e-print", id: "print" },
      {
        text: "ExcelExport",
        prefixIcon: "e-Excel_Export",
        id: "Grid_excelexport"
      }
    ];
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
  }

  public rowDataBound(args: RowDataBoundEventArgs) {
    const filter: string = args.data["ParentAccountId"];
    const childrecord: any = new DataManager(this.grid.childGrid
      .dataSource as JSON[]).executeLocal(
      new Query().where("ParentAccountId", "equal", parseInt(filter, 10), true)
    );
    if (childrecord === 0) {
      args.row.querySelector("td").innerHTML = "";
      args.row.querySelector("td").className = "e-customizedExpandcell";
    }
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
    if (args.item.id.toUpperCase() === "ACCOUNTS_CREATE ACCOUNT") {
      this.router.navigate(["accounts/new"]); // when user click add route to the accounts form
    }
    if (args.item.id === "expandall") {
      this.grid.groupModule.expandAll();
    }
    if (args.item.id === "collapseall") {
      this.grid.groupModule.collapseAll();
    }
    if (args.item.id === "print") {
      this.grid.groupModule.expandAll();
      setTimeout(() => {
        window.print();
      }, 1000);
    }
    if (args.item.id === "Grid_excelexport") {
      setTimeout(() => {
        this.grid.excelExport(this.getExcelExportProperties());
      }, 400);
    }
  }

  actionEndHandler(args: ActionEventArgs) {
    switch (args.requestType) {
      case "sorting":
        this.query.sortDirection = args["direction"];
        this.query.sortColumn = args["columnName"];

        break;
      case "filtering":
        const filteringModel = new FilterEventModel();
        filteringModel.columnName = args["currentFilterObject"]["field"];
        filteringModel.operator = args["currentFilterObject"]["operator"];
        filteringModel.propertyName = args["currentFilterObject"]["field"];
        filteringModel.operation = args["currentFilterObject"]["operator"];
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

    if (this.query.sortColumn) {
      searchString += `sortBy=${this.query.sortColumn}&`;
    }

    if (this.query.sortDirection) {
      searchString += `sortDirection=${this.query.sortDirection}&`;
    }

    searchString += `pageSize=${this.query.pageSize}&pageNumber=${
      this.query.pageNumber
    }`;
    /*    this.accountApi
      .getAccountsList(this.query)
      .subscribe((data: AccountViewModel) => {
        this.data = data.Items;

        this.grid.pageSettings.pageCount = data.Count;
      }); */
  }

  private getExcelExportProperties(): any {
    return {
      header: {
        headerRows: 5,
        rows: [
          {
            cells: [
              {
                colSpan: 4,
                rowSpan: 3,
                value: "Chart of Accounts",
                style: {
                  fontSize: 25,
                  hAlign: "Center",
                  bold: true
                }
              }
            ]
          }
        ]
      },
      footer: {
        footerRows: 4,
        rows: [
          {
            cells: [
              {
                colSpan: 4,
                value: "Thank you for your business!",
                style: { hAlign: "Center", bold: true }
              }
            ]
          },
          {
            cells: [
              {
                colSpan: 4,
                value: "Visit again!",
                style: { hAlign: "Center", bold: true }
              }
            ]
          }
        ]
      }
    };
  }
}
