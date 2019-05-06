import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LookupRoutingModule } from "./lookup-routing.module";
import { LookupFormComponent } from "./lookup-form/lookup-form.component";
import { LookupViewComponent } from "./lookup-view/lookup-view.component";

@NgModule({
  declarations: [LookupFormComponent, LookupViewComponent],
  imports: [CommonModule, LookupRoutingModule]
})
export class LookupModule {}
