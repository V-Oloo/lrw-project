import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ThemeConstantService } from '../shared/services/theme-constant.service';

import { HomeComponent } from './home.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule,
    ],
    exports: [],
    declarations: [
        HomeComponent
    ],
    providers: [
        ThemeConstantService
    ],
})
export class DashboardModule { }
