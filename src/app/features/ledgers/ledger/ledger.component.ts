import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  ValidatorFn,
  FormControl
} from "@angular/forms";
import { LedgerService } from "../../../core/services/ledger.service";
import { Location } from "@angular/common";
import { Query } from "@syncfusion/ej2-data";
import { HttpErrorResponse } from "@angular/common/http";
import { Accounts, AccountViewModel } from "../../accounts/accounts";
import { AccountsService } from "src/app/core/services/accounts.service";
import { CreateLedgerEntry } from "../ledger";

function balanceChecker(): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    let amountSum = 0;
    this.accounts.controls.forEach(element => {
      amountSum += element.Amouunt;
    });

    if (amountSum === 0) {
      return null;
    }

    return { balanceNotEqual: true };
  };
}

@Component({
  selector: "app-ledger",
  templateUrl: "./ledger.component.html",
  styleUrls: ["./ledger.component.css"]
})
export class LedgerComponent implements OnInit {
  public ledgerForm: FormGroup;
  public accountList: object[];
  public isEqual: boolean;
  public accountForm: FormGroup;
  public accountQuery: Query;
  public debitSum = 0;
  public creditSum = 0;
  public accountFields: object;
  constructor(
    private formBuilder: FormBuilder,
    private accountApi: AccountsService,
    private ledgerService: LedgerService,
    private location: Location
  ) {
    this.createForm();

    this.accountQuery = new Query().select(["Name", "AccountId"]);
    this.accountFields = { text: "Name", value: "AccountId" };
  }

  ngOnInit() {
    this.accountQuery = new Query().select(["Name", "AccountId"]);
    this.accountFields = { text: "Name", value: "AccountId" };

    this.accountApi
      .getAccountsList()
      .subscribe(
        (data: AccountViewModel[]) => (this.accountList = data),
        (error: HttpErrorResponse) => alert(error.message)
      );

    this.accounts.valueChanges.subscribe(value => {
      this.debitSum = 0;
      this.creditSum = 0;

      value.forEach(element => {
        this.debitSum += element.Debit;
        this.creditSum += element.Credit;
      });
      if (this.creditSum === this.debitSum) {
        this.isEqual = true;
      } else {
        this.isEqual = false;
      }
    });
  }

  get description(): FormControl {
    return this.ledgerForm.get("description") as FormControl;
  }

  get date(): FormControl {
    return this.ledgerForm.get("date") as FormControl;
  }

  get accounts(): FormArray {
    return this.ledgerForm.get("accounts") as FormArray;
  }

  createForm(data: any = "") {
    this.ledgerForm = this.formBuilder.group({
      description: [""],
      date: ["", Validators.required],
      accounts: this.formBuilder.array([
        this.formBuilder.group({
          AccountId: ["", Validators.required],
          Debit: [0],
          Credit: [0],
          Reference: [""]
        }),
        this.formBuilder.group({
          AccountId: ["", Validators.required],
          Debit: [0],
          Credit: [0],
          Reference: [""]
        })
      ])
    });
  }

  onCancel() {
    this.location.back();
  }

  /*   onSubmit() {
    const formData = this.prepareData(this.ledgerForm);
    console.log(formData);
    this.ledgerService.addLedgerEntry(formData).subscribe(
      (data: CreateLedgerEntry) => {
        alert("Ledger entry made successfully");
        this.createForm();
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }
 */
  removeRow(index: number) {
    this.accounts.removeAt(index);
  }
  /*   prepareData(data: FormGroup): CreateLedgerEntry {
    const form = data.value;

    const ledger = new CreateLedgerEntry();
    ledger.createdOn = form.date;
    ledger.description = form.description;

    this.accounts.controls.forEach(element => {
      ledger.jornal.push({
        debit: element.get("Debit").value ? element.get("Debit").value : 0,
        credit: element.get("Credit").value ? element.get("Credit").value : 0,
        accountId: element.get("AccountId").value,
        reference: element.get("Reference").value
          ? element.get("Reference").value
          : 0
      });
    });
    return ledger;
  } */

  addForm() {
    this.accounts.push(
      this.formBuilder.group({
        AccountId: ["", Validators.required],
        Amount: [0, Validators.required],
        Reference: [""]
      })
    );
  }
}
