import { Component, OnInit, forwardRef, OnChanges } from "@angular/core";
import { AccountCatagoryApiService } from "src/app/core/account-catagory-api.service";
import { Query, Predicate } from "@syncfusion/ej2-data";
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
      [enabled]="!disabled"
      [text]="text"
      [fields]="fields"
      (filtering)="onFiltering($event)"
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
export class AccountCategorySelectorComponent implements ControlValueAccessor {
  constructor(private accountApi: AccountCatagoryApiService) {}
  public _value: any;
  public disabled: boolean;

  public accountCategories: AccountsIndexView[] = [];
  query: Query;
  public fields: Object = { value: "Id", text: "Name" };
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
    this.accountApi.getAccountCatagoryIndex().subscribe((data: any) => {
      this.accountCategories = data;
      if (this._value) {
        console.log(this._value);
        const data = this.accountCategories.filter(a => a.Id === obj);
        data.forEach(e => {
          this.text = e.Name;
          console.log(e.Name);
        });
      }
    });
  }

  public onFiltering(e) {
    e.preventDefaultAction = true;
    const predicate = new Predicate("Name", "Contains", e.text);

    let query = new Query();
    // frame the query based on search string with filter type.
    query = e.text !== "" ? query.where(predicate) : query;
    // pass the filter data source, filter query to updateData method.

    this.accountApi.getAccountCatagoryIndex(e.text).subscribe(data => {
      e.updateData(data);
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
