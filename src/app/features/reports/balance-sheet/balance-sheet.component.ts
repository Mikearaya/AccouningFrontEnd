import { Component, OnInit } from "@angular/core";
import { ReportApiService } from "../report-api.service";
import { BalanceSheetViewModel } from "../report";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "app-balance-sheet",
  templateUrl: "./balance-sheet.component.html",
  styleUrls: ["./balance-sheet.component.css"]
})
export class BalanceSheetComponent implements OnInit {
  public data: BalanceSheetViewModel;
  public searchString: string;

  constructor(private reportService: ReportApiService) {}

  ngOnInit() {
    this.reportService
      .getBalanceSheet(this.searchString)
      .subscribe((data: BalanceSheetViewModel) => {
        this.data = data;
        console.log(data);
      });
  }
  print() {
    window.print();
  }
}
