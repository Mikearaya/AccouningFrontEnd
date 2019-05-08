import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from "@angular/forms";
import { LookupView } from "../lookups";
import { LookupService } from "../lookup.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-lookup-form",
  templateUrl: "./lookup-form.component.html",
  styleUrls: ["./lookup-form.component.css"]
})
export class LookupFormComponent implements OnInit {
  public lookupForm: FormGroup;
  public isUpdate = false;
  public typeFields: Object;
  public typeList: Object;
  public LookupId: any;
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private lookupApi: LookupService
  ) {
    this.createLookupForm();
    this.typeList = ["Appdiv", "Appdiv", "appdiv"];
  }

  ngOnInit() {
    // get the look Id from route parameter if present
    this.LookupId = this.activatedRoute.snapshot.paramMap.get("lookupId");

    if (this.LookupId) {
      // if lookup id is present get the related account value
      this.isUpdate = true;
      // initialize the form with the retrived lookup value
      this.lookupApi
        .getLookupId(this.LookupId)
        .subscribe((data: LookupView) => this.initializeLookup(data));
    }

    this.typeFields = {
      text: "Type",
      value: "Type"
    };
  }

  get Type(): FormControl {
    return this.lookupForm.get("Type") as FormControl;
  }

  get Value(): FormControl {
    return this.lookupForm.get("Value") as FormControl;
  }

  createLookupForm() {
    this.lookupForm = this.formBuilder.group({
      Type: ["", Validators.required],
      Value: ["", Validators.required]
    });
  }

  initializeLookup(data: LookupView) {
    this.lookupForm = this.formBuilder.group({
      Type: [data.Type, Validators.required],
      Value: [data.Value, Validators.required]
    });
  }
  onSubmit() {
    // check if  current operation is update
    if (!this.isUpdate) {
      this.lookupApi.createLookup(this.lookupForm.value).subscribe(
        success => {
          alert("Lookup Created Successfully");
          this.location.back(); // on success return back to where the user previously was
        },
        (error: HttpErrorResponse) => {
          alert(error.message); // on error show the error message
        }
      );
    } else {
      this.lookupApi
        .updateLookup(this.LookupId, this.lookupForm.value)
        .subscribe(
          () => {
            alert("Account catagory Updated Successfully"); // on success return back to where the user previously was
            this.location.back();
          },
          (error: HttpErrorResponse) => {
            alert(error.message); // on error show the error message
          }
        );
    }
  }
}
