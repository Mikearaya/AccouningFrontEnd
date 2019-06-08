import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardGuard } from "./core/services/auth-guard.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: "../app/features/features-module.module#FeaturesModule",
    canActivate: [AuthGuardGuard],
    data: {
      breadCrum: "Home"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
