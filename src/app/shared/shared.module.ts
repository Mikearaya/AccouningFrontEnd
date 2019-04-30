import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, SwitchAllModule, SwitchModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule, SidebarModule, TabAllModule, TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePickerAllModule, DateRangePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormOptionsComponent } from './form-options/form-options.component';
import { DataViewComponent } from './data-view/data-view.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { PageIdentityComponent } from './page-itentity/page-identity.component';
import { RouterModule } from '@angular/router';

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
    MultiSelectModule



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
  ],
  declarations: [FormOptionsComponent, DataViewComponent, PageIdentityComponent, BreadCrumbComponent, PageTitleComponent],
  providers: []
})
export class SharedModule { }
