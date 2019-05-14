import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountTypeRoutingModule } from "./account-type-routing.module";
import { AccountTypeFormComponent } from "./account-type-form/account-type-form.component";
import { AccountTypeViewComponent } from "./account-type-view/account-type-view.component";
import { GridModule } from "@syncfusion/ej2-angular-grids";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SwitchModule, ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { HttpClientModule } from "@angular/common/http";
import {
  DropDownListModule,
  AutoCompleteModule
} from "@syncfusion/ej2-angular-dropdowns";
import { NumericTextBoxModule } from "@syncfusion/ej2-angular-inputs";
import { AccountTypeService } from "./account-type.service";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [AccountTypeFormComponent, AccountTypeViewComponent],
  imports: [
    CommonModule,
    AccountTypeRoutingModule,
    CommonModule,
    GridModule,
    SharedModule,
    ReactiveFormsModule,
    SwitchModule,
    ButtonModule,
    HttpClientModule,
    DropDownListModule,
    NumericTextBoxModule,
    AutoCompleteModule,
    CoreModule
  ],
  providers: [AccountTypeService]
})
export class AccountTypeModule {}
