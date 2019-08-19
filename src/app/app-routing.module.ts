import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SummaryComponent} from './summary/summary.component';
import {ScoreComponent} from './score/score.component';


const routes: Routes = [
    {
        path: 'score',
        component: ScoreComponent
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
