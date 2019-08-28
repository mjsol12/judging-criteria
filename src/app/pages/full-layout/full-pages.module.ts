import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoringComponent } from './scoring/scoring.component';
import { SummaryComponent } from './summary/summary.component';
import {FullPagesRoutingModule} from './full-pages-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { SetupComponent } from './setup/setup.component';
import { HomeComponent } from '../../home/home.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FullPagesRoutingModule
    ],
    declarations: [
        ScoringComponent,
        SummaryComponent,
        SetupComponent,
        HomeComponent
    ]
})
export class FullPagesModule { }
