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
import { HttpErrorResponse } from "@angular/common/http";
import { closest } from "@syncfusion/ej2-base";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";

import { AccountTypeService } from "../../../core/services/account-type.service";
import { PageSizes } from "../../../page-model";
import { Subject } from "rxjs";
import { CustomGridColumns } from "src/app/shared/data-view/data-view.component";

@Component({
  selector: "app-account-type-view",
  templateUrl: "./account-type-view.component.html",
  styleUrls: ["./account-type-view.component.css"]
})
export class AccountTypeViewComponent implements OnInit {
  public groupBy = ["Type"];

  public columnBluePrint: CustomGridColumns[] = [
    {
      key: "Id",
      header: "Id",
      visible: false,
      width: 30,
      type: "number"
    },
    {
      key: "Type",
      header: "Account Type",
      visible: true,
      width: 70,
      type: "string"
    },
    {
      key: "AccountType",
      header: "Type",
      visible: true,
      width: 130,
      type: "string"
    },
    {
      key: "IsSummary",
      header: "Summarize Report",
      visible: false,
      width: 100,
      type: "bool"
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
    if (confirm("Are you sure to delete?")) {
      this.accountTypeApi
        .deleteAccountType(data["Id"])
        .subscribe(() => alert("Deleted successfully!"));
    } else {
      return null;
    }
  }

  onDataBound() {
    this.grid.detailRowModule.expandAll();
  }
}
