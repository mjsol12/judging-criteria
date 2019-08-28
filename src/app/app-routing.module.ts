import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummaryComponent} from './summary/summary.component';
import {FinalRoundComponent} from './scores/final-round/final-round.component';
import {FinalQuestionAndAnswerComponent} from './scores/final-question-and-answer/final-question-and-answer.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
    {
        path: 'admin/home',
        component: HomeComponent
    },
    {
        path: 'final-round',
        component: FinalRoundComponent
    },
    {
        path: 'question-and-answer',
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
