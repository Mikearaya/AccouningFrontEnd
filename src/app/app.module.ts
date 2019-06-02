import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  SidebarModule,
  TreeViewModule,
  ToolbarModule
} from "@syncfusion/ej2-angular-navigations";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { CoreModule } from "./core/core.module";
import { LookupsModule } from "./features/lookups/lookups.module";
import { SharedModule } from "./shared/shared.module";
import { AccountingApiService } from "./Services/accounting-api.service";
import { DashboardLayoutModule } from "@syncfusion/ej2-angular-layouts";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    TreeViewModule,
    ToolbarModule,
    ButtonModule,
    CoreModule,
    LookupsModule,
    DashboardLayoutModule,
    SharedModule
  ],
  providers: [AccountingApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
