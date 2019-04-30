import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
import { closest } from "@syncfusion/ej2-base";
import { FilterEventModel, QueryString } from "./data-view.model";
import {
  TextWrapSettingsModel,
  GroupSettingsModel,
  FilterSettingsModel,
  CommandModel,
  EditSettingsModel,
  SelectionSettingsModel,
  IRow,
  Column,
  ActionEventArgs,
  RowSelectEventArgs
} from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "app-data-view",
  templateUrl: "./data-view.component.html",
  styleUrls: ["./data-view.component.css"]
})
export class DataViewComponent implements OnInit {
  @Input()
  public columnsList: CustomGridColumns[];

  @Input()
  public data: any[] = [];
  @Input()
  public showUpdate: Boolean;
  @Input()
  public showDelete: Boolean;
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
  public editRoute = "";
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

  @ViewChild("grid")
  public grid: GridComponent;

  public initialPage: Object;

  public groupOptions: GroupSettingsModel;
  public filterSettings: FilterSettingsModel;
  public toolbar: Object[] = [];
  public selectOptions: Object;
  public commands: CommandModel[] = [];
  public editSettings: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;
  private query: QueryString;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.query = new QueryString();
  }

  ngOnInit() {
    this.customAttributes = { class: "custom-grid-header" };
    this.initialPage = { pageSize: this.pageSize, pageSizes: true };
    this.groupOptions = { showGroupedColumn: true };
    this.filterSettings = { type: "Menu" };
    this.selectOptions = { type: "Multiple", persistSelection: true };
    this.editSettings = { allowDeleting: true };
    this.wrapSettings = { wrapMode: "Header" };

    this.editSettings = {
      allowEditing: false,
      allowAdding: true,
      allowDeleting: false
    };
    this.selectionOptions = { mode: "Both", type: "Single" };

    this.initilizeCommandColumn();
    this.initializeToolBar();
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
      closest(<Element>event.target, ".e-row").getAttribute("data-uid")
    );
    this.deleteRecord.emit(rowObj.data);
    this.grid.deleteRecord();
  }

  private editAction(event: Event): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(<Element>event.target, ".e-row").getAttribute("data-uid")
    );
    const key = this.idKey ? this.idKey : "Id";
    console.log(rowObj.data);
    this.router.navigate([`${rowObj.data[key]}/update`], {
      relativeTo: this.activatedRoute
    });

    //  this.editRecord.emit(rowObj.data);
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
        this.grid.print();
        break;
    }
  }

  rowIsSelected(event: RowSelectEventArgs): void {
    this.rowSelected.emit(event);
  }
}

export interface CustomGridColumns {
  header: string;
  key: string;
  width?: number;
  format?: string;
  visible?: Boolean;
  type: string;
  textAlign?: string;
  hederAlign?: string;
}
