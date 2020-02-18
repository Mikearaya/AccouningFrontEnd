/** @format */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LookupViewComponent } from './lookup-view/lookup-view.component';
import { LookupFormComponent } from './lookup-form/lookup-form.component';
import { AuthGuardGuard } from 'src/app/core/services/auth-guard.guard';

const routes: Routes = [
    {
        path: '',
        component: LookupViewComponent,
        canActivate: [AuthGuardGuard],
        data: { breadCrum: 'View', claim: 'canViewLookup' },
    },
    {
        path: 'add',
        component: LookupFormComponent,
        canActivate: [AuthGuardGuard],
        data: { breadCrum: 'Add', claim: 'canAddNewLookup' },
    },
    {
        path: ':lookupId/update',
        component: LookupFormComponent,
        canActivate: [AuthGuardGuard],
        data: { breadCrum: 'Update', claim: 'canEditLookup' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LookupsRoutingModule {}
