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
import { element } from "@angular/core/src/render3";
import {
  SecurityService,
  AppUserAuth
} from "./core/services/security-service.service";
import { ItemModel, MenuEventArgs, Item } from "@syncfusion/ej2-splitbuttons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public securityObject: AppUserAuth;
  public cssClass = "custom";
  public NAVIGATION_LINKS = [
    {
      id: "00",
      name: "Dashboard",
      enabled: true,
      expanded: false,
      url: "",
      selected: true,
      icon: "fas fa-columns",
      privilage: "canViewDashboard"
    },
    {
      id: "01",
      name: "Account Managment",
      expanded: false,
      enabled: true,
      url: "parent",
      icon: "fas fa-sitemap",
      selected: false,
      privilage: "canViewAccount",
      subChild: [
        {
          id: "01-01",
          name: "Account chart",
          url: "/accounts",
          expanded: false,
          selected: false,
          enabled: true,
          privilage: "canViewAccount"
        },
        {
          id: "01-02",
          name: "Account catagory",
          url: "/account-catagories",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewAccountCategory"
        },
        {
          id: "01-03",
          name: "Account Type",
          url: "/account-types",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewAccountType"
        },
        {
          id: "01-04",
          name: "Create new year data",
          url: "new-year-data",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canCreateNewYear"
        }
      ]
    },
    {
      id: "02",
      name: "Ledger Entries",
      expanded: false,
      enabled: true,
      url: "parent",
      selected: false,
      icon: "fas fa-book-open",
      privilage: "canViewLedger",
      subChild: [
        {
          id: "02-01",
          name: "Ledger Entry View",
          url: "/ledgers",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewLedgerEntry"
        }
      ]
    },
    {
      id: "03",
      name: "Settings",
      expanded: false,
      enabled: true,
      url: "parent",
      selected: false,
      icon: "fas fa-cogs",
      privilage: "canViewSettings",
      subChild: [
        {
          id: "03-01",
          name: "Lookup",
          url: "/lookups",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewLookup"
        }
      ]
    },
    {
      id: "04",
      name: "Reports",
      expanded: false,
      enabled: true,
      url: "parent",
      selected: false,
      icon: "fas fa-briefcase",
      privilage: "canViewReports",
      subChild: [
        {
          id: "04-01",
          name: "Checklist",
          url: "/reports/checklist",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewChecklist"
        },
        {
          id: "04-02",
          name: "Balance Sheet",
          url: "/reports/balance-sheet",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewBalanceSheet"
        },
        {
          id: "04-03",
          name: "Income Statement",
          url: "reports/income-statement",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewIncomeStatment"
        },
        {
          id: "04-04",
          name: "Subsidiary Ledger",
          url: "reports/subsidaries",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewSubsidaryLedger"
        },
        {
          id: "04-05",
          name: "Trial Balance detail",
          url: "reports/trial-balance-detail",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewTrialBalanceDetail"
        },
        {
          id: "04-06",
          name: "Consolidated Trial Balance",
          url: "reports/consolidated-trial-balance",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewAccount"
        },
        {
          id: "04-08",
          name: "Accounts Schedule",
          url: "reports/accounts-schedule",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewAccount"
        },
        {
          id: "04-09",
          name: "Cost of goods sold",
          url: "reports/cost-of-goods-sold",
          expanded: false,
          enabled: true,
          selected: false,
          privilage: "canViewAccount"
        }
      ]
    }
  ];
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

    this.NAVIGATION_LINKS.forEach((element, index) => {
      if (index === 0) {
        return null;
      }
      element.subChild.forEach((el, i) => {
        if (!this.securityService.hasClaim(el.privilage)) {
          element.subChild.splice(i, 1);
          console.log(index, "---", element.subChild);
        }
      });
      if (element.subChild.length === 0) {
        this.NAVIGATION_LINKS.splice(index, 1);
      }
    });
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

  public smartAccountingLinks: object[] = this.NAVIGATION_LINKS;

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
        { claimType: "canDeleteAccount", claimValue: "false" },
        { claimType: "canViewAccountType", claimValue: "true" },
        { claimType: "canAddAccountType", claimValue: "true" },
        { claimType: "canUpdateAccountType", claimValue: "true" },
        { claimType: "canDeleteAccountType", claimValue: "false" },

        { claimType: "canViewAccountCategory", claimValue: "false" },
        { claimType: "canAddAccountCategory", claimValue: "true" },
        { claimType: "canUpdateAccountCategory", claimValue: "true" },
        { claimType: "canDeleteAccountCategory", claimValue: "false" },
        { claimType: "canCreateNewYear", claimValue: "false" }
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

  /* logOut(): void {
    this.securityService.logOut();
  } */
}
