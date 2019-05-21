import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChecklistComponent } from "./checklist/checklist.component";
import { SubsidaryLedgerReportComponent } from "./subsidary-ledger-report/subsidary-ledger-report.component";
import { ConsolidatedTrialBalanceComponent } from "./consolidated-trial-balance/consolidated-trial-balance.component";
import { TrialBalanceDetailComponent } from "./trial-balance-detail/trial-balance-detail.component";
import { BalanceSheetComponent } from "./balance-sheet/balance-sheet.component";
import { IncomeStatmentComponent } from "./income-statment/income-statment.component";

const routes: Routes = [
  {
    path: "checklist",
    component: ChecklistComponent
  },
  {
    path: "subsidaries",
    component: SubsidaryLedgerReportComponent
  },
  {
    path: "consolidated-trial-balance",
    component: ConsolidatedTrialBalanceComponent
  },
  {
    path: "trial-balance-detail",
    component: TrialBalanceDetailComponent
  },
  {
    path: "balance-sheet",
    component: BalanceSheetComponent
  },
  {
    path: "income-statment",
    component: IncomeStatmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
