import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FullLayoutComponent} from './layout/full-layout/full-layout.component';
import {Full_ROUTES} from './shared/routes/full-layout.routes';
import {LoginComponent} from './pages/content-layout/login/login.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {title: 'full Views'},
        children: Full_ROUTES,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
