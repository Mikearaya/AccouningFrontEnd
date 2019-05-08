import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "accounts",
    loadChildren: "./features/accounts/accounts.module#AccountsModule"
  },
  {
    path: "account-catagories",
    loadChildren:
      "./features/account-catagory/account-catagory.module#AccountCatagoryModule"
  },
  {
    path: "lookups",
    loadChildren: "./features/lookups/lookups.module#LookupsModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
