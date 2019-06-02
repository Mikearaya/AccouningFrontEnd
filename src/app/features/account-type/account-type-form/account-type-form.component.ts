import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
import { HttpErrorResponse } from "@angular/common/http";
import { AccountTypeService } from "../account-type.service";
import { AccountTypeViewModel, TypesIndexView } from "../account-type";
import { Location } from "@angular/common";

@Component({
  selector: "app-account-type-form",
  templateUrl: "./account-type-form.component.html",
  styleUrls: ["./account-type-form.component.css"]
})
export class AccountTypeFormComponent implements OnInit {
  public typeForm: FormGroup;
  public Catagories: object;
  public isUpdate = false;
  public accountTypeId: any;
  public accountTypeFields: object;
  public accountTypeList: object;

  constructor(
    private formBuilder: FormBuilder,
    private typeApi: AccountTypeService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    // intialize the form
    this.createAccountTypeForm();
    this.typeApi.getTypesIndex().subscribe((data: TypesIndexView[]) => {
      this.Catagories = data;
    });
    // this.Catagories = ["Asset", "Liability", "Revenue", "Expence", "Capital"];
  }

  @ViewChild("statusBtn") statusBtn: ButtonComponent;

  ngOnInit() {
    // get the accountTypeId from route parameter if present
    this.accountTypeId = this.activatedRoute.snapshot.paramMap.get(
      "accountTypeId"
    );

    if (this.accountTypeId) {
      // if account type id is present get the related account type value
      this.isUpdate = true;
      // initialize the form with the retrived account type value
      this.typeApi
        .getAccountTypeById(this.accountTypeId)
        .subscribe((data: AccountTypeViewModel) => this.initializeType(data));
    }

    this.accountTypeFields = {
      text: "Name",
      value: "Id"
    };
  }

  /* Creating value accessors for the reactive form
  for use inside the template
  */
  get AccountType(): FormControl {
    return this.typeForm.get("AccountType") as FormControl;
  }

  get Type(): FormControl {
    return this.typeForm.get("Type") as FormControl;
  }
  get SummerizeReport(): FormControl {
    return this.typeForm.get("IsSummary") as FormControl;
  }

  createAccountTypeForm() {
    this.typeForm = this.formBuilder.group({
      AccountType: ["", Validators.required], // isType of
      Type: ["", Validators.required], // acount type
      IsSummary: [0, Validators.required]
    });
  }

  initializeType(data: AccountTypeViewModel) {
    this.typeForm = this.formBuilder.group({
      AccountType: [data.AccountType, Validators.required],
      Type: [data.Type, Validators.required],
      IsSummary: [data.IsSummary, Validators.required]
    });
  }
  /*
  called on the form submit event to handel
  the request with appropriate action
  i.e. add or update
  */
  onSubmit() {
    // check if  current operation is update
    if (!this.isUpdate) {
      this.typeApi.createAccountType(this.typeForm.value).subscribe(
        success => {
          alert("Account Type Created Successfully");
          this.location.back(); // on success return back to where the user previously was
        },
        (error: HttpErrorResponse) => {
          alert(error.message); // on error show the error message
        }
      );
    } else {
      this.typeApi
        .updateAccountType(this.accountTypeId, this.typeForm.value)
        .subscribe(
          () => {
            alert("Account Type Updated Successfully"); // on success return back to where the user previously was
            this.location.back();
          },
          (error: HttpErrorResponse) => {
            alert(error.message); // on error show the error message
          }
        );
    }
  }
  cancel() {
    this.location.back();
  }
}
