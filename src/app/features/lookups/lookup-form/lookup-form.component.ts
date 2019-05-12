import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  FormArray
} from "@angular/forms";
import { LookupView, SystemLookupCategoriesView } from "../lookups";
import { LookupService } from "../../../core/services/lookup.service";
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
  public typeFields: object;
  public typeList: object;
  public LookupId: any;
  public lookupFields: { value: string; text: string };

  public lookupsList: SystemLookupCategoriesView[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private lookupApi: LookupService
  ) {
    this.createLookupForm();
    this.typeList = ["Appdiv", "Appdiv", "appdiv"];
    this.lookupFields = { value: "Id", text: "Name" };
  }

  ngOnInit() {
    // get the look Id from route parameter if present
    this.LookupId = this.activatedRoute.snapshot.paramMap.get("lookupId");
    this.lookupApi
      .getSystemLookupCategories()
      .subscribe((e: SystemLookupCategoriesView[]) => (this.lookupsList = e));

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
      Lookups: this.formBuilder.array([
        this.formBuilder.group({
          Type: ["", Validators.required],
          Value: ["", Validators.required]
        })
      ])
    });
  }

  initializeLookup(data: LookupView) {
    this.lookupForm = this.formBuilder.group({
      Lookups: this.formBuilder.array([
        this.formBuilder.group({
          Id: [data.Id, Validators.required],
          Type: [data.Type, Validators.required],
          Value: [data.Value, Validators.required]
        })
      ])
    });
  }

  get Lookups(): FormArray {
    return this.lookupForm.get("Lookups") as FormArray;
  }

  removeRow(index: number): void {
    if (this.Lookups.controls[index].get("Id")) {
      const confirmation = confirm("Are you sure you want to delete this item");

      if (confirmation) {
      }
    } else {
      this.Lookups.removeAt(index);
    }
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
      this.lookupApi.updateLookup(this.lookupForm.value).subscribe(
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

  addRow(): void {
    this.Lookups.push(
      this.formBuilder.group({
        Type: ["", Validators.required],
        Value: ["", Validators.required]
      })
    );
  }
}
