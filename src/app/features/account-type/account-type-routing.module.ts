import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountTypeViewComponent } from "./account-type-view/account-type-view.component";
import { AccountTypeFormComponent } from "./account-type-form/account-type-form.component";

const routes: Routes = [
  {
    path: "",
    component: AccountTypeViewComponent,
    data: { breadCrum: "View", claim: "caViewAccountType" }
  },
  {
    path: "add",
    component: AccountTypeFormComponent,
    data: { breadCrum: "Add", claim: "canAddAccountType" }
  },
  {
    path: ":accountTypeId/update",
    component: AccountTypeFormComponent,
    data: { breadCrum: "Update", claim: "canUpdateAccountType" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTypeRoutingModule {}
