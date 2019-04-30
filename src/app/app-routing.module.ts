import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "accounts",
    loadChildren: "./features/accounts/accounts.module#AccountsModule"
  },
  {
    path: "account-catagory",
    loadChildren:
      "./features/account-catagory/account-catagory.module#AccountCatagoryModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
