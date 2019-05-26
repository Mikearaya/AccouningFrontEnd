import { Component, OnInit } from "@angular/core";
import { ReportApiService } from "../report-api.service";
import { IncomeStatmentViewModel } from "../report";

@Component({
  selector: "app-income-statment",
  templateUrl: "./income-statment.component.html",
  styleUrls: ["./income-statment.component.css"]
})
export class IncomeStatmentComponent implements OnInit {
  public data: IncomeStatmentViewModel;
  public searchString: string;
  lastFilter: string;
  constructor(private reportService: ReportApiService) {}

  ngOnInit() {
    this.reportService
      .getIncomeStatment(this.searchString)
      .subscribe((data: IncomeStatmentViewModel) => {
        this.data = data;
      });
  }
  print() {
    window.print();
  }

  onFiltered(data: string = ""): void {
    this.lastFilter = data;

    this.reportService
      .getIncomeStatment(`${data}`)
      .subscribe((result: IncomeStatmentViewModel) => {
        this.data = result;
      });
  }
}
