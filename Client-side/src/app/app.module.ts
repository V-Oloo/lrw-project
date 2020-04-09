import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { ThemeConstantService } from './shared/services/theme-constant.service';

import { Globals } from './global';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PAGENOTFOUND } from './shared/errors/page-not-found.component';
import { JwtInterceptor } from './shared/interceptor/token.interceptor';
import { ACCESSDENIED } from './shared/errors/error-2.component';
import { SignaturePadModule } from 'angular2-signaturepad';



registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        FullLayoutComponent,
        PAGENOTFOUND,
        ACCESSDENIED
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgZorroAntdModule,
        AppRoutingModule,
        TemplateModule,
        SharedModule,
        NgChartjsModule,
        SignaturePadModule
    ],
    exports: [SignaturePadModule],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
       },
       // { provide: ErrorHandler, useClass: HttpErrorInterceptor },
      //  { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
        Globals,
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
        ThemeConstantService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
