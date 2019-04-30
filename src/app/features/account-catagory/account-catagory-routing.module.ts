import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountCatagoryViewComponent } from "./account-catagory-view/account-catagory-view.component";
import { AccountCatagoryFormComponent } from "./account-catagory-form/account-catagory-form.component";

const routes: Routes = [
  { path: "", component: AccountCatagoryViewComponent },
  { path: "add", component: AccountCatagoryFormComponent },
  { path: ":catagoryId/update", component: AccountCatagoryFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountCatagoryRoutingModule {}
