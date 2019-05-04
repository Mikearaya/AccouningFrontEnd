/*
 * @CreateTime: Nov 3, 2018 10:17 AM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: Apr 25, 2019 2:25 PM
 * @Description: Modify Here, Please
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
import { Query } from "@syncfusion/ej2-data";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Accounts } from "../accounts";
import { AccountsService } from "../accounts.service";

@Component({
  selector: "app-account-form",
  templateUrl: "./account-form.component.html",
  styleUrls: ["./account-form.component.css"]
})
export class AccountFormComponent implements OnInit {
  public accountList: Object[]; // Holds Accounts for the drop down
  public organizationList: Object[]; // holds organization for the drop down
  public accountForm: FormGroup; // tmain formgroup

  public isUpdate: Boolean = false; // used as a flag to determine current operation
  public accountFields: Object; // holds the serlected fields to display on the drop down
  public organizationQuery: Query; // used  to filter the fields we want to use for organization
  public organizationFields: Object; // holds the selected fields to display on the drop down
  public calendarQuery: Query; // used  to filter the fields we want to use for calander period
  public calendarFields: Object; // holds the selected fields to display on the drop down

  public accountId: string; // used to hold the account Id passed in the route

  public accountCatagories: Object;
  @ViewChild("statusBtn") statusBtn: ButtonComponent;

  constructor(
    private formBuilder: FormBuilder,
    private accountApi: AccountsService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    // intialize the form
    this.createForm();
    this.accountCatagories = [
      "ASSET",
      "LIABILITY",
      "REVENUE",
      "EXPENCE",
      "INCOME"
    ];
  }

  ngOnInit() {
    // get the accountId from route parameter if present
    this.accountId = this.activatedRoute.snapshot.paramMap.get("accountId");

    if (this.accountId) {
      // if account id is present get the related account value
      this.isUpdate = true;
      // initialize the form with the retrived account value
      this.accountApi
        .getAccountById(this.accountId)
        .subscribe((data: Accounts) => this.initializeFunction(data));
    }

    this.accountFields = { text: "AccountName", value: "AccountId" };
    this.organizationQuery = new Query().select(["Name", "Id"]);
    this.organizationFields = { text: "Name", value: "Id" };

    // get organization list to fill the organization drop down from back end
    /*     this.companyApi.getOrganizationsList().subscribe(
      (data) => this.organizationList = data
    ); */

    // get account list to fill the Accounts drop down from back end
    this.accountApi
      .getAccountsList()
      .subscribe(
        (data: Accounts[]) => (this.accountList = data),
        (error: HttpErrorResponse) => alert(error.message)
      );
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

  get AccountCatagory(): FormControl {
    return this.accountForm.get("AccountCatagory") as FormControl;
  }

  get AccountName(): FormControl {
    return this.accountForm.get("AccountName") as FormControl;
  }

  get ParentAccount(): FormControl {
    return this.accountForm.get("ParentAccount") as FormControl;
  }

  get PostingType(): FormControl {
    return this.accountForm.get("PostingType") as FormControl;
  }

  get GlType(): FormControl {
    return this.accountForm.get("GlType") as FormControl;
  }

  get OrganizationId(): FormControl {
    return this.accountForm.get("OrganizationId") as FormControl;
  }

  get IsPosting(): FormControl {
    return this.accountForm.get("IsPosting") as FormControl;
  }

  get IsReconcilation(): FormControl {
    return this.accountForm.get("IsReconcilation") as FormControl;
  }

  get Active(): FormControl {
    return this.accountForm.get("Active") as FormControl;
  }

  get OpeningBalance(): FormControl {
    return this.accountForm.get("OpeningBalance") as FormControl;
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
      AccountCatagory: ["", Validators.required],
      AccountName: ["", Validators.required],
      ParentAccount: [""],
      Active: [true],
      OpeningBalance: [0],
      OrganizationId: [""],
      PostingType: ["BOTH"],
      IsReconcilation: [false],
      IsPosting: [true],
      GlType: ["", Validators.required]
    });
  }

  initializeFunction(data: Accounts) {
    this.accountForm = this.formBuilder.group({
      AccountId: [data.Id, [Validators.minLength(4), Validators.maxLength(4)]],
      AccountCatagory: [data.AccountCatagory, Validators.required],
      AccountName: [
        data.AccountName,
        [Validators.required, Validators.minLength(3)]
      ],
      ParentAccount: [data.ParentAccount],
      Active: [data.Active],
      OpeningBalance: [data.OpeningBalance],
      OrganizationId: [data.OrganizationId],
      PostingType: [data.PostingType],
      IsReconcilation: [data.IsReconciliation],
      IsPosting: [data.IsPosting],
      GlType: [data.glType, Validators.required]
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
          (success: Object) => {
            this.location.back();
            alert("Account Updated Successfully"); // on success return back to where the user previously was
          },
          (error: HttpErrorResponse) => {
            alert(error.message); // on error show the error message
          }
        );
    }
  }

  /*
  used to handel the event when user click the cancel button
  it will return the user to wherever the user came from previously
  */
  cancel() {
    this.location.back();
  }
}
