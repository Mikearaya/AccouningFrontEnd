import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AccountsViewComponent } from "./accounts-view/accounts-view.component";
import { AccountFormComponent } from "./account-form/account-form.component";

const routes: Routes = [
  {
    path: "",
    component: AccountsViewComponent,
    data: {
      breadCrum: "View"
    }
  },
  {
    path: "new",
    component: AccountFormComponent,
    data: {
      breadCrum: "Create"
    }
  },
  {
    path: ":accountId/update",
    component: AccountFormComponent,
    data: {
      breadCrum: "Update"
    }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AccountsRoutingModule {}
