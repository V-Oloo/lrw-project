import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full-layout/full-layout.component";
import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";

import { FullLayout_ROUTES } from "./shared/routes/full-layout.routes";
import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";
import { PAGENOTFOUND } from './shared/errors/page-not-found.component';
import { ACCESSDENIED } from './shared/errors/error-2.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: CommonLayout_ROUTES
    },
    {
        path: '',
        component: FullLayoutComponent,
        children: FullLayout_ROUTES
    },

    {
      path: 'unauthorised',
      component: ACCESSDENIED,
    },

    { path: '**', component: PAGENOTFOUND }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
            useHash: true,
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
