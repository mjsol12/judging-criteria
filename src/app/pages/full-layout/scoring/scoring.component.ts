import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {PageantApiService} from '../../../shared/api/pss/pageant-api.service';
import {Candidate, Gender, RankingStage} from '../../../shared/model/pageant-procedure/candidate.model';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

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

    constructor(private psApi: PageantApiService, private config: NgbTabsetConfig) {
        config.justify = 'center';
    }

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

    registerCandidate() {
        const preliCandidate = new Candidate('Mark Jones', 1, Gender.Male, RankingStage.FINALROUND);
        this.psApi.registerPreliminaryCandidate(preliCandidate).subscribe(val => console.log(val));
    }
}

// Format sample
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

