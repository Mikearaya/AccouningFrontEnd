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
    path: "lookup",
    loadChildren: "./features/lookup/lookup.module#LookupModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
