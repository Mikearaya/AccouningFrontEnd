import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeaturesModuleRoutingModule } from "./features-module-routing.module";
import { AccountsService } from "../core/services/accounts.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesModuleRoutingModule],
  providers: [AccountsService]
})
export class FeaturesModule {}
