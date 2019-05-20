import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportsRoutingModule } from "./reports-routing.module";
import { ChecklistComponent } from "./checklist/checklist.component";
import { SharedModule } from "src/app/shared/shared.module";
import { GridModule } from "@syncfusion/ej2-angular-grids";
import { SubsidaryLedgerReportComponent } from "./subsidary-ledger-report/subsidary-ledger-report.component";
import { ReportApiService } from "./report-api.service";
import { TrialBalanceDetailComponent } from "./trial-balance-detail/trial-balance-detail.component";
import { ConsolidatedTrialBalanceComponent } from "./consolidated-trial-balance/consolidated-trial-balance.component";

@NgModule({
  declarations: [
    ChecklistComponent,
    SubsidaryLedgerReportComponent,
    TrialBalanceDetailComponent,
    ConsolidatedTrialBalanceComponent,
    ConsolidatedTrialBalanceComponent
  ],
  imports: [CommonModule, ReportsRoutingModule, SharedModule],
  providers: [ReportApiService]
})
export class ReportsModule {}
