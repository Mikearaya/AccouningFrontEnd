import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuardGuard } from "src/app/core/services/auth-guard.guard";

const routes: Routes = [
  {
    path: "",

    component: DashboardComponent,
    data: { breadCrum: "Dashboard" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
