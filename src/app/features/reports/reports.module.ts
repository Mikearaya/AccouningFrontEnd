/** @format */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ChecklistComponent } from './checklist/checklist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubsidaryLedgerReportComponent } from './subsidary-ledger-report/subsidary-ledger-report.component';
import { ReportApiService } from './report-api.service';
import { TrialBalanceDetailComponent } from './trial-balance-detail/trial-balance-detail.component';
import { ConsolidatedTrialBalanceComponent } from './consolidated-trial-balance/consolidated-trial-balance.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { IncomeStatmentComponent } from './income-statment/income-statment.component';
import { AccountsScheduleComponent } from './accounts-schedule/accounts-schedule.component';
import { CostOfGoodsSoldComponent } from './cost-of-goods-sold/cost-of-goods-sold.component';

@NgModule({
    declarations: [
        ChecklistComponent,
        SubsidaryLedgerReportComponent,
        TrialBalanceDetailComponent,
        ConsolidatedTrialBalanceComponent,
        BalanceSheetComponent,
        IncomeStatmentComponent,

        AccountsScheduleComponent,

        CostOfGoodsSoldComponent,
    ],
    imports: [CommonModule, ReportsRoutingModule, SharedModule],
    providers: [ReportApiService],
})
export class ReportsModule {}
