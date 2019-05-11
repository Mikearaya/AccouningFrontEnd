import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LookupViewComponent } from "./lookup-view/lookup-view.component";
import { LookupFormComponent } from "./lookup-form/lookup-form.component";

const routes: Routes = [
  { path: "", component: LookupViewComponent },
  { path: "add", component: LookupFormComponent },
  { path: ":lookupId/update", component: LookupFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule {}
