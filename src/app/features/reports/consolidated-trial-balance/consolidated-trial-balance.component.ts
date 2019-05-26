import { Component, OnInit, ViewChild } from "@angular/core";
import { ReportApiService } from "../report-api.service";
import { ConsolidatedTrialBalanceViewModel } from "../report";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { GridComponent } from "@syncfusion/ej2-angular-grids";

@Component({
  selector: "app-consolidated-trial-balance",
  templateUrl: "./consolidated-trial-balance.component.html",
  styleUrls: ["./consolidated-trial-balance.component.css"]
})
export class ConsolidatedTrialBalanceComponent implements OnInit {
  public data: ConsolidatedTrialBalanceViewModel[];
  public initialPage: object;
  public toolbar: object;
  lastFilter: string;

  constructor(private reportService: ReportApiService) {
    this.initialPage = {
      pageSizes: ["20", "50", "100", "200", "500", "1000", "All"],
      pageSize: 20
    };
  }
  @ViewChild("grid")
  public grid: GridComponent;
  ngOnInit() {
    this.reportService
      .getConsolidatedTrialBalance("")
      .subscribe((data: ConsolidatedTrialBalanceViewModel[]) => {
        this.data = data;
      });

    this.toolbar = [
      { text: "Print", prefixIcon: "e-print", id: "print" },
      {
        text: "ExcelExport",
        prefixIcon: "e-Excel_Export",
        id: "Grid_excelexport"
      }
    ];
  }

  generateSearchString(): string {
    return `pageSize=${this.grid.pageSettings.pageSize};pageNumber=${
      this.grid.pageSettings.currentPage
    }`;
  }
  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === "print") {
      window.print();
    }
    if (args.item.id === "Grid_excelexport") {
      this.grid.excelExport();
    }
  }

  onFiltered(data: string = ""): void {
    this.lastFilter = data;

    this.reportService
      .getConsolidatedTrialBalance(`${data}&${this.generateSearchString()}`)
      .subscribe((result: ConsolidatedTrialBalanceViewModel[]) => {
        this.data = result;
      });
  }
}
