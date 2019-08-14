import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScoringComponent} from './scoring/scoring.component';
import {SummaryComponent} from './summary/summary.component';
import {SetupComponent} from './setup/setup.component';


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
        path: 'setup',
        component: SetupComponent
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
