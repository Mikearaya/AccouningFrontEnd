import { Component, OnInit, forwardRef } from "@angular/core";
import { AccountCatagoryApiService } from "src/app/core/account-catagory-api.service";
import { Query } from "@syncfusion/ej2-data";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-account-category-selector",
  template: `
    <ejs-autocomplete
      id="accountCatagory"
      name="accountCatagory"
      placeholder="find account catagory"
      [width]="400"
      [fields]="fields"
      [dataSource]="searchData"
      (change)="categoryChanged($event)"
    ></ejs-autocomplete>
  `,
  styleUrls: ["./account-category-selector.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountCategorySelectorComponent),
      multi: true
    }
  ]
})
export class AccountCategorySelectorComponent
  implements OnInit, ControlValueAccessor {
  constructor(private accountApi: AccountCatagoryApiService) {}
  public _value: any;
  public disabled: boolean;

  public searchData: any;
  query: Query;
  public fields: Object = { value: "Name", text: "Name" };
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
      .getAccountCatagoryIndex("")
      .subscribe((data: any) => (this.searchData = data));
  }
}
