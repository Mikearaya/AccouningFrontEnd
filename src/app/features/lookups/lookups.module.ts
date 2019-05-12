import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LookupsRoutingModule } from "./lookups-routing.module";
import { LookupFormComponent } from "./lookup-form/lookup-form.component";
import { LookupViewComponent } from "./lookup-view/lookup-view.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [LookupFormComponent, LookupViewComponent],
  imports: [CommonModule, LookupsRoutingModule, SharedModule],
  providers: []
})
export class LookupsModule {}
