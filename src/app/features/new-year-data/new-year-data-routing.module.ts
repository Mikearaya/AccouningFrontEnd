/** @format */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewYearDataComponent } from './create-new-year-data/create-new-year-data.component';

const routes: Routes = [
    {
        path: '',
        component: CreateNewYearDataComponent,
        data: { breadCrum: 'create', claim: 'canCreateNewPeriod' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewYearDataRoutingModule {}
