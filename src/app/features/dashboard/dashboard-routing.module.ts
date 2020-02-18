/** @format */

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: { breadCrum: 'Dashboard' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
