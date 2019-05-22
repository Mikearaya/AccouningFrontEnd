import { Component, OnInit, ViewChild } from "@angular/core";
import {
  GridModel,
  ActionEventArgs,
  PageSettingsModel
} from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { Checklist, LedgerChecklistView } from "../report";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { ReportApiService } from "../report-api.service";
import {
  PageChanged,
  PaginationComponent
} from "src/app/shared/pagination/pagination.component";
import { FilterOptionComponent } from "src/app/shared/filter-option/filter-option.component";
@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"]
})
export class ChecklistComponent implements OnInit {
  @ViewChild("filter")
  public filter: FilterOptionComponent;
  @ViewChild("pagger")
  public pagger: PaginationComponent;
  public gridData: object[];
  public data: Checklist[];
  public toolbar: object;
  public Dialog: any;
  public initialPage: PageSettingsModel;
  public summaryRows;
  public totalPages: number;
  filterSettings: { type: string };
  // current: { pageSize: number; pageNumber: number };

  constructor(private checklistService: ReportApiService) {
    this.filterSettings = { type: "Menu" };
    /*     this.current.pageSize = 10;
    this.current.pageNumber = 1; */
  }
  public childGrid: GridModel = {
    dataSource: this.data,
    queryString: "LedgerId",
    columns: [
      {
        field: "ControlAccountId",
        headerText: "General",
        textAlign: "Left",
        width: 120
      },
      { field: "AccountName", headerText: "Account name", width: 150 },
      { field: "Debit", headerText: "Debit", width: 150 },
      { field: "Credit", headerText: "Credit", width: 150 }
    ]
  };
  lastFilter = "";
  @ViewChild("grid")
  public grid: GridComponent;

  ngOnInit(): void {
    this.initialPage = {
      pageSizes: ["3", "20", "50", "100", "200", "500", "1000", "All"],
      pageSize: 20
    };

    this.onFiltered();
    this.toolbar = [
      { text: "Expand All", prefixIcon: "e-expand", id: "expandall" },
      { text: "Collapse All", prefixIcon: "e-collapse", id: "collapseall" },
      { text: "Print", prefixIcon: "e-print", id: "print" },
      {
        text: "ExcelExport",
        prefixIcon: "e-Excel_Export",
        id: "Grid_excelexport"
      }
    ];
  }

  onActionComplete(args: ActionEventArgs) {
    /*     if (
      this.current.pageSize !== this.grid.pageSettings.pageSize ||
      this.current.pageNumber !== this.grid.pageSettings.currentPage
    ) {
      this.current.pageSize = this.grid.pageSettings.pageSize;
      this.current.pageNumber = this.grid.pageSettings.currentPage;
 */
    this.onFiltered();
    //    }
  }

  generateSearchString(): string {
    return `pageSize=${this.grid.pageSettings.pageSize}&pageNumber=${
      this.grid.pageSettings.currentPage
    }`;
  }
  onFiltered(data: string = ""): void {
    this.lastFilter = data;

    this.checklistService
      .getChecklistReport(`${data}&${this.generateSearchString()}`)
      .subscribe((result: LedgerChecklistView) => {
        this.data = result.Items;
        this.gridData = result.Items;
        this.initialPage.pageSize = result.Count;

        this.totalPages = result.Count;
        const x = [];
        result.Items.forEach(element => {
          element.Entries.forEach(elementx => {
            x.push(elementx);
          });
        });
        this.childGrid.dataSource = x;
      });
  }

  onPageChanged(event: PageChanged): void {
    const search = this.filter.getFilterContent();

    this.onFiltered(search);
  }

  clickHandler(args: ClickEventArgs): void {
    // var c = confirm("expand all entries or print as is");
    if (args.item.id === "expandall") {
      this.grid.detailRowModule.expandAll();
    }

    if (args.item.id === "collapseall") {
      this.grid.detailRowModule.collapseAll();
    }
    if (args.item.id === "print") {
      this.grid.detailRowModule.expandAll();
      setTimeout(() => {
        window.print();
      }, 400);
    }
    if (args.item.id === "Grid_excelexport") {
      this.grid.detailRowModule.expandAll();
      setTimeout(() => {
        this.grid.excelExport();
      }, 400);
    }
  }

  expand(): void {
    this.grid.detailRowModule.expandAll();
  }

  collapse(): void {
    this.grid.detailRowModule.collapseAll();
  }

  printPage() {
    this.expand();

    setTimeout(() => {
      window.print();
    }, 100);
  }

  dropDownChanged(data: any): void {}
}
