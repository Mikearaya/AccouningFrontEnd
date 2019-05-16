import { Component, OnInit, ViewChild } from "@angular/core";
import { GridModel } from "@syncfusion/ej2-grids";
import { GridComponent } from "@syncfusion/ej2-angular-grids";
import { Checklist } from "../report";
import { ChecklistService } from "./checklist.service";
import { ClickEventArgs } from "@syncfusion/ej2-angular-navigations";
import { DialogUtility } from "@syncfusion/ej2-popups";
@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"]
})
export class ChecklistComponent implements OnInit {
  public gridData: object[];
  public data: Checklist[];
  public toolbar: object;
  public Dialog: any;
  constructor(private checklistService: ChecklistService) {}
  public childGrid: GridModel = {
    dataSource: this.data,
    queryString: "LedgerId",
    columns: [
      {
        field: "ControlAccountId",
        headerText: "General",
        textAlign: "Left",
        width: 120
      },
      // { field: "LedgerId", headerText: "Ledgeddddr", width: 150 },
      { field: "AccountName", headerText: "Account name", width: 150 },
      { field: "Debit", headerText: "Debit", width: 150 },
      { field: "Credit", headerText: "Credit", width: 150 }
    ]
  };
  @ViewChild("grid")
  public grid: GridComponent;

  ngOnInit(): void {
    this.checklistService
      .getChecklistReport()
      .subscribe((data: Checklist[]) => {
        this.data = data;
        this.gridData = this.data;
        const x = [];
        this.data.forEach(element => {
          element.Entries.forEach(elementx => {
            x.push(elementx);
          });
        });
        console.log(x);
        this.childGrid.dataSource = x;
        console.log("child", this.childGrid.dataSource);
      });
    this.toolbar = [
      { text: "Expand All", prefixIcon: "e-expand", id: "expandall" },
      { text: "Collapse All", prefixIcon: "e-collapse", id: "collapseall" },
      { text: "Print", prefixIcon: "e-print", id: "print" }
    ];
  }
  clickHandler(args: ClickEventArgs): void {
    // var c = confirm("expand all entries or print as is");
    if (args.item.id === "expandall") {
      this.grid.detailRowModule.expandAll();
    }

    if (args.item.id === "collapseall") {
      this.grid.detailRowModule.collapseAll();
    }
    if (args.item.id === "print") {
      this.Dialog = DialogUtility.confirm({
        title: " Confirmation Dialog",
        content: "Do you want to print as it is!",
        okButton: { text: "Yes", click: this.okClick.bind(this) },
        cancelButton: {
          text: "Expand and Print",
          click: this.cancelClick.bind(this)
        },
        showCloseIcon: true,
        closeOnEscape: true,
        animationSettings: { effect: "Zoom" }
      });
    }
  }
  expand(): void {
    this.grid.detailRowModule.expandAll();
  }

  collapse(): void {
    this.grid.detailRowModule.collapseAll();
  }

  printPage() {
    this.expand();

    setTimeout(() => {
      window.print();
    }, 100);
  }

  private okClick(): void {
    this.Dialog.hide();
    setTimeout(() => {
      window.print();
    }, 400);
  }
  private cancelClick(): void {
    this.Dialog.hide();
    this.grid.detailRowModule.expandAll();
    setTimeout(() => {
      window.print();
    }, 400);
  }
}
