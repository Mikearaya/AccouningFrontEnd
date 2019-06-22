import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountTypeViewComponent } from "./account-type-view/account-type-view.component";
import { AccountTypeFormComponent } from "./account-type-form/account-type-form.component";
import { AuthGuardGuard } from "src/app/core/services/auth-guard.guard";

const routes: Routes = [
  {
    path: "",
    component: AccountTypeViewComponent,
    canActivate: [AuthGuardGuard],
    data: { breadCrum: "View", claim: "caViewAccountType" }
  },
  {
    path: "add",
    component: AccountTypeFormComponent,
    canActivate: [AuthGuardGuard],
    data: { breadCrum: "Add", claim: "canAddNewAccountType" }
  },
  {
    path: ":accountTypeId/update",
    component: AccountTypeFormComponent,
    canActivate: [AuthGuardGuard],
    data: { breadCrum: "Update", claim: "canEditAccountType" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTypeRoutingModule {}
