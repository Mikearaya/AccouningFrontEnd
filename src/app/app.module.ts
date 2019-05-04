import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  SearchService,
  AggregateService,
  SortService,
  FilterService,
  GroupService,
  EditService,
  ExcelExportService,
  ColumnChooserService,
  ColumnMenuService,
  DetailRowService,
  PdfExportService,
  ReorderService,
  CommandColumnService,
  ToolbarService,
  ResizeService,
  PageService
} from "@syncfusion/ej2-angular-grids";
import {
  SidebarModule,
  TreeViewModule,
  ToolbarModule
} from "@syncfusion/ej2-angular-navigations";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";
import { AutoCompleteModule } from "@syncfusion/ej2-angular-dropdowns";
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    TreeViewModule,
    ToolbarModule,
    ButtonModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
