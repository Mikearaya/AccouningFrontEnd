import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AccountsViewComponent } from "./accounts-view/accounts-view.component";
import { AccountFormComponent } from "./account-form/account-form.component";
import { AuthGuardGuard } from "src/app/core/services/auth-guard.guard";

const routes: Routes = [
  {
    path: "",
    component: AccountsViewComponent,
    canActivate: [AuthGuardGuard],
    data: {
      breadCrum: "View",
      claimType: "canViewAccount"
    }
  },
  {
    path: "new",
    component: AccountFormComponent,
    canActivate: [AuthGuardGuard],
    data: {
      breadCrum: "Create",
      claimType: "canAddAccount"
    }
  },
  {
    path: ":accountId/update",
    component: AccountFormComponent,
    canActivate: [AuthGuardGuard],
    data: {
      breadCrum: "Update",
      claimType: "canUpdateAccount"
    }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AccountsRoutingModule {}
