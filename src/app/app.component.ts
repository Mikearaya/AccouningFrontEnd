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

  public smartAccountingLinks: Object[] = [
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
