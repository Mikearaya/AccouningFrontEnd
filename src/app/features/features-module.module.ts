import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeaturesModuleRoutingModule } from "./features-module-routing.module";
import { FilterOptionsComponent } from './shared/filter-options/filter-options.component';

@NgModule({
  declarations: [FilterOptionsComponent],
  imports: [CommonModule, FeaturesModuleRoutingModule],
  providers: []
})
export class FeaturesModule {}
