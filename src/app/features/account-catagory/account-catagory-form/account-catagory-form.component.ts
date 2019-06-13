/*
 * @CreateTime: May 1, 2019 11:29 AM
 * @Author: Naol
 * @Contact: nnale8899@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 1, 2019 12:42 PM
 * @Description: Modify Here, Please
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";

import { AccountCatagoryApiService } from "../../../core/account-catagory-api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
import {
  AccountCatagoryView,
  AccountCategoryIndex
} from "../account-catagory-domain";
import { TypesIndexView } from "../../account-type/account-type";
import { AccountTypeService } from "../../../core/services/account-type.service";

@Component({
  selector: "app-account-catagory-form",
  templateUrl: "./account-catagory-form.component.html",
  styleUrls: ["./account-catagory-form.component.css"]
})
export class AccountCatagoryFormComponent implements OnInit {
  public catagoryForm: FormGroup;
  public accountTypes: TypesIndexView[];
  public isUpdate = false;
  public accountCatagoryId: any;
  public accountTypeFields: Object;
  public accountTypeList: Object;

  constructor(
    private formBuilder: FormBuilder,
    private accountCatagoryApi: AccountCatagoryApiService,
    private accountTypeApi: AccountTypeService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    // intialize the form
    this.createCatagoryForm();
  }

  @ViewChild("statusBtn") statusBtn: ButtonComponent;

  ngOnInit() {
    // get the accountId from route parameter if present
    this.accountCatagoryId = this.activatedRoute.snapshot.paramMap.get(
      "catagoryId"
    );

    this.accountTypeApi
      .getTypesIndex("")
      .subscribe((data: TypesIndexView[]) => {
        this.accountTypes = data;
      });

    if (this.accountCatagoryId) {
      // if account catagory id is present get the related account value
      this.isUpdate = true;
      // initialize the form with the retrived account value
      this.accountCatagoryApi
        .getAccountCatagoryById(this.accountCatagoryId)
        .subscribe((data: AccountCatagoryView) =>
          this.initializeCatagory(data)
        );
    }

    this.accountTypeFields = {
      text: "Name",
      value: "Id"
    };

    // get account list to fill the Accounts drop down from back end
    this.accountCatagoryApi
      .getAccountCatagoryIndex()
      .subscribe(
        (data: AccountCategoryIndex[]) => (this.accountTypeList = data),
        (error: HttpErrorResponse) => alert(error.message)
      );
  }

  /* Creating value accessors for the reactive form
  for use inside the template
  */
  get CategoryName(): FormControl {
    return this.catagoryForm.get("CategoryName") as FormControl;
  }

  get AccountType(): FormControl {
    return this.catagoryForm.get("AccountType") as FormControl;
  }

  get OverFlowAccount(): FormControl {
    return this.catagoryForm.get("OverFlowAccount") as FormControl;
  }

  createCatagoryForm() {
    this.catagoryForm = this.formBuilder.group({
      CategoryName: ["", Validators.required],
      AccountType: ["", Validators.required],
      OverFlowAccount: [""]
    });
  }

  initializeCatagory(data: AccountCatagoryView) {
    this.catagoryForm = this.formBuilder.group({
      Id: [data.Id, Validators.required],
      CategoryName: [data.CategoryName, Validators.required],
      AccountType: [data.AccountTypeId, Validators.required],
      OverFlowAccount: [data.OverFlowAccountId]
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
      this.accountCatagoryApi
        .createAccountCatagory(this.catagoryForm.value)
        .subscribe(
          success => {
            alert("Account catagory Created Successfully");
            this.location.back(); // on success return back to where the user previously was
          },
          (error: HttpErrorResponse) => {
            alert(error.message); // on error show the error message
          }
        );
    } else {
      this.accountCatagoryApi
        .updateAccountCatagory(this.accountCatagoryId, this.catagoryForm.value)
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
