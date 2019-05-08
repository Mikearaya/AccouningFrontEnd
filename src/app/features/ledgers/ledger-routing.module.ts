import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedgerComponent } from './ledger/ledger.component';
import { Routes, RouterModule } from '@angular/router';
import { LedgerViewComponent } from './ledger-view/ledger-view.component';
import { JornalEntryDetailViewComponent } from './jornal-entry-detail-view/jornal-entry-detail-view.component';



const routes: Routes = [
  {
    path: '', component: LedgerViewComponent,
    data: {
      title: 'Jornal Entries',
      breadCrum: ''
    }
  }, // organization view route
  {
    path: 'add', component: LedgerComponent,
    data: {
      title: 'Make jornal entry',
      breadCrum: 'New'
    }
  }, // when creating a new organization data
  {
    path: ':ledgerId/update', component: JornalEntryDetailViewComponent,
    data: {
      title: 'Jornal entry detail',
      breadCrum: 'Detail'
    }
  } // when creating a new organization data
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class LedgerRoutingModule { }
