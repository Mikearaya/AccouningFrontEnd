import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChecklistComponent } from "./checklist/checklist.component";

const routes: Routes = [
  {
    path: "",
    component: ChecklistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
