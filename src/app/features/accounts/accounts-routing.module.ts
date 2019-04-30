import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountsViewComponent } from './accounts-view/accounts-view.component';
import { AccountFormComponent } from './account-form/account-form.component';


const routes: Routes = [
  {
    path: '', component: AccountsViewComponent,
    data: {
      title: 'Account Chart',
      breadCrum: ''
    }
  },
  {
    path: 'new', component: AccountFormComponent,
    data: {
      title: 'Create accounts',
      breadCrum: 'Create'
    }
  },
  {
    path: ':accountId/update', component: AccountFormComponent,
    data: {
      title: 'Update accounts',
      breadCrum: 'Update'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AccountsRoutingModule { }
