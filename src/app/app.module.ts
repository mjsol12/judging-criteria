import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotTableModule } from '@handsontable/angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './pages/content-layout/login/login.component';
import {ApiService} from './shared/api/api.service';
import {PageantCriteriaService} from './shared/api/pageant-criteria.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        FullLayoutComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        NgbModule,
        HotTableModule.forRoot()
    ],
    providers: [ApiService, PageantCriteriaService],
    bootstrap: [AppComponent]
})
export class AppModule { }
