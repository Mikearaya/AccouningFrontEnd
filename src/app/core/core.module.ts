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
  PageService,
  ContextMenuService
} from "@syncfusion/ej2-angular-grids";
import { AccountCatagoryApiService } from "./account-catagory-api.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LedgerService } from "./services/ledger.service";
import { AccountsService } from "./services/accounts.service";
import { RmHeaderInterceptorService } from "../Services/rm-header-interceptor.service";
import { LookupService } from "./services/lookup.service";
import {
  LineSeriesService,
  CategoryService
} from "@syncfusion/ej2-angular-charts";
import { SystemCacheInterceptorService } from "./services/system-cache-interceptor.service";
import { SystemCacheService } from "./services/system-cache.service";

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

    LookupService,
    AccountCatagoryApiService,
    LedgerService,
    LineSeriesService,
    CategoryService,
    SystemCacheService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: RmHeaderInterceptorService,
      multi: true
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: SystemCacheInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
