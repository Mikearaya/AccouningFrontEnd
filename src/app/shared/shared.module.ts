import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ButtonModule,
  SwitchAllModule,
  SwitchModule,
  RadioButtonModule
} from "@syncfusion/ej2-angular-buttons";
import { GridModule } from "@syncfusion/ej2-angular-grids";
import {
  ToolbarModule,
  SidebarModule,
  TabAllModule,
  TreeViewAllModule,
  AccordionModule
} from "@syncfusion/ej2-angular-navigations";
import {
  DropDownListModule,
  MultiSelectModule,
  AutoCompleteModule
} from "@syncfusion/ej2-angular-dropdowns";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  DatePickerAllModule,
  DateRangePickerAllModule,
  DateTimePickerModule
} from "@syncfusion/ej2-angular-calendars";
import {
  NumericTextBoxModule,
  MaskedTextBoxModule
} from "@syncfusion/ej2-angular-inputs";
import { FormOptionsComponent } from "./form-options/form-options.component";
import { DataViewComponent } from "./data-view/data-view.component";
import { PageTitleComponent } from "./page-title/page-title.component";
import { BreadCrumbComponent } from "./bread-crumb/bread-crumb.component";
import { PageIdentityComponent } from "./page-identity/page-identity.component";
import { RouterModule } from "@angular/router";
import { AccountSelectorComponent } from "./account-selector/account-selector.component";
import { AccountCategorySelectorComponent } from "./account-category-selector/account-category-selector.component";
import { LookupSelectorComponent } from "./lookup-selector/lookup-selector.component";
import { TreeGridModule } from "@syncfusion/ej2-angular-treegrid";
import { DialogModule } from "@syncfusion/ej2-angular-popups";
import { DialogBoxComponent } from "./dialog-box/dialog-box.component";
import { FilterOptionComponent } from "./filter-option/filter-option.component";
import { CoreModule } from "../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    GridModule,
    ToolbarModule,
    SidebarModule,
    DropDownListModule,
    ReactiveFormsModule,
    HttpClientModule,
    TreeViewAllModule,
    TabAllModule,
    DatePickerAllModule,
    DateRangePickerAllModule,
    NumericTextBoxModule,
    SwitchModule,
    RadioButtonModule,
    RouterModule,
    AutoCompleteModule,
    MultiSelectModule,
    DateTimePickerModule,
    MaskedTextBoxModule,
    TreeGridModule,
    AccordionModule,
    CoreModule
  ],
  exports: [
    CommonModule,
    PageIdentityComponent,
    ButtonModule,
    GridModule,
    ToolbarModule,
    SidebarModule,
    SwitchAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    HttpClientModule,
    TreeViewAllModule,
    TabAllModule,
    MultiSelectModule,
    DatePickerAllModule,
    DateRangePickerAllModule,
    NumericTextBoxModule,
    SwitchModule,
    RadioButtonModule,
    FormOptionsComponent,
    DataViewComponent,
    AccountSelectorComponent,
    AccountCategorySelectorComponent,
    LookupSelectorComponent,
    MaskedTextBoxModule,
    TreeGridModule,
    AccordionModule,
    CoreModule,
    FilterOptionComponent
  ],
  declarations: [
    FormOptionsComponent,
    DataViewComponent,
    PageIdentityComponent,
    BreadCrumbComponent,
    PageTitleComponent,
    AccountSelectorComponent,
    AccountCategorySelectorComponent,
    LookupSelectorComponent,
    DialogBoxComponent,
    FilterOptionComponent
  ],
  providers: []
})
export class SharedModule {}
