import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountTypeViewComponent } from "./account-type-view/account-type-view.component";
import { AccountTypeFormComponent } from "./account-type-form/account-type-form.component";

const routes: Routes = [
  {
    path: "",
    component: AccountTypeViewComponent
  },
  {
    path: "add",
    component: AccountTypeFormComponent
  },
  {
    path: ":accountTypeId/update",
    component: AccountTypeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTypeRoutingModule {}
