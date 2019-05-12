import { Component, OnInit } from "@angular/core";
import { LookupService } from "../../../core/services/lookup.service";
import { LookupView } from "../lookups";

@Component({
  selector: "app-lookup-view",
  templateUrl: "./lookup-view.component.html",
  styleUrls: ["./lookup-view.component.css"]
})
export class LookupViewComponent implements OnInit {
  public data: any;
  public customAttributes: { class: string };
  public filterOptions: { type: string };
  public columnBluePrint = [
    {
      key: "Id",
      header: "Id",
      visible: true,
      width: "40",
      type: "number"
    },
    {
      key: "Type",
      header: "Type",
      visible: true,
      width: "100",
      type: "string"
    },
    {
      key: "Value",
      header: "Value",
      visible: true,
      width: "100",
      type: "string"
    }
  ];

  constructor(private lookupApi: LookupService) {}
  ngOnInit() {
    this.loadLookups();
  }

  deleteLookup(data: any) {
    this.lookupApi.deleteLookup(data["Id"]).subscribe(() => alert("called"));
  }
  loadLookups(search: string = "") {
    this.lookupApi.getLookups(search).subscribe((data: LookupView[]) => {
      this.data = data;
    });
  }

  filterLookup(data: any) {
    // alert(JSON.stringify(data));
    this.loadLookups(data);
  }
}
