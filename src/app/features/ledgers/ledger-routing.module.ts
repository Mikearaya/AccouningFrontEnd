import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LedgerComponent } from "./ledger/ledger.component";
import { Routes, RouterModule } from "@angular/router";
import { LedgerViewComponent } from "./ledger-view/ledger-view.component";
import { AuthGuardGuard } from "src/app/core/services/auth-guard.guard";

const routes: Routes = [
  {
    path: "",
    component: LedgerViewComponent,
    canActivate: [AuthGuardGuard],
    data: {
      breadCrum: "View",
      claim: "canViewLedgerEntries"
    }
  }, // organization view route
  {
    path: "add",
    component: LedgerComponent,
    canActivate: [AuthGuardGuard],
    data: {
      breadCrum: "Add",
      claim: "canAddNewLedgerEntries"
    }
  }, // when creating a new organization data
  {
    path: ":ledgerId/update",
    component: LedgerComponent,
    canActivate: [AuthGuardGuard],
    data: { breadCrum: "Update", claim: "canEditLedgerEntry" }
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class LedgerRoutingModule {}
