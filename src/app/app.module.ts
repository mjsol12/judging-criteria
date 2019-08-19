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
import {PageantApiService} from './shared/api/pss/pageant-api.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptorService} from './shared/interceptors/auth-interceptor.service';
import {AuthenticationService} from './shared/auth-api/authentication.service';
import {AuthGuard} from './shared/auth-api/auth-guard.service';
import { ScoreComponent } from './score/score.component';
import { SummaryComponent } from './summary/summary.component';
import { PrelimniaryComponent } from './scores/prelimniary/prelimniary.component';
import { FinalRoundComponent } from './scores/final-round/final-round.component';
import { FinalQuestionAndAnswerComponent } from './scores/final-question-and-answer/final-question-and-answer.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        ScoreComponent,
        SummaryComponent,
        PrelimniaryComponent,
        FinalRoundComponent,
        FinalQuestionAndAnswerComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        NgbModule,
        HotTableModule.forRoot()
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ApiService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
