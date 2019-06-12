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
// import { NAVIGATION_LINKS } from "./navigation-data.model";
import { FilterService } from "./shared/filter-option/filter.service";
import { Location } from "@angular/common";
import {
  SecurityService,
  AppUserAuth
} from "./core/services/security-service.service";
import { ItemModel, MenuEventArgs, Item } from "@syncfusion/ej2-splitbuttons";
import { NAVIGATION_LINKS } from "./navigation-data.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public securityObject: AppUserAuth;
  public cssClass = "custom";
  public items: ItemModel[] = [
    {
      text: "Sign out"
    }
  ];
  constructor(
    private router: Router,
    private accountingApi: AccountingApiService,
    private location: Location,
    private securityService: SecurityService
  ) {
    this.yearFields = { key: "Year", value: "Year" };
    this.field = {
      dataSource: this.smartAccountingLinks,
      id: "id",
      text: "name",
      child: "subChild",
      expanded: "expanded",
      selected: "selected",
      enabled: "enabled"
    };

    /*   if (index === 0) {
        return null;
      } */
    for (let index = 1; index < this.smartAccountingLinks.length; index++) {
      for (
        let i = this.smartAccountingLinks[index].subChild.length - 1;
        i > -1;
        i--
      ) {
        if (
          !this.securityService.hasClaim(
            this.smartAccountingLinks[index].subChild[i].privilage
          )
        ) {
          this.smartAccountingLinks[index].subChild.splice(i, 1);
        }
      }

      if (this.smartAccountingLinks[index].subChild.length === 0) {
        this.smartAccountingLinks.splice(index, 1);
        --index;
      }
    }
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

  public smartAccountingLinks = NAVIGATION_LINKS;

  public field: object;
  public yearFields: { key: string; value: string };
  ngOnInit(): void {
    this.accountingApi
      .getAvailableYears()
      .subscribe((data: AvailableYearsModel[]) => (this.yearData = data));

    this.securityObject = this.securityService.securityObject;
  }

  public loadRoutingContent(args: NodeSelectEventArgs): void {
    const data: any = this.tree.getTreeData(args.node);
    const routerLink: string = data[0].url;

    if (routerLink !== "parent") {
      this.router.navigate([routerLink]);
    }

    const x = {
      bearerToken: "asdfghjjklyyrrffghjjj",
      isAuthenticated: true,
      claims: [
        { claimType: "canViewAccount", claimValue: "true" },
        { claimType: "canAddAccount", claimValue: "true" },
        { claimType: "canUpdateAccount", claimValue: "true" },
        { claimType: "canDeleteAccount", claimValue: "true" },
        { claimType: "canViewAccountCategory", claimValue: "true" },
        { claimType: "canAddAccountCategory", claimValue: "true" },
        { claimType: "canUpdateAccountCategory", claimValue: "true" },
        { claimType: "canDeleteAccountCategory", claimValue: "true" },
        { claimType: "canViewAccountType", claimValue: "true" },
        { claimType: "canAddAccountType", claimValue: "true" },
        { claimType: "canUpdateAccountType", claimValue: "true" },
        { claimType: "canDeleteAccountType", claimValue: "true" },
        { claimType: "canCreateNewYear", claimValue: "true" },
        { claimType: "canViewLedgerEntry", claimValue: "true" },
        { claimType: "canAddLedgerEntry", claimValue: "true" },
        { claimType: "canUpdateLedgerEntry", claimValue: "true" },
        { claimType: "canDeleteLedgerEntry", claimValue: "true" },
        { claimType: "canViewLookups", claimValue: "true" },
        { claimType: "canAddLookups", claimValue: "true" },
        { claimType: "canUpdateLookups", claimValue: "true" },
        { claimType: "canDeleteLookups", claimValue: "true" },
        { claimType: "canViewBalanceSheet", claimValue: "true" },
        { claimType: "canViewIncomeStatement", claimValue: "true" },
        { claimType: "canViewAccountSchedule", claimValue: "true" },
        { claimType: "canViewAccountChecklist", claimValue: "true" },
        {
          claimType: "canViewConsolidatedTrialBalance",
          claimValue: "true"
        },
        { claimType: "canViewSubsidaryLedger", claimValue: "true" },
        { claimType: "canViewTrialBalanceDetail", claimValue: "true" },
        {
          claimType: "canViewCostOfGoodsSold",
          claimValue: "true"
        }
      ],
      userName: "Mikael Araya"
    };
    localStorage.clear();
    localStorage.setItem("accountingBearerToken", JSON.stringify(x));

    if (localStorage.getItem("accountingBearerToken") === null) {
      localStorage.setItem("accountingBearerToken", JSON.stringify(x));
    }
  }

  public select(args: MenuEventArgs) {
    if (args.item.text === "Sign out") {
      this.securityService.logOut();
    }
  }

  yearChanged(data: any): void {
    if (data) {
      this.accountingApi.setSelectedYear(data);
    }
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
