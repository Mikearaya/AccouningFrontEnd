import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountsRoutingModule } from "./accounts-routing.module";
import { AccountFormComponent } from "./account-form/account-form.component";
import { AccountsViewComponent } from "./accounts-view/accounts-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AccountsService } from "./accounts.service";
import {
  GridModule,
  AggregateService,
  SortService,
  FilterService,
  GroupService,
  EditService,
  ExcelExportService,
  ColumnChooserService,
  ColumnMenuService,
  DetailRowService,
  SearchService,
  PdfExportService,
  ReorderService,
  CommandColumnService,
  ToolbarService,
  ResizeService,
  PageService
} from "@syncfusion/ej2-angular-grids";
import { ReactiveFormsModule } from "@angular/forms";
import { SwitchModule, ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  DropDownListModule,
  AutoCompleteModule
} from "@syncfusion/ej2-angular-dropdowns";
import { NumericTextBoxModule } from "@syncfusion/ej2-angular-inputs";
import { RmHeaderInterceptorService } from "../Services/rm-header-interceptor.service";

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
    AccountsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RmHeaderInterceptorService,
      multi: true
    }

    // syncfusion service
  ]
})
export class AccountsModule {}
