import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DialogComponent } from "@syncfusion/ej2-angular-popups";
import { container } from "@angular/core/src/render3";
import { EmitType } from "@syncfusion/ej2-base";

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html",
  styleUrls: ["./dialog-box.component.css"]
})
export class DialogBoxComponent implements OnInit {
  @ViewChild("ejDialog") ejDialog: DialogComponent;
  // create element reference for dialog target element
  @ViewChild("container", { read: ElementRef }) container: ElementRef;
  // this dialog shows within the target element

  public targetElement: HTMLElement;

  constructor() {}

  ngOnInit() {
    this.initializeTarget();
  }

  public initializeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  };

  public onOpenDialog = function(event: any): void {
    this.ejDialog.show();
  };
}
