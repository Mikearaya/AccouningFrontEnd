import { Component, OnInit, ViewChild } from "@angular/core";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import {
  ExcelExportProperties,
  FilterSettingsModel,
  TextWrapSettingsModel,
  ToolbarItems,
  EditSettingsModel,
  SelectionSettingsModel,
  PageSettingsModel,
  CommandModel,
  GroupSettingsModel,
  GridModel,
  IRow,
  Column,
  ActionEventArgs,
  DataStateChangeEventArgs
} from "@syncfusion/ej2-grids";
import {
  QueryString,
  FilterEventModel
} from "src/app/shared/data-view/data-view.model";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountsService } from "src/app/core/services/accounts.service";
import { HttpErrorResponse } from "@angular/common/http";
import { closest } from "@syncfusion/ej2-base";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { AccountTypeViewModel } from "../account-type";
import { AccountTypeService } from "../account-type.service";
import { PageSizes } from "../../../page-model";
import { Subject } from "rxjs";

@Component({
  selector: "app-account-type-view",
  templateUrl: "./account-type-view.component.html",
  styleUrls: ["./account-type-view.component.css"]
})
export class AccountTypeViewComponent implements OnInit {
  title = "Fiscal Calander Period";

  @ViewChild("grid")
  public grid: GridComponent;
  public data: Subject<DataStateChangeEventArgs>;
  public excelExportProperties: ExcelExportProperties;
  public filterSettings: FilterSettingsModel;
  public toolbarOptions: object;
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

  public childGrid: GridModel;
  query: QueryString;

  constructor(
    private router: Router,
    private accountTypeApi: AccountTypeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialPage = {
      pageSize: this.pageSizes[0],
      pageSizes: this.pageSizes
    };
    this.data = this.accountTypeApi;

    this.query = new QueryString();
  }

  ngOnInit() {
    this.groupOptions = { columns: ["Type"], showDropArea: false };
    this.childGrid = {
      queryString: "ParentAccount",
      columns: [
        {
          field: "Id",
          headerText: "ID",
          textAlign: "Right",
          width: 100
        },
        {
          field: "Type",
          headerText: "Account Type",
          textAlign: "Right",
          width: 120
        },
        {
          field: "AccountType",
          headerText: "Account Type",
          textAlign: "Right",
          width: 120
        }
      ]
    };

    this.filterOptions = { type: "Menu" }; // put unique filter menue for each column based on the column type
    this.selectionOptions = { type: "Single" }; // allow only single row to be selected at a time for edit or delete

    this.toolbarOptions = [
      { text: "Create", prefixIcon: "e-create", id: "create" },
      "Search",
      { text: "Print", prefixIcon: "e-print", id: "print" }
    ];
    this.commands = [
      {
        type: "Edit",
        buttonOption: {
          cssClass: "e-flat",
          iconCss: "e-edit e-icons",
          click: this.editAccountType.bind(this)
        }
      },
      {
        type: "Delete",
        buttonOption: {
          cssClass: "e-flat",
          iconCss: "e-delete e-icons",
          click: this.deleteAccountType.bind(this)
        }
      }
    ];
    this.pageSettings = { pageSize: 15 }; // initial page row size for the grid

    this.accountTypeApi.execute({ skip: 0, take: 20 });
  }

  onDataStateChange(state: DataStateChangeEventArgs): void {
    this.accountTypeApi.execute(state);
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
  }

  editAccountType(data: Event): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(data.target as Element, ".e-row").getAttribute("data-uid")
    );
    if (rowObj.data["Id"]) {
      this.router.navigate([`${rowObj.data["Id"]}/update`], {
        relativeTo: this.activatedRoute
      });
    }
  }

  deleteAccountType(data: Event): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(data.target as Element, ".e-row").getAttribute("data-uid")
    );

    this.accountTypeApi.deleteAccountType(rowObj.data["Id"]).subscribe();
  }

  onDataBound() {
    this.grid.detailRowModule.expandAll();
  }
  // Click handler for when the toolbar is cliked
  toolbarClick(args: ClickEventArgs): void {
    console.log(args.item.id);
    if (args.item.id === "create") {
      this.router.navigate(["account-types/add"]); // when user click add route to the accounts form
    }
    if (args.item.id === "print") {
      this.grid.detailRowModule.expandAll();
      setTimeout(() => {
        window.print();
      }, 400);
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
  }
}
