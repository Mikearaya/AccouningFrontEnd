import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChecklistComponent } from "./checklist/checklist.component";
import { SubsidaryLedgerReportComponent } from "./subsidary-ledger-report/subsidary-ledger-report.component";
import { ConsolidatedTrialBalanceComponent } from "./consolidated-trial-balance/consolidated-trial-balance.component";
import { TrialBalanceDetailComponent } from "./trial-balance-detail/trial-balance-detail.component";
import { BalanceSheetComponent } from "./balance-sheet/balance-sheet.component";
import { IncomeStatmentComponent } from "./income-statment/income-statment.component";
import { AccountsScheduleComponent } from "./accounts-schedule/accounts-schedule.component";
import { CostOfGoodsSoldComponent } from "./cost-of-goods-sold/cost-of-goods-sold.component";
import { AuthGuardGuard } from "src/app/core/services/auth-guard.guard";

const routes: Routes = [
  {
    path: "checklist",
    component: ChecklistComponent,
    canActivate: [AuthGuardGuard],
    data: {
      title: "Checklist",
      breadCrum: "Checklist",
      claimType: "canViewChecklist"
    }
  },
  {
    path: "subsidaries",
    component: SubsidaryLedgerReportComponent,
    canActivate: [AuthGuardGuard],
    data: {
      title: "Subsidary ledger",
      breadCrum: "Subsidary",
      claimType: "canViewSubsidaryLedger"
    }
  },
  {
    path: "consolidated-trial-balance",
    component: ConsolidatedTrialBalanceComponent,
    canActivate: [AuthGuardGuard],
    data: {
      title: "Consolidated trial balance",
      breadCrum: "Consolidated trial balance",
      claimType: "canViewConsolidatedTrialBalance"
    }
  },
  {
    path: "trial-balance-detail",
    component: TrialBalanceDetailComponent,
    canActivate: [AuthGuardGuard],
    data: {
      title: "Trial balance detail",
      breadCrum: "Trial balance detail",
      claimType: "canViewTrialalaceDetail"
    }
  },
  {
    path: "balance-sheet",
    component: BalanceSheetComponent,
    canActivate: [AuthGuardGuard],
    data: {
      title: "Balance sheet",
      breadCrum: "Balance sheet",
      claimType: "canViewBalanceSheet"
    }
  },
  {
    path: "income-statement",
    component: IncomeStatmentComponent,
    canActivate: [AuthGuardGuard],
    data: {
      title: "Income statement",
      breadCrum: "Income statement",
      claimType: "canViewIncomeStatementu"
    }
  },
  {
    path: "accounts-schedule",
    component: AccountsScheduleComponent,
    canActivate: [AuthGuardGuard],
    data: {
      title: "Accounts Schedule",
      breadCrum: "Account Schedule",
      claimType: "canViewAccountSchedule"
    }
  },
  {
    path: "cost-of-goods-sold",
    component: CostOfGoodsSoldComponent,
    canActivate: [AuthGuardGuard],
    data: {
      title: "Cost of goods sold",
      breadCrum: "Cost of goods sold",
      claimType: "canViewCostOfGoodsSold"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
