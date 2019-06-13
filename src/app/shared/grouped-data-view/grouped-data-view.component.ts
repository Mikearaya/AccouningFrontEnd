import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { FilterSettingsModel, dataBound } from "@syncfusion/ej2-treegrid";
import {
  ExcelExportProperties,
  TextWrapSettingsModel,
  ToolbarItems,
  EditSettingsModel,
  SelectionSettingsModel,
  PageSettingsModel,
  CommandModel,
  GroupSettingsModel,
  DataStateChangeEventArgs,
  GridModel,
  ActionEventArgs,
  Column,
  IRow,
  Grid
} from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { PageSizes, PreferenceSettings } from "src/app/page-model";
import { Subject } from "rxjs";
import { QueryString, FilterEventModel } from "../data-view/data-view.model";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ClickEventArgs } from "@syncfusion/ej2-navigations/src/toolbar";
import { CustomGridColumns } from "../data-view/data-view.component";
import { closest } from "@syncfusion/ej2-base";
import { SecurityService } from "src/app/core/services/security-service.service";

@Component({
  selector: "app-grouped-data-view",
  templateUrl: "./grouped-data-view.component.html",
  styleUrls: ["./grouped-data-view.component.css"]
})
export class GroupedDataViewComponent implements OnInit {
  title = "Fiscal Calander Period";

  // @Input()
  // public gridCommands: CommandModel[];

  @ViewChild("grid")
  public grid: GridComponent;

  @Input()
  public columnsList: CustomGridColumns[];

  @Input()
  public data: Subject<DataStateChangeEventArgs>;
  @Input()
  public showUpdate = true;
  @Input()
  public showDelete = true;
  @Input()
  public showView: boolean;
  @Input()
  public showAdd = true;
  @Input()
  public showPrint: boolean;
  @Input()
  public showPdfExport: boolean;
  @Input()
  public showExcelExport: boolean;
  @Input()
  public showColumnChooser: boolean;
  @Input()
  public enableFilter: boolean;
  @Input()
  public enableSorting: boolean;
  @Input()
  public enablePaging: boolean;
  @Input()
  public enableSearching: boolean;
  @Input()
  public idKey: any;
  @Input()
  public pageSize = 10;

  @Input()
  public pageNumber = 1;

  @Input()
  public totalPages = 1;

  @Input()
  public deleteRoute = "";
  @Input()
  public editRoute: string;
  @Input()
  public addRoute = "";
  @Input()
  public allowGrouping: Boolean;
  @Input()
  public wrapSettings: TextWrapSettingsModel;
  @Input()
  public customAttributes: { class: string };

  @Input()
  public updatePrivilage: string;
  @Input()
  public deletePrivilage: string;

  @Input()
  public addPrivilage: string;

  @Output()
  public dataQueried: EventEmitter<string> = new EventEmitter();
  @Output()
  public rowSelected: EventEmitter<any> = new EventEmitter();
  @Output()
  public deleteRecord: EventEmitter<any> = new EventEmitter();
  @Output()
  public editRecord: EventEmitter<any> = new EventEmitter();

  public excelExportProperties: ExcelExportProperties;
  public filterSettings: FilterSettingsModel;
  public toolbarOptions: Object[];

  public toolbar: ToolbarItems[];
  public editSettings: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;
  public pageSettings: PageSettingsModel;
  public filterOptions: FilterSettingsModel;
  public commands: CommandModel[] = [];
  public groupOptions: GroupSettingsModel = { showDropArea: true };
  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: string; pageSizes: string[] };
  public initail = true;

  @Input()
  public gridData: Subject<DataStateChangeEventArgs>;

  @Input()
  public groupBy: string[] = [];

  @Input()
  public showSearch: boolean;

  @Output()
  public dataStateChaged: EventEmitter<
    DataStateChangeEventArgs
  > = new EventEmitter();

  public pageOptions: Object;
  public state: DataStateChangeEventArgs;

  public childGrid: GridModel;
  query: QueryString;
  prefernce = new PreferenceSettings();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService
  ) {
    this.initialPage = {
      pageSize: this.prefernce.PageSize.toString(),
      pageSizes: this.pageSizes
    };

    this.filterOptions = { type: "Menu" }; // put unique filter menue for each column based on the column type
    this.query = new QueryString();
  }

  ngOnInit() {
    this.toolbarOptions = [];
    this.initilizeCommandColumn();
    if (this.showAdd && this.securityService.hasClaim(this.addPrivilage)) {
      this.toolbarOptions.push({
        text: "Create Account",
        prefixIcon: "e-create",
        id: "createAccount"
      });
    }
    setTimeout(() => {
      this.groupOptions = {
        disablePageWiseAggregates: false,
        showDropArea: true,
        columns: this.groupBy
      };
    }, 100);
    this.pageSettings = {
      pageSize: 5,
      pageCount: 4,
      currentPage: 1
    };
    const state = { skip: 0, take: 20 };

    this.selectionOptions = { type: "Single" }; // allow only single row to be selected at a time for edit or delete

    this.editSettings = { allowDeleting: true };

    if (this.showSearch) {
      this.toolbarOptions.push("Search");
    }

    this.toolbarOptions.push({
      text: "Expand All",
      prefixIcon: "e-expand",
      id: "expandall"
    });
    this.toolbarOptions.push({
      text: "Collapse All",
      prefixIcon: "e-collapse",
      id: "collapseall"
    });

    if (this.showPrint) {
      this.toolbarOptions.push({
        text: "Print",
        prefixIcon: "e-print",
        id: "print"
      });
    }

    if (this.showExcelExport) {
      this.toolbarOptions.push({
        text: "ExcelExport",
        prefixIcon: "e-Excel_Export",
        id: "Grid_excelexport"
      });
    }
  }
  onDataStateChanged(state: DataStateChangeEventArgs) {
    this.dataStateChaged.emit(state);
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
      if (this.addRoute.trim().length === 0) {
        this.router.navigate(["add"], {
          relativeTo: this.activatedRoute
        });
      } else {
        this.router.navigate([this.addRoute]);
      }
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
      const currentPageSize = this.grid.pageSettings.pageSize;
      this.grid.pageSettings.pageSize = this.grid.pageSettings.totalRecordsCount;
      setTimeout(() => {
        this.grid.excelExport(this.getExcelExportProperties());
        this.grid.pageSettings.pageSize = currentPageSize;
      }, 1000);
    }
  }

  initilizeCommandColumn(): void {
    if (
      this.showUpdate &&
      this.securityService.hasClaim(this.updatePrivilage)
    ) {
      this.commands.push({
        buttonOption: {
          iconCss: "e-icons e-edit",
          cssClass: "e-flat",
          click: this.editAction.bind(this)
        }
      });
    }

    if (
      this.showDelete &&
      this.securityService.hasClaim(this.deletePrivilage)
    ) {
      this.commands.push({
        buttonOption: {
          iconCss: "e-icons e-delete",
          cssClass: "e-flat",
          click: this.deleteAction.bind(this)
        }
      });
    }
  }

  deleteAction(event: Event) {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(event.target as Element, ".e-row").getAttribute("data-uid")
    );

    if (confirm("Are you sure to delete")) {
      this.deleteRecord.emit(rowObj.data);
      alert("Deleted successfully!");
    } else {
      return null;
    }

    this.deleteRecord.emit(rowObj.data);
    this.grid.refresh();
    this.grid.destroyTemplate();
  }

  private editAction(event: Event): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(event.target as Element, ".e-row").getAttribute("data-uid")
    );
    const key = this.idKey ? this.idKey : "Id";

    if (this.editRoute) {
      this.router.navigate([this.editRoute]);
    } else {
      this.router.navigate([`${rowObj.data[key]}/update`], {
        relativeTo: this.activatedRoute
      });
    }

    //  this.editRecord.emit(rowObj.data);
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
      case "paging":
        this.query.searchString = args["searchString"];

        break;
    }

    this.prefernce.setPageSize(this.grid.pageSettings.pageSize);
    if (args.requestType !== "refresh") {
      this.dataQueried.emit(this.prepareQuery());
    }

    if (
      this.query.pageSize !== this.grid.pageSettings.pageSize ||
      this.query.pageNumber !== this.grid.pageSettings.currentPage
    ) {
      this.query.pageSize = this.grid.pageSettings.pageSize;
      this.query.pageNumber = this.grid.pageSettings.currentPage;
      this.prefernce.setPageSize(this.grid.pageSettings.pageSize);

      this.dataQueried.emit(this.prepareQuery());
    }
  }

  private prepareQuery(): string {
    let searchString = `selectedColumns=${this.query.selectedColumns.toString()}&`;

    if (this.query.searchString) {
      searchString += `searchString=${this.query.searchString}&`;
    }

    if (this.query.sortBy) {
      searchString += `sortBy=${this.query.sortBy}&sortDirection=${
        this.query.sortDirection
      }&`;
    }

    searchString += `pageSize=${this.query.pageSize}&pageNumber=${
      this.query.pageNumber
    }`;

    return searchString;
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
