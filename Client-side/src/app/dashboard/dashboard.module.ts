import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { ChartsModule } from 'ng2-charts';


import { HomeComponent } from './home.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule,
        ChartsModule
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
