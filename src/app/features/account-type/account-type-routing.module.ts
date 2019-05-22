import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountTypeViewComponent } from "./account-type-view/account-type-view.component";
import { AccountTypeFormComponent } from "./account-type-form/account-type-form.component";

const routes: Routes = [
  {
    path: "",
    component: AccountTypeViewComponent,
    data: { breadCrum: "View" }
  },
  {
    path: "add",
    component: AccountTypeFormComponent,
    data: { breadCrum: "Add" }
  },
  {
    path: ":accountTypeId/update",
    component: AccountTypeFormComponent,
    data: { breadCrum: "Update" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTypeRoutingModule {}
