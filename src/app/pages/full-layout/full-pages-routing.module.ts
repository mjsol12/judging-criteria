import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScoringComponent} from './scoring/scoring.component';
import {SummaryComponent} from './summary/summary.component';


const routes: Routes = [
    {
        path: 'scoring',
        component: ScoringComponent
    },
    {
        path: 'summary',
        component: SummaryComponent
    },
    {
        path: '**',
        redirectTo: 'scoring'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FullPagesRoutingModule {
}
