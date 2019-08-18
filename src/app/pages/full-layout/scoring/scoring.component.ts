import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import Handsontable from 'handsontable';
import {PageantApiService} from '../../../shared/api/pss/pageant-api.service';

@Component({
    selector: 'app-scoring',
    templateUrl: './scoring.component.html',
    styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit, AfterViewInit {
    @ViewChild('preQuestionHotTab', {static: false}) preQuestionHotTab;

    nestedHeaders: any[] = [];
    columns: any;
    datas: any;

    constructor(private psApi: PageantApiService) { }

    ngOnInit() {
        this.preJudge().then();
    }

    async ngAfterViewInit() {
        await this.preJudge();
     }

    async preJudge() {
        const pageantJudging = await this.psApi.getJudge().toPromise();
        this.nestedHeaders = pageantJudging.nestedHeaders;
        this.columns = pageantJudging.columnDataTypes;
        this.datas = pageantJudging.datas;
    }

}


export const dataTable1: any[] = [{
    title: 'Preliminary Round',
    nestedHeaders: ['', {label: 'Question And Answer - 50%', colspan: 3}],
    colHeaders : ['Candidate' , 'Content <br> Relevance - 50', 'Conceptualization of Thoughts <br> Delivery and Choice of Words - 40', 'Impact <br> 10'],
    columns : [
        {
            data: 'candidate',
            editor: false
        },
        {
            data: 'content',
            editor: 'numeric'
        },
        {
            data: 'conceptualizationThoughts',
            editor: 'numeric'
        },
        {
            data: 'impact',
            editor: 'numeric'
        }
    ],
    candidates: [
        {
            candidate: 'M #1',
            content: 80,
            conceptualizationThoughts: 90,
            impact: 90
        },
        {
            candidate: 'F #1',
            conceptualizationThoughts: 90,
            impact: 90
        },
        {
            candidate: 'M #2',
            content: 80,
            conceptualizationThoughts: 90,
            impact: 90
        },
        {
            candidate: 'F #2',
            conceptualizationThoughts: 90,
            impact: 90
        },
    ]
}];

