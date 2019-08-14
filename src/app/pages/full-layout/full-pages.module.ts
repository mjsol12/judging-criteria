import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoringComponent } from './scoring/scoring.component';
import { SummaryComponent } from './summary/summary.component';
import {FullPagesRoutingModule} from './full-pages-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { SetupComponent } from './setup/setup.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FullPagesRoutingModule
    ],
    declarations: [
        ScoringComponent,
        SummaryComponent,
        SetupComponent
    ]
})
export class FullPagesModule { }
