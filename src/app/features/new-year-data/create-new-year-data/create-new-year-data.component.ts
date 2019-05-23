import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-new-year-data",
  template: `
    <div>
      <button ejs-button class="e-primary" (click)="create()">Create</button>
    </div>
  `,
  styleUrls: ["./create-new-year-data.component.css"]
})
export class CreateNewYearDataComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  create() {
    alert("create clicked");
  }
}
