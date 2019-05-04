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
import { AccountCatagoryView } from "../account-catagory-domain";
@Component({
  selector: "app-account-catagory-form",
  templateUrl: "./account-catagory-form.component.html",
  styleUrls: ["./account-catagory-form.component.css"]
})
export class AccountCatagoryFormComponent implements OnInit {
  public catagoryForm: FormGroup;
  public accountTypes: object;
  public isUpdate = false;
  public accountCatagoryId: any;
  public accountTypeFields: Object;
  public accountTypeList: Object;

  constructor(
    private formBuilder: FormBuilder,
    private accountCatagoryApi: AccountCatagoryApiService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    // intialize the form
    this.createCatagoryForm();
    this.accountTypes = ["ASSET", "LIABILITY", "REVENUE", "EXPENCE", "INCOME"];
  }

  @ViewChild("statusBtn") statusBtn: ButtonComponent;

  ngOnInit() {
    // get the accountId from route parameter if present
    this.accountCatagoryId = this.activatedRoute.snapshot.paramMap.get(
      "catagoryId"
    );

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
      text: "Account Type",
      value: "AccountType"
    };

    // get account list to fill the Accounts drop down from back end
    this.accountCatagoryApi
      .getAccountCatagories()
      .subscribe(
        (data: AccountCatagoryView[]) => (this.accountTypeList = data),
        (error: HttpErrorResponse) => alert(error.message)
      );
  }

  /* Creating value accessors for the reactive form
  for use inside the template
  */
  get CatagoryName(): FormControl {
    return this.catagoryForm.get("CatagoryName") as FormControl;
  }

  get AccountType(): FormControl {
    return this.catagoryForm.get("AccountType") as FormControl;
  }

  createCatagoryForm() {
    this.catagoryForm = this.formBuilder.group({
      CatagoryName: ["", Validators.required],
      AccountType: ["", Validators.required]
    });
  }

  initializeCatagory(data: AccountCatagoryView) {
    this.catagoryForm = this.formBuilder.group({
      CatagoryName: [data.CatagoryName, Validators.required],
      AccountType: [data.AccountType, Validators.required]
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
          (success: Object) => {
            this.location.back();
            alert("Account catagory Updated Successfully"); // on success return back to where the user previously was
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
