import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "accounts",
    loadChildren: "../features/accounts/accounts.module#AccountsModule"
  },
  {
    path: "account-catagories",
    loadChildren:
      "../features/account-catagory/account-catagory.module#AccountCatagoryModule"
  },
  {
    path: "account-types",
    loadChildren:
      "../features/account-type/account-type.module#AccountTypeModule"
  },
  {
    path: "lookups",
    loadChildren: "../features/lookups/lookups.module#LookupsModule"
  },
  {
    path: "ledgers",
    loadChildren: "../features/ledgers/ledger.module#LedgerModule"
  },
  {
    path: "reports",
    loadChildren: "../features/reports/reports.module#ReportsModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesModuleRoutingModule {}
