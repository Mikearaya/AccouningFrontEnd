import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LookupsRoutingModule } from "./lookups-routing.module";
import { LookupFormComponent } from "./lookup-form/lookup-form.component";
import { LookupViewComponent } from "./lookup-view/lookup-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { LookupService } from "./lookup.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RmHeaderInterceptorService } from "../Services/rm-header-interceptor.service";

@NgModule({
  declarations: [LookupFormComponent, LookupViewComponent],
  imports: [CommonModule, LookupsRoutingModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RmHeaderInterceptorService,
      multi: true
    },
    LookupService
  ]
})
export class LookupsModule {}
