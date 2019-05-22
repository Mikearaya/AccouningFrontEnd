import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountCatagoryViewComponent } from "./account-catagory-view/account-catagory-view.component";
import { AccountCatagoryFormComponent } from "./account-catagory-form/account-catagory-form.component";

const routes: Routes = [
  {
    path: "",
    component: AccountCatagoryViewComponent,
    data: { breadCrum: "View" }
  },
  {
    path: "add",
    component: AccountCatagoryFormComponent,
    data: { breadCrum: "Add" }
  },
  {
    path: ":catagoryId/update",
    component: AccountCatagoryFormComponent,
    data: { breadCrum: "Update" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountCatagoryRoutingModule {}
