import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  OnChanges,
  ViewEncapsulation
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { closest, NotifyPropertyChanges } from "@syncfusion/ej2-base";
import { FilterEventModel, QueryString } from "./data-view.model";

import {
  GridComponent,
  TextWrapSettingsModel,
  GroupSettingsModel,
  FilterSettingsModel,
  CommandModel,
  EditSettingsModel,
  SelectionSettingsModel,
  IRow,
  Column,
  ActionEventArgs,
  RowSelectEventArgs,
  DataStateChangeEventArgs,
  GroupSettings
} from "@syncfusion/ej2-angular-grids";

import { Subject } from "rxjs";
import { PageSizes } from "src/app/page-model";

@Component({
  selector: "app-data-view",
  templateUrl: "./data-view.component.html",
  styleUrls: ["./data-view.component.css"]
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class DataViewComponent implements OnInit {
  @Input()
  public columnsList: CustomGridColumns[];

  @Input()
  public data: Subject<DataStateChangeEventArgs>;
  @Input()
  public showUpdate: Boolean;
  @Input()
  public showDelete: Boolean;
  @Input()
  public showView: Boolean;
  @Input()
  public showAdd: Boolean = true;
  @Input()
  public showPrint: Boolean;
  @Input()
  public showPdfExport: Boolean;
  @Input()
  public showExcelExport: Boolean;
  @Input()
  public showColumnChooser: Boolean;
  @Input()
  public enableFilter: Boolean;
  @Input()
  public enableSorting: Boolean;
  @Input()
  public enablePaging: Boolean;
  @Input()
  public enableSearching: Boolean;
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

  @Output()
  public dataQueried: EventEmitter<string> = new EventEmitter();
  @Output()
  public rowSelected: EventEmitter<any> = new EventEmitter();
  @Output()
  public deleteRecord: EventEmitter<any> = new EventEmitter();
  @Output()
  public editRecord: EventEmitter<any> = new EventEmitter();

  @Input()
  public groupByOptions: GroupSettingsModel = {};

  @Output()
  public dataStateChaged: EventEmitter<
    DataStateChangeEventArgs
  > = new EventEmitter();

  @ViewChild("grid")
  public grid: GridComponent;

  public pageSizes: string[] = PageSizes;
  public initialPage: { pageSize: number; pageSizes: string[] };
  public filterSettings: FilterSettingsModel;
  public toolbar: Object[] = [];
  public selectOptions: Object;
  public commands: CommandModel[] = [];
  public editSettings: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;
  private query: QueryString;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.initialPage = { pageSize: 50, pageSizes: this.pageSizes };
    this.query = new QueryString();
  }

  ngOnInit() {
    this.customAttributes = { class: "custom-grid-header" };

    this.filterSettings = { type: "Menu" };
    this.selectOptions = { type: "Multiple", persistSelection: true };
    this.editSettings = {
      allowDeleting: true,
      allowAdding: true
    };
    this.wrapSettings = { wrapMode: "Header" };

    this.selectionOptions = { mode: "Both", type: "Single" };

    this.initilizeCommandColumn();
    this.initializeToolBar();
    this.groupByOptions = {
      disablePageWiseAggregates: false,
      showDropArea: true,
      columns: ["ParentAccount"]
    };
  }
  initilizeCommandColumn(): void {
    if (this.showUpdate) {
      this.commands.push({
        buttonOption: {
          iconCss: "e-icons e-edit",
          cssClass: "e-flat",
          click: this.editAction.bind(this)
        }
      });
    }

    if (this.showDelete) {
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
      // setTimeout(() => {
      //   this.initialPage = { pageSize: 50, pageSizes: this.pageSizes };
      // }, 100);
      // this.initialPage = { pageSize: 50, pageSizes: this.pageSizes };
      alert("Deleted successfully!");
    } else {
      return null;
    }
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

  onDataStateChanged(state: DataStateChangeEventArgs) {
    this.dataStateChaged.emit(state);
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

    if (args.requestType !== "refresh") {
      this.dataQueried.emit(this.prepareQuery());
    }

    if (
      this.query.pageSize !== this.grid.pageSettings.pageSize ||
      this.query.pageNumber !== this.grid.pageSettings.currentPage
    ) {
      this.query.pageSize = this.grid.pageSettings.pageSize;
      this.query.pageNumber = this.grid.pageSettings.currentPage;

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

  initializeToolBar(): void {
    if (this.showAdd) {
      this.toolbar.push("Add");
    }

    if (this.showPdfExport) {
      this.toolbar.push("PdfExport");
    }
    if (this.showExcelExport) {
      this.toolbar.push("ExcelExport");
    }
    if (this.showPrint) {
      this.toolbar.push("Print");
    }

    if (this.enableSearching) {
      this.toolbar.push("Search");
    }

    if (this.showColumnChooser) {
      this.toolbar.push("ColumnChooser");
    }
  }

  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
      case "dataview_add":
        if (this.addRoute.trim().length === 0) {
          this.router.navigate(["add"], { relativeTo: this.activatedRoute });
        } else {
          this.router.navigate([this.addRoute]);
        }
        break;
      case "dataview_pdfexport":
        this.grid.pdfExport();
        break;
      case "dataview_excelexport":
        this.grid.excelExport();
        break;
      case "dataview_print":
        window.print();
        break;
    }
  }

  rowIsSelected(event: RowSelectEventArgs): void {
    this.rowSelected.emit(event);
  }

  // deleteCatagory(event: Event) {
  //   this.deleteRecord.emit(event);
  // }
}

export interface CustomGridColumns {
  header: string;
  key: string;
  width?: number;
  format?: string;
  visible?: boolean;
  type: string;
  textAlign?: string;
  hederAlign?: string;
}
