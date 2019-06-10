import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LedgerComponent } from "./ledger/ledger.component";
import { Routes, RouterModule } from "@angular/router";
import { LedgerViewComponent } from "./ledger-view/ledger-view.component";

const routes: Routes = [
  {
    path: "",
    component: LedgerViewComponent,
    data: {
      breadCrum: "View",
      claim: "canViewLedgerEntries"
    }
  }, // organization view route
  {
    path: "add",
    component: LedgerComponent,
    data: {
      breadCrum: "Add",
      claim: "canAddLedgerEntries"
    }
  }, // when creating a new organization data
  {
    path: ":ledgerId/update",
    component: LedgerComponent,
    data: { breadCrum: "Update", claim: "canUpdateLedgerEntry" }
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class LedgerRoutingModule {}
