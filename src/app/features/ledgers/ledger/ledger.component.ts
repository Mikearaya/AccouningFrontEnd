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
import {
  JornalEntryViewModel,
  Jornal,
  LedgerEntry,
  LedgerEntryViewModel
} from "../ledger";
import { ActivatedRoute } from "@angular/router";

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
  public isEqual = false;
  public accountForm: FormGroup;
  public accountQuery: Query;
  public debitSum = 0;
  public creditSum = 0;
  public accountFields: object;
  public ledgerId: number;
  public isUpdate: boolean;
  public postText = "Post";
  public postStatus: boolean;
  public data: JornalEntryViewModel;
  deletedIds: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ledgerService: LedgerService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.createForm();

    this.accountQuery = new Query().select(["AccountName", "AccountId"]);
    this.accountFields = { text: "AccountName", value: "AccountId" };
  }

  ngOnInit() {
    this.ledgerId = +this.activatedRoute.snapshot.paramMap.get("ledgerId");

    if (this.ledgerId) {
      this.isUpdate = true;
      this.ledgerService
        .getLedgerEntryById(this.ledgerId)
        .subscribe((data: JornalEntryViewModel) => {
          this.initializeForm(data);
        });
    }

    this.Entries.valueChanges.subscribe(value => this.calculateBalance(value));
  }
  public setPostStatus() {
    if (this.Posted.value) {
      if (this.isUpdate) {
        this.enableForm();
        this.Posted.setValue(false);
      }
    } else {
      this.Posted.setValue(true);
      if (this.isUpdate) {
        this.disableForm();
      }
    }
  }

  calculateBalance(value: any): void {
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
  }
  get VoucherId(): FormControl {
    return this.ledgerForm.get("VoucherId") as FormControl;
  }

  get Description(): FormControl {
    return this.ledgerForm.get("Description") as FormControl;
  }

  get Reference(): FormControl {
    return this.ledgerForm.get("Reference") as FormControl;
  }

  get Date(): FormControl {
    return this.ledgerForm.get("Date") as FormControl;
  }

  get Posted(): FormControl {
    return this.ledgerForm.get("Posted") as FormControl;
  }

  get Entries(): FormArray {
    return this.ledgerForm.get("Entries") as FormArray;
  }

  createForm() {
    this.ledgerForm = this.formBuilder.group({
      VoucherId: ["", Validators.required],
      Reference: [""],
      Posted: [false],
      Description: ["", Validators.required],
      Date: ["", Validators.required],
      Entries: this.formBuilder.array([
        this.formBuilder.group({
          AccountId: ["", Validators.required],
          Debit: [0],
          Credit: [0]
        }),
        this.formBuilder.group({
          AccountId: ["", Validators.required],
          Debit: [0],
          Credit: [0]
        })
      ])
    });
  }

  initializeForm(data: JornalEntryViewModel) {
    this.ledgerForm = this.formBuilder.group({
      VoucherId: [data.VoucherId, Validators.required],
      Reference: [data.Reference],
      Posted: [data.Posted],
      Description: [data.Description, Validators.required],
      Date: [data.Date, Validators.required],
      Entries: this.formBuilder.array([])
    });
    this.Entries.valueChanges.subscribe(value => this.calculateBalance(value));
    data.Entries.map(d => this.Entries.push(this.initializeEntryDetail(d)));
    this.postStatus = data.Posted;
    this.Posted.setValue(data.Posted);
    if (this.postStatus) {
      this.disableForm();
    }
  }

  onSubmit() {
    const formData = this.prepareData(this.ledgerForm);
    if (!this.isUpdate) {
      this.ledgerService.addLedgerEntry(formData).subscribe(
        (data: LedgerEntryViewModel) => {
          alert("Ledger entry made successfully");
          this.isUpdate = true;
          this.createForm();
        },
        (error: HttpErrorResponse) => console.log(error)
      );
    } else {
      this.ledgerService.updateLedgerEntry(this.ledgerId, formData).subscribe(
        () => {
          this.location.back();
          alert("Ledger entry Updated Successfully"); // on success return back to where the user previously was
        },
        (error: HttpErrorResponse) => {
          alert(error.message); // on error show the error message
        }
      );
    }
  }

  initializeEntryDetail(data: Jornal): FormGroup {
    return this.formBuilder.group({
      Id: [data.Id, Validators.required],
      Credit: [data.Credit],
      Debit: [data.Debit],
      AccountId: [data.AccountId]
    });
  }

  removeRow(index: number) {
    if (this.Entries.controls[index].get("Id").value) {
      const confirmation = confirm("Are you sure u want to delete this entry");
      if (confirmation) {
        this.Entries.removeAt(index);
        this.deletedIds.push(this.Entries.controls[index].get("Id").value);
      }
    }
    this.Entries.removeAt(index);
  }
  prepareData(data: FormGroup): LedgerEntry {
    const form = data.value;

    const ledger = new LedgerEntry();
    ledger.Id = this.ledgerId ? this.ledgerId : 0;
    ledger.Date = form.Date;
    ledger.Description = form.Description;
    ledger.VoucherId = form.VoucherId;
    ledger.Reference = form.Reference;
    ledger.Posted = form.Posted;

    this.Entries.controls.forEach(element => {
      ledger.Entries.push({
        Id: element.get("Id") ? element.get("Id").value : 0,
        Debit: element.get("Debit").value ? element.get("Debit").value : 0,
        Credit: element.get("Credit").value ? element.get("Credit").value : 0,
        AccountId: element.get("AccountId").value
      });
    });

    this.deletedIds.forEach(element => {
      ledger.DeletedIds.push(element);
    });

    return ledger;
  }

  addForm() {
    this.Entries.push(
      this.formBuilder.group({
        AccountId: ["", Validators.required],
        Debit: [0, Validators.required],
        Credit: [0, Validators.required]
      })
    );
  }
  hideSubmit(): boolean {
    return this.Posted.value && this.isUpdate;
  }
  disableForm() {
    this.VoucherId.disable();
    this.Description.disable();
    this.Reference.disable();
    this.Date.disable();
    this.Entries.disable();
  }
  enableForm() {
    this.VoucherId.enable();
    this.Description.enable();
    this.Reference.enable();
    this.Date.enable();
    this.Entries.enable();
  }
  cancel() {
    this.location.back();
  }
}
