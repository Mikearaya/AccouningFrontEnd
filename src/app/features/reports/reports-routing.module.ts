import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChecklistComponent } from "./checklist/checklist.component";
import { SubsidaryLedgerReportComponent } from "./subsidary-ledger-report/subsidary-ledger-report.component";
import { FilterOptionComponent } from "src/app/shared/filter-option/filter-option.component";

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
    path: "filter",
    component: FilterOptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
