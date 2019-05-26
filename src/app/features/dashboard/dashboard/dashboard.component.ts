import { Component, OnInit } from "@angular/core";
import { AccountingApiService } from "src/app/Services/accounting-api.service";
import { DashboardViewModel } from "src/app/Services/system-data.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public dashboardItems: { name: string; icon: string; value: number }[] = [
    { name: "Asset", icon: "fas fa-wallet", value: 0 },
    { name: "Capital", icon: "fas fa-coins", value: 0 },
    { name: "Liability", icon: "fas fa-funnel-dollar", value: 0 },
    { name: "Expence", icon: "fas fa-comments-dollar", value: 0 },
    { name: "Revenue", icon: "fas fa-hand-holding-usd", value: 0 },
    { name: "Dashboard", icon: "", value: 0 }
  ];
  public primaryXAxis: object;
  public chartData: object[];
  public title: string;
  public marker: object;
  public titleStyle: object;
  constructor(private accountingService: AccountingApiService) {}

  ngOnInit(): void {
    this.chartData = [
      { month: "Jan", sales: 35 },
      { month: "Feb", sales: 28 },
      { month: "Mar", sales: 34 },
      { month: "Apr", sales: 32 },
      { month: "May", sales: 40 },
      { month: "Jun", sales: 32 },
      { month: "Jul", sales: 35 },
      { month: "Aug", sales: 55 },
      { month: "Sep", sales: 38 },
      { month: "Oct", sales: 30 },
      { month: "Nov", sales: 25 },
      { month: "Dec", sales: 32 }
    ];
    this.primaryXAxis = {
      valueType: "Category"
    };
    this.marker = { visible: true, width: 10, height: 10 };
    this.title = "Unemployment Rates 1975-2010";
    this.titleStyle = {
      size: "18px",
      color: "Red",
      textAlignment: "Far",
      textOverflow: "Wrap"
    };
    this.accountingService
      .getDashboardReport()
      .subscribe((data: DashboardViewModel) => {
        this.dashboardItems[0].value = data.TotalAssets;
        this.dashboardItems[1].value = data.TotalCapital;
        this.dashboardItems[2].value = data.TotalLiability;
        this.dashboardItems[3].value = data.TotalExpense;
        this.dashboardItems[4].value = data.TotalRevenue;
      });
  }
}
