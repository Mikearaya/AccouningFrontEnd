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
  HierarchyGridPrintMode,
  DataStateChangeEventArgs,
  dataStateChange
} from "@syncfusion/ej2-angular-grids";
import { Router, ActivatedRoute } from "@angular/router";

import { HttpErrorResponse } from "@angular/common/http";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";

import {
  QueryString,
  FilterEventModel
} from "src/app/shared/data-view/data-view.model";
import { AccountsService } from "../../../core/services/accounts.service";
import { closest } from "@syncfusion/ej2-base";
import { Subject } from "rxjs";
import { PageSizes } from "src/app/page-model";
import { CustomGridColumns } from "src/app/shared/data-view/data-view.component";

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
  public groupOptions: GroupSettingsModel = { showDropArea: true };
  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: string; pageSizes: string[] };
  public data: Subject<DataStateChangeEventArgs>;
  public pageOptions: Object;
  public state: DataStateChangeEventArgs;
  public groupBy = ["ParentAccount"];

  public childGrid: GridModel;
  query: QueryString;

  public columnBluePrint: CustomGridColumns[] = [
    {
      key: "Id",
      header: "Id",
      visible: false,
      width: 30,
      type: "number"
    },
    {
      key: "AccountId",
      header: "Account Id",
      visible: true,
      width: 70,
      type: "string"
    },
    {
      key: "AccountName",
      header: "Account Name",
      visible: true,
      width: 130,
      type: "string"
    },
    {
      key: "Category",
      header: "Category",
      visible: true,
      width: 100,
      type: "string"
    },
    {
      key: "ParentAccount",
      header: "Control Account",
      visible: true,
      width: 50,
      type: "string"
    },
    {
      key: "Active",
      header: "Active",
      visible: true,
      width: 90,
      type: "boolean",
      format: "yMd"
    },
    {
      key: "DateAdded",
      header: "Added",
      visible: false,
      width: 50,
      type: "date",

      format: "yMd"
    },
    {
      key: "DateUpdated",
      header: "Updated",
      visible: false,
      width: 50,
      type: "date",

      format: "yMd"
    }
  ];

  constructor(
    private router: Router,
    private accountApi: AccountsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.data = this.accountApi;
    this.initialPage = {
      pageSize: PageSizes[0],
      pageSizes: this.pageSizes
    };

    this.filterOptions = { type: "Menu" }; // put unique filter menue for each column based on the column type
    this.query = new QueryString();
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.accountApi.execute(state);
  }

  public databound(args) {
    this.grid.groupModule.collapseAll();
  }

  ngOnInit() {
    // this.grid.groupModule.collapseAll();

    this.pageSettings = { pageSize: 5, pageCount: 4, currentPage: 1 };
    const state = { skip: 0, take: 20 };

    this.selectionOptions = { type: "Single" }; // allow only single row to be selected at a time for edit or delete

    this.editSettings = { allowDeleting: true };
    this.toolbarOptions = [
      { text: "Create Account", prefixIcon: "e-create", id: "createAccount" },
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

    this.groupOptions = {
      disablePageWiseAggregates: false,
      showDropArea: true,
      columns: ["ParentAccount"]
    };
    this.accountApi.execute(state);
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
  }

  onDataBound() {
    this.grid.detailRowModule.expandAll();
  }
  // Click handler for when the toolbar is cliked
  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === "createAccount") {
      this.router.navigate(["accounts/new"]); // when user click add route to the accounts form
    }
    if (args.item.id === "expandall") {
      this.grid.groupModule.expandAll();
    }
    if (args.item.id === "collapseall") {
      this.grid.groupModule.collapseAll();
    }
    if (args.item.id === "print") {
      // this.grid.pageSettings.pageSize = this.grid.pageSettings.totalRecordsCount;
      this.grid.groupModule.expandAll();
      setTimeout(() => {
        window.print();
      }, 300);
    }
    if (args.item.id === "Grid_excelexport") {
      this.grid.pageSettings.pageSize = this.grid.pageSettings.totalRecordsCount;
      setTimeout(() => {
        this.grid.excelExport(this.getExcelExportProperties());
      }, 1000);
    }
  }

  actionEndHandler(args: ActionEventArgs) {
    switch (args.requestType) {
      case "sorting":
        this.query.sortDirection = args["direction"];
        this.query.sortBy = args["columnName"];

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

    if (this.query.sortBy) {
      searchString += `sortBy=${this.query.sortBy}&`;
    }

    if (this.query.sortDirection) {
      searchString += `sortDirection=${this.query.sortDirection}&`;
    }

    searchString += `pageSize=${this.query.pageSize}&pageNumber=${
      this.query.pageNumber
    }`;
  }

  deleteAccount(data: any) {
    this.accountApi.deleteAccount(data["Id"]).subscribe();
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
