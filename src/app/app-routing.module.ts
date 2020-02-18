/** @format */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './core/services/auth-guard.guard';
import { UnAuthorizedPageComponent } from './shared/un-authorized-page/un-authorized-page.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: '../app/features/features-module.module#FeaturesModule',

        data: {
            breadCrum: 'Home',
        },
        canLoad: [AuthGuardGuard],
    },
    { path: 'unauthorized', component: UnAuthorizedPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
