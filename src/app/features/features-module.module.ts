import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeaturesModuleRoutingModule } from "./features-module-routing.module";
import { RmHeaderInterceptorService } from "../Services/rm-header-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesModuleRoutingModule],
  providers: []
})
export class FeaturesModule {}
