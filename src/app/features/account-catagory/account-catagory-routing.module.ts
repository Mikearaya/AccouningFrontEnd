import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountCatagoryViewComponent } from "./account-catagory-view/account-catagory-view.component";
import { AccountCatagoryFormComponent } from "./account-catagory-form/account-catagory-form.component";
import { AuthGuardGuard } from "src/app/core/services/auth-guard.guard";

const routes: Routes = [
  {
    path: "",
    component: AccountCatagoryViewComponent,
    canActivate: [AuthGuardGuard],
    data: { breadCrum: "View", claim: "caViewAccountCategory" }
  },
  {
    path: "add",
    component: AccountCatagoryFormComponent,
    canActivate: [AuthGuardGuard],
    data: { breadCrum: "Add", claim: "caAddNewAccountCategory" }
  },
  {
    path: ":catagoryId/update",
    component: AccountCatagoryFormComponent,
    canActivate: [AuthGuardGuard],
    data: { breadCrum: "Update", claim: "canEditAccountCategory" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountCatagoryRoutingModule {}
