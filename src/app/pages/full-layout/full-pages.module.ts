import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoringComponent } from './scoring/scoring.component';
import { SummaryComponent } from './summary/summary.component';
import {FullPagesRoutingModule} from './full-pages-routing.module';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FullPagesRoutingModule
    ],
    declarations: [
        ScoringComponent,
        SummaryComponent
    ]
})
export class FullPagesModule { }
