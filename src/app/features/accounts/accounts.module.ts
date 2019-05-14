import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountsRoutingModule } from "./accounts-routing.module";
import { AccountFormComponent } from "./account-form/account-form.component";
import { AccountsViewComponent } from "./accounts-view/accounts-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AccountsService } from "../../core/services/accounts.service";
import { GridModule } from "@syncfusion/ej2-angular-grids";
import { ReactiveFormsModule } from "@angular/forms";
import { SwitchModule, ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  DropDownListModule,
  AutoCompleteModule
} from "@syncfusion/ej2-angular-dropdowns";
import { NumericTextBoxModule } from "@syncfusion/ej2-angular-inputs";

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule,
    GridModule,
    SharedModule,
    ReactiveFormsModule,
    SwitchModule,
    ButtonModule,
    HttpClientModule,
    DropDownListModule,
    NumericTextBoxModule,
    AutoCompleteModule
  ],
  declarations: [AccountFormComponent, AccountsViewComponent],
  providers: [
    // syncfusion service
  ]
})
export class AccountsModule {}
