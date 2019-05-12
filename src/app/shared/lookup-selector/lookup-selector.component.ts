import { Component, OnInit, forwardRef, OnChanges, Input } from "@angular/core";
import { Query } from "@syncfusion/ej2-data";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { LookupService } from "src/app/core/services/lookup.service";
import { LookupsIndexView } from "src/app/features/lookups/lookups";

@Component({
  selector: "app-lookup-selector",
  template: `
    <ejs-autocomplete
      id="lookupSelector"
      #account
      name="lookupSelector"
      placeholder="find lookup"
      [width]="400"
      [text]="text"
      [enabled]="!disabled"
      [fields]="fields"
      [dataSource]="lookups"
      (change)="lookupChanged($event)"
    ></ejs-autocomplete>
  `,
  styleUrls: ["./lookup-selector.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupSelectorComponent),
      multi: true
    }
  ]
})
export class LookupSelectorComponent
  implements OnInit, OnChanges, ControlValueAccessor {
  constructor(private lookupApi: LookupService) {}
  public _value: any;
  public disabled: boolean;
  @Input()
  public type: string;

  public lookups: LookupsIndexView[] = [];
  query: Query;
  public fields: object = { value: "Id", text: "Name" };
  // set the placeholder to the AutoComplete input
  public text = "";

  lookupChanged($event: any) {
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

  ngOnChanges() {}

  ngOnInit() {
    this.lookupApi
      .getLookUpType(this.type)
      .subscribe((responseData: LookupsIndexView[]) => {
        this.lookups = responseData;
        if (this._value) {
          const data = this.lookups.filter(a => a.Id === this._value);
          this.text = data[0].Name;
        }
      });
  }
}