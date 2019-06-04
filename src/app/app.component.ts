import { Component, ViewChild, OnInit } from "@angular/core";
import {
  TreeViewComponent,
  NodeSelectEventArgs,
  Sidebar,
  SidebarComponent
} from "@syncfusion/ej2-angular-navigations";
import { Router } from "@angular/router";
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
import { AccountingApiService } from "./Services/accounting-api.service";
import { AvailableYearsModel } from "./Services/system-data.model";
import { NAVIGATION_LINKS } from "./navigation-data.model";
import { FilterService } from "./shared/filter-option/filter.service";
import { Location } from "@angular/common";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public cssClass = "custom";
  constructor(
    private router: Router,
    private accountingApi: AccountingApiService,
    private location: Location
  ) {
    this.yearFields = { key: "Year", value: "Year" };
    this.field = {
      dataSource: this.smartAccountingLinks,
      id: "id",
      text: "name",
      child: "subChild",
      expanded: "expanded",
      selected: "selected"
    };
  }
  title = "";
  @ViewChild("sidebar")
  public sidebar: SidebarComponent;
  public type = "Auto";
  public target = ".content";
  @ViewChild("tree")
  public tree: TreeViewComponent;
  @ViewChild("togglebtn")
  public togglebtn: ButtonComponent;

  public yearData: AvailableYearsModel[] = [];

  public smartAccountingLinks: object[] = NAVIGATION_LINKS;

  public field: object;
  public yearFields: { key: string; value: string };
  ngOnInit(): void {
    this.accountingApi
      .getAvailableYears()
      .subscribe((data: AvailableYearsModel[]) => (this.yearData = data));
  }

  public loadRoutingContent(args: NodeSelectEventArgs): void {
    const data: any = this.tree.getTreeData(args.node);
    const routerLink: string = data[0].url;

    if (routerLink !== "parent") {
      this.router.navigate([routerLink]);
    }
  }

  yearChanged(data: any): void {
    if (data) {
      this.accountingApi.setSelectedYear(data);
    }

    console.log(this.accountingApi.getSelectedYear());
  }

  btnClick() {
    if (this.togglebtn.element.classList.contains("e-active")) {
      this.togglebtn.content = "";
      this.sidebar.show();
    } else {
      this.togglebtn.content = "";
      this.sidebar.hide();
    }
  }
}
