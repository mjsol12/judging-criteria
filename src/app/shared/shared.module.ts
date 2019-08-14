import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HotTableModule} from '@handsontable/angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
    exports: [
        CommonModule,
        HotTableModule,
        NgbModule
    ],
    imports: [
        RouterModule,
        HttpClientModule,
        HotTableModule,
        CommonModule,
        NgbModule
    ]
})
export class SharedModule { }
