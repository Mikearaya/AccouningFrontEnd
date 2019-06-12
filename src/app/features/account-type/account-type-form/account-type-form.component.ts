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
import { AccountTypeService } from "../../../core/services/account-type.service";
import {
  AccountTypeViewModel,
  TypesIndexView,
  AccountType
} from "../account-type";
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
    this.typeApi.getTypesIndex().subscribe((data: TypesIndexView[]) => {
      this.Catagories = data;
    });
    // intialize the form
    this.createAccountTypeForm();

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
      AccountType: [data.TypeOfId, Validators.required],
      Type: [data.AccountType, Validators.required],
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
    const form = this.prepareData();

    if (!this.isUpdate && form) {
      this.typeApi.createAccountType(form).subscribe(
        success => {
          alert("Account Type Created Successfully");
          this.location.back(); // on success return back to where the user previously was
        },
        (error: HttpErrorResponse) => {
          alert(error.message); // on error show the error message
        }
      );
    } else if (form) {
      this.typeApi.updateAccountType(this.accountTypeId, form).subscribe(
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

  prepareData(): AccountType {
    if (this.typeForm.valid) {
      return {
        Id: this.accountTypeId ? this.accountTypeId : 0,
        IsTypeOf: this.AccountType.value,
        Type: this.Type.value,
        IsSummary: this.SummerizeReport.value
      };
    } else {
      return null;
    }
  }
  cancel() {
    this.location.back();
  }
}
