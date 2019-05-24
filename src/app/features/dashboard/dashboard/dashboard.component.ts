import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public dashboardItems: any = [
    { name: "Asset", icon: "fas fa-wallet" },
    { name: "Capital", icon: "fas fa-coins" },
    { name: "Liability", icon: "fas fa-funnel-dollar" },
    { name: "Expence", icon: "fas fa-comments-dollar" },
    { name: "Revenue", icon: "fas fa-hand-holding-usd" },
    { name: "Dashboard", icon: "" }
  ];
  public primaryXAxis: object;
  public chartData: object[];
  public title: string;
  public marker: object;
  public titleStyle: object;
  constructor() {}

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
  }
}
