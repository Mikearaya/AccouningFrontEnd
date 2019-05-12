import { Component, OnInit, forwardRef, OnChanges } from "@angular/core";
import { AccountCatagoryApiService } from "src/app/core/account-catagory-api.service";
import { Query } from "@syncfusion/ej2-data";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AccountsIndexView } from "src/app/features/accounts/accounts";

@Component({
  selector: "app-account-category-selector",
  template: `
    <ejs-autocomplete
      id="accountCatagory"
      #account
      name="accountCatagory"
      placeholder="find account catagory"
      [width]="400"
      [enabled]="!disabled"
      [text]="text"
      [fields]="fields"
      [dataSource]="accountCategories"
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
  implements OnInit, OnChanges, ControlValueAccessor {
  constructor(private accountApi: AccountCatagoryApiService) {}
  public _value: any;
  public disabled: boolean;

  public accountCategories: AccountsIndexView[] = [];
  query: Query;
  public fields: Object = { value: "Name", text: "Name" };
  // set the placeholder to the AutoComplete input
  public text = "";

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

  writeValue(obj: number): void {
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

  ngOnChanges() {
    console.log("changed");
  }

  ngOnInit() {
    this.accountApi.getAccountCatagoryIndex("").subscribe((data: any) => {
      this.accountCategories = data;
      if (this._value) {
        const data = this.accountCategories.filter(a => a.Id === this._value);
        this.text = data[0].Name;
      }
    });
  }
}
