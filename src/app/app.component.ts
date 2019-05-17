import { Component, ViewChild } from "@angular/core";
import {
  TreeViewComponent,
  NodeSelectEventArgs,
  Sidebar,
  SidebarComponent
} from "@syncfusion/ej2-angular-navigations";
import { Router } from "@angular/router";
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "";
  @ViewChild("sidebar")
  public sidebar: SidebarComponent;
  public type = "Auto";
  public target = ".content";
  @ViewChild("tree")
  public tree: TreeViewComponent;
  @ViewChild("togglebtn")
  public togglebtn: ButtonComponent;

  public smartAccountingLinks: object[] = [
    {
      id: "01",
      name: "Account Managment",
      expanded: true,
      enabled: true,
      selected: false,
      subChild: [
        {
          id: "01-01",
          name: "Account chart",
          url: "/accounts",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "01-02",
          name: "Account catagory",
          url: "/account-catagories",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "01-03",
          name: "Account Type",
          url: "/account-types",
          expanded: false,
          enabled: true,
          selected: false
        }
      ]
    },
    {
      id: "02",
      name: "Ledger Entries",
      expanded: true,
      enabled: true,
      selected: false,
      subChild: [
        {
          id: "02-01",
          name: "Ledger Entry View",
          url: "/ledgers",
          expanded: false,
          enabled: true,
          selected: false
        }
      ]
    },
    {
      id: "03",
      name: "Settings",
      expanded: true,
      enabled: true,
      selected: false,
      subChild: [
        {
          id: "03-01",
          name: "Lookup",
          url: "/lookups",
          expanded: false,
          enabled: true,
          selected: false
        }
      ]
    },
    {
      id: "04",
      name: "Reports",
      expanded: true,
      enabled: true,
      selected: false,
      subChild: [
        {
          id: "04-01",
          name: "Checklist",
          url: "/reports/checklist",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "04-02",
          name: "Balance Sheet",
          url: "/reports/filter",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "04-03",
          name: "Profit & Loss",
          url: "/profit-and-loss",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "04-04",
          name: "COGS Schedule",
          url: "/cogs-schedule",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "04-05",
          name: "Subsidiary Ledger",
          url: "reports/subsidaries",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "04-06",
          name: "OE Cost Center",
          url: "/oe-cost-center",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "04-07",
          name: "OE Detail",
          url: "/oe-detail",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "04-08",
          name: "Trial Balance Consolidated",
          url: "/trial-balance-consolidated",
          expanded: false,
          enabled: true,
          selected: false
        },
        {
          id: "04-09",
          name: "Trial Balance Detail",
          url: "/trial-balce-detail",
          expanded: false,
          enabled: true,
          selected: false
        }
      ]
    }
  ];

  public field: Object;
  constructor(private router: Router) {
    this.field = {
      dataSource: this.smartAccountingLinks,
      id: "id",
      text: "name",
      child: "subChild",
      expanded: "expanded",
      selected: "selected"
    };
  }

  public loadRoutingContent(args: NodeSelectEventArgs): void {
    const data: any = this.tree.getTreeData(args.node);
    const routerLink: string = data[0].url;

    if (routerLink) {
      this.router.navigate([routerLink]);
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
