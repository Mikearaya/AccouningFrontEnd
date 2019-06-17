import { Component, OnInit, forwardRef, OnChanges } from "@angular/core";
import { AccountsService } from "src/app/core/services/accounts.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AccountsIndexView } from "src/app/features/accounts/accounts";
import { Input } from "@syncfusion/ej2-inputs";
import { Predicate, Query } from "@syncfusion/ej2-data/src";
import { QueryString } from "../data-view/data-view.model";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "app-account-selector",
  template: `
    <ejs-autocomplete
      id="account"
      [enabled]="!disabled"
      #accountElement
      name="account"
      placeholder="search for account"
      [text]="text"
      [fields]="fields"
      (filtering)="onFiltering($event)"
      [dataSource]="accounts"
      (change)="accountChanged($event)"
    ></ejs-autocomplete>
  `,
  styleUrls: ["./account-selector.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountSelectorComponent),
      multi: true
    }
  ]
})
export class AccountSelectorComponent implements ControlValueAccessor {
  constructor(private accountApi: AccountsService) {}
  public _value: any;
  public disabled: boolean;
  public data;

  public accounts: any;
  public fields: object = { value: "Id", text: "Name" };
  // set the placeholder to the AutoComplete input
  public text = "";

  accountChanged($event: any) {
    if ($event.itemData) {
      this.onChanged($event.itemData["Id"]);
    } else {
      this.onChanged("");
    }

    this.onTouched();
  }

  public onFiltering(e) {
    e.preventDefaultAction = true;
    const predicate = new Predicate("Name", "Contains", e.text);

    let query = new Query();
    // frame the query based on search string with filter type.
    query = e.text != "" ? query.where(predicate) : query;
    // pass the filter data source, filter query to updateData method.

    this.accountApi.getAccountIndex(e.text).subscribe(data => {
      e.updateData(data);
    });
  }

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    this._value = obj;

    this.accountApi.getAccountIndex("").subscribe((result: any) => {
      this.accounts = result;
      if (this._value) {
        if (obj !== 0) {
          const data = this.accounts.filter(a => a.Id === obj);
          data.forEach(element => {
            this.text = element.Name;
          });
        }
      }
    });
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
