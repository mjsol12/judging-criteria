import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HotTableModule} from '@handsontable/angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {PageantApiService} from './api/pss/pageant-api.service';



@NgModule({
    exports: [
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HotTableModule,
        NgbModule,
        ToastrModule
    ],
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HotTableModule,
        CommonModule,
        NgbModule,
        ToastrModule.forRoot()
    ],
    providers: [
        PageantApiService
    ]
})
export class SharedModule { }
