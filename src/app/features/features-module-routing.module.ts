import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "accounts",
    loadChildren: "../features/accounts/accounts.module#AccountsModule",
    data: {
      title: "Account chart",
      breadCrum: "Account"
    }
  },
  {
    path: "account-catagories",
    loadChildren:
      "../features/account-catagory/account-catagory.module#AccountCatagoryModule",
    data: {
      title: "Account catagory",
      breadCrum: "Catagory"
    }
  },
  {
    path: "account-types",
    loadChildren:
      "../features/account-type/account-type.module#AccountTypeModule",
    data: {
      title: "Account type",
      breadCrum: "Type"
    }
  },
  {
    path: "new-year-data",
    loadChildren:
      "../features/new-year-data/new-year-data.module#NewYearDataModule",
    data: {
      title: "New year data",
      breadCrum: "New year data"
    }
  },
  {
    path: "lookups",
    loadChildren: "../features/lookups/lookups.module#LookupsModule",
    data: {
      title: "Account lookup",
      breadCrum: "Lookup"
    }
  },
  {
    path: "ledgers",
    loadChildren: "../features/ledgers/ledger.module#LedgerModule",
    data: {
      title: "Leadger Entries",
      breadCrum: "Ledger"
    }
  },
  {
    path: "reports",
    loadChildren: "../features/reports/reports.module#ReportsModule",
    data: {
      title: "Reports",
      breadCrum: "Report"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesModuleRoutingModule {}
