import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
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
import { AccountCatagoryApiService } from "./account-catagory-api.service";
import { HttpClientModule } from "@angular/common/http";
import { LedgerService } from "./services/ledger.service";
import { AccountsService } from "./services/accounts.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
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
    PageService,
    AccountsService,
    AccountCatagoryApiService,
    LedgerService
  ]
})
export class CoreModule {}
