/*
 * @CreateTime: Nov 3, 2018 10:17 AM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 6, 2019 4:33 PM
 * @Description: Modify Here, Please
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Query } from "@syncfusion/ej2-data";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AccountsIndexView, AccountViewModel } from "../accounts";
import { AccountsService } from "../../../core/services/accounts.service";
import { AccountCategoryIndex } from "../../account-catagory/account-catagory-domain";

@Component({
  selector: "app-account-form",
  templateUrl: "./account-form.component.html",
  styleUrls: ["./account-form.component.css"]
})
export class AccountFormComponent implements OnInit {
  public organizationList: AccountsIndexView[]; // holds organization for the drop down
  public accountForm: FormGroup; // tmain formgroup

  public isUpdate: Boolean = false; // used as a flag to determine current operation
  public accountFields: Object; // holds the serlected fields to display on the drop down
  public organizationQuery: Query; // used  to filter the fields we want to use for organization
  public organizationFields: Object; // holds the selected fields to display on the drop down
  public calendarQuery: Query; // used  to filter the fields we want to use for calander period
  public calendarFields: Object; // holds the selected fields to display on the drop down

  public accountId: number; // used to hold the account Id passed in the route
  public textString = "9099 00";
  public accountCatagories: AccountCategoryIndex[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private accountApi: AccountsService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    // get the accountId from route parameter if present
    this.accountId = +this.activatedRoute.snapshot.paramMap.get("accountId");

    if (this.accountId) {
      // if account id is present get the related account value
      this.isUpdate = true;
      // initialize the form with the retrived account value
      this.accountApi
        .getAccountById(this.accountId)
        .subscribe((data: AccountViewModel) => this.initializeFunction(data));
    }

    this.accountFields = { value: "Name" };
  }

  deleteAccount(): void {
    if (this.accountId) {
      this.accountApi.deleteAccount(this.accountId).subscribe(
        () => {
          alert("Account Deleted Successfuly"), this.location.back();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
  /* Creating value accessors for the reactive form
  for use inside the template
  */
  get AccountId(): FormControl {
    return this.accountForm.get("AccountId") as FormControl;
  }

  get CatagoryId(): FormControl {
    return this.accountForm.get("CatagoryId") as FormControl;
  }

  get Name(): FormControl {
    return this.accountForm.get("Name") as FormControl;
  }

  get ParentAccount(): FormControl {
    return this.accountForm.get("ParentAccount") as FormControl;
  }

  get Active(): FormControl {
    return this.accountForm.get("Active") as FormControl;
  }

  get OpeningBalance(): FormControl {
    return this.accountForm.get("OpeningBalance") as FormControl;
  }

  get CostCenterId(): FormControl {
    return this.accountForm.get("CostCenterId") as FormControl;
  }

  /* initializes the formgroup structure
  if called without a parameter the fields will have a default value
  else they will be be assigned value retrived from the function argument
  */
  createForm() {
    this.accountForm = this.formBuilder.group({
      AccountId: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ],
      CatagoryId: [""],
      Name: ["", Validators.required],
      ParentAccount: [0],
      Active: [true],
      OpeningBalance: [0],
      CostCenterId: [0]
    });
  }

  initializeFunction(data: AccountViewModel) {
    this.accountForm = this.formBuilder.group({
      AccountId: [
        data.AccountId,
        [Validators.minLength(4), Validators.maxLength(4)]
      ],
      CatagoryId: [
        { value: data.CategoryId, disabled: true },
        Validators.required
      ],
      Name: [data.AccountName, [Validators.required, Validators.minLength(3)]],
      ParentAccount: [data.ParentAccountId],
      Active: [data.Active],
      OpeningBalance: [data.OpeningBalance],
      CostCenterId: [data.CostCenterId]
    });

    this.CatagoryId.disable();
  }

  /*
  called on the form submit event to handel
  the request with appropriate action
  i.e. add or update
  */
  onSubmit() {
    // check if  current operation is update
    if (!this.isUpdate) {
      this.accountApi.createAccount(this.accountForm.value).subscribe(
        success => {
          alert("Account Created Successfully");
          this.location.back(); // on success return back to where the user previously was
        },
        (error: HttpErrorResponse) => {
          alert(error.message); // on error show the error message
        }
      );
    } else {
      this.accountApi
        .updateAccount(this.accountId, this.accountForm.value)
        .subscribe(
          () => {
            this.location.back();
            alert("Account Updated Successfully"); // on success return back to where the user previously was
          },
          (error: HttpErrorResponse) => {
            alert(error.message); // on error show the error message
          }
        );
    }
  }

  public onSpecificfocus(args): void {
    // sets cursor at specified position
    args.selectionStart = 4;
    args.selectionEnd = 4;
  }

  /*
  used to handel the event when user click the cancel button
  it will return the user to wherever the user came from previously
  */
  cancel() {
    this.location.back();
  }
}
