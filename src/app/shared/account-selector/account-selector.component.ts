import { Component, OnInit, forwardRef } from "@angular/core";
import { AccountsService } from "src/app/core/services/accounts.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-account-selector",
  template: `
    <ejs-autocomplete
      id="account"
      name="account"
      placeholder="search for account"
      [width]="400"
      [fields]="fields"
      [dataSource]="data"
      (change)="categoryChanged($event)"
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
export class AccountSelectorComponent implements OnInit, ControlValueAccessor {
  constructor(private accountApi: AccountsService) {}
  public _value: any;
  public disabled: boolean;

  public data: any;
  public fields: Object = { value: "Id", text: "Name" };
  // set the placeholder to the AutoComplete input
  public text = "Find a country";

  categoryChanged($event: any) {
    if ($event.itemData) {
      this.onChanged($event.itemData["Id"]);
    } else {
      this.onChanged("");
    }
    this.onTouched();
  }

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    this._value = obj;
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

  ngOnInit() {
    this.accountApi
      .getAccountIndex("")
      .subscribe((data: any) => (this.data = data));
  }
}
