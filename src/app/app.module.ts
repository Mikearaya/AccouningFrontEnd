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
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RmHeaderInterceptorService } from "./features/Services/rm-header-interceptor.service";
import { LookupsModule } from "./features/lookups/lookups.module";

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
    LookupsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RmHeaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
