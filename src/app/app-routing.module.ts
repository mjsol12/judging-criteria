import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummaryComponent} from './summary/summary.component';
import {PrelimniaryComponent} from './scores/prelimniary/prelimniary.component';
import {FinalRoundComponent} from './scores/final-round/final-round.component';
import {FinalQuestionAndAnswerComponent} from './scores/final-question-and-answer/final-question-and-answer.component';


const routes: Routes = [
    {
        path: 'preliminary',
        component: PrelimniaryComponent
    },
    {
        path: 'final-round',
        component: FinalRoundComponent
    },
    {
        path: 'final-question-answer',
        component: FinalQuestionAndAnswerComponent
    },
    {
        path: 'summary',
        component: SummaryComponent
    },
    {
        path: '**',
        redirectTo: 'score'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
