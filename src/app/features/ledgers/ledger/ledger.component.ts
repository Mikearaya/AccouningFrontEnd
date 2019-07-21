import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";
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
import {
  ToastComponent,
  ToastCloseArgs
} from "@syncfusion/ej2-angular-notifications";

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
  public lastSectionBackColor: any;
  public lastSectionColor: any;
  deletedIds: number[] = [];
  @ViewChild("toasttype")
  public toastObj: ToastComponent;
  @ViewChild("successToast") btnsuccess: ElementRef;
  public position: object = { X: "Center" };
  public toasts: { [key: string]: Object }[] = [
    {
      title: "Success!",
      content: "Ledger entry Updated Successfully",
      cssClass: "e-toast-success",
      icon: "e-success toast-icons"
    }
  ];
  public successClick(): void {
    setTimeout(() => {
      this.toastObj.show(this.toasts[0]);
    }, 10);
  }
  /*   public onclose(e: ToastCloseArgs): void {
    if (e.toastContainer.childElementCount === 0) {
      let hideBtn: HTMLElement = document.getElementById("hideTosat");
      hideBtn.style.display = "none";
    }
  } */
  /* public onBeforeOpen(): void {
    let hideBtn: HTMLElement = document.getElementById("hideTosat");
  } */

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

  onEntrySelected(data: JornalEntryViewModel): void {
    this.initializeForm(data);
  }
  public setPostStatus() {
    if (this.Posted.value) {
      this.Posted.setValue(false);
      if (this.isUpdate) {
        this.ledgerService
          .updateLedgerStatus(this.ledgerId, {
            Id: this.ledgerId,
            Posted: false
          })
          .subscribe(() => this.enableForm());
      }
    } else {
      this.Posted.setValue(true);
      if (this.isUpdate) {
        this.ledgerService
          .updateLedgerStatus(this.ledgerId, {
            Id: this.ledgerId,
            Posted: true
          })
          .subscribe();
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
      this.lastSectionBackColor = "#4d841d55";
      this.lastSectionColor = "#4d841d";
    } else {
      this.isEqual = false;
      this.lastSectionBackColor = "#dc354555";
      this.lastSectionColor = "#dc3545";
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

  public RequireMatch(control: AbstractControl) {
    const selection: any = control.value;
    if (typeof selection === "string") {
      return { incorrect: true };
    }
    return null;
  }
  myDate(date: any) {
    const dateString = date.toString();
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = dateString.substring(4, 8);
    const myDate = day + "/" + month + "/" + year;

    return myDate;
  }

  createForm() {
    this.ledgerForm = this.formBuilder.group({
      VoucherId: ["", Validators.required],
      Reference: [""],
      Posted: [false],
      Description: ["", Validators.required],
      Date: [this.myDate(""), Validators.required],
      Entries: this.formBuilder.array([
        this.formBuilder.group({
          AccountId: ["", [Validators.required, this.RequireMatch]],
          Debit: [0],
          Credit: [0]
        }),
        this.formBuilder.group({
          AccountId: ["", [Validators.required, this.RequireMatch]],
          Debit: [0],
          Credit: [0]
        })
      ])
    });
  }
  initializeForm(data: JornalEntryViewModel) {
    this.data = data;
    this.isUpdate = true;
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
    this.VoucherId.setValue(data.VoucherId);
  }

  onSubmit() {
    const formData = this.prepareData(this.ledgerForm);
    if (!this.isUpdate) {
      this.ledgerService.addLedgerEntry(formData).subscribe(
        (data: LedgerEntryViewModel) => {
          // alert("Ledger entry made successfully");
          this.successClick();
          // this.isUpdate = true;
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
      AccountId: [data.AccountId, [Validators.required, this.RequireMatch]]
    });
  }

  removeRow(index: number) {
    if (this.Entries.controls[index].get("Id")) {
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
    ledger.Date = this.myDate(this.Date.value);
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
        AccountId: ["", [Validators.required, this.RequireMatch]],
        Debit: [0, Validators.required],
        Credit: [0, Validators.required]
      })
    );
  }
  hideSubmit(): boolean {
    return this.Posted.value && this.isUpdate;
  }
  disableForm() {
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
}
