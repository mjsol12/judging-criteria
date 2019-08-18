import { Component, OnInit } from '@angular/core';

import Handsontable from 'handsontable';
import {PageantApiService} from '../../../shared/api/pss/pageant-api.service';

@Component({
    selector: 'app-scoring',
    templateUrl: './scoring.component.html',
    styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit {
    preQuestionHotSettings: Handsontable.GridSettings = {};
    preProductionOutfitHotSettings: Handsontable.GridSettings = {};

    dataTable = dataTable1;
    dataTable2 = dataTable2;

    constructor(private psApi: PageantApiService) { }

    ngOnInit() {
        this.preQuestionHot();
        this.preProductionOutfitHot();
    }

    preQuestionHot() {
        this.preQuestionHotSettings.nestedHeaders = [this.dataTable[0].nestedHeaders, this.dataTable[0].colHeaders];
        this.preQuestionHotSettings.columns = this.dataTable[0].columns;
        this.preQuestionHotSettings.data = this.dataTable[0].candidates;
        console.log(JSON.stringify(this.dataTable));
    }

    preProductionOutfitHot() {
        // TODO: convert to camelCase and make question value to object key
        // https://www.w3resource.com/javascript-exercises/javascript-string-exercise-11.php
        // convert value to key;
        // https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
        this.preProductionOutfitHotSettings.nestedHeaders = [this.dataTable2[0].nestedHeaders, this.dataTable2[0].colHeaders];
        this.preProductionOutfitHotSettings.columns = this.dataTable2[0].columns;
        this.preProductionOutfitHotSettings.data = this.dataTable2[0].candidates;
        console.log(JSON.stringify(this.dataTable));
    }

    getJudge() {
        this.psApi.getJudge().subscribe((val) => { console.log(val) });
    }
}


export const dataTable1: any[] = [{
    title: 'Preliminary Round',
    nestedHeaders: ['', {label: 'Question And Answer - 50%', colspan: 3}],
    colHeaders : ['Candidate', 'Content <br> Relevance - 50', 'Conceptualization of Thoughts <br> Delivery and Choice of Words - 40', 'Impact <br> 10'],
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
            candidate: '#1',
            content: 80,
            conceptualizationThoughts: 90,
            impact: 90
        },
        {
            candidate: '#3',
            content: 80,
            conceptualizationThoughts: 90,
            impact: 90
        },
        {
            candidate: '#4',
            content: 80,
            conceptualizationThoughts: 90,
            impact: 90
        },
    ]
}];
export const dataTable2: any[] = [{
    title: 'Preliminary Round',
    nestedHeaders: ['', {label: 'Production Outfit - 30%', colspan: 4}],
    colHeaders : ['Candidate', 'Poise and Bearing - 50', 'Outfit - 30', 'Beauty - 20', 'Impact 10'],
    columns : [
        {
            data: 'candidate',
            editor: false
        },
        {
            data: 'PoiseBearing',
            editor: 'numeric'
        },
        {
            data: 'outfit',
            editor: 'numeric'
        },
        {
            data: 'beauty',
            editor: 'numeric'
        },
        {
            data: 'impact',
            editor: 'numeric'
        }
    ],
    candidates: [
        {
            candidate: '#1',
            content: 80,
            PoiseBearing: 90,
            outfit: 90,
            beauty: 90,
            impact: 90
        },
        {
            candidate: '#2',
            content: 80,
            PoiseBearing: 90,
            outfit: 90,
            beauty: 90,
            impact: 90
        },
        {
            candidate: '#3',
            content: 80,
            PoiseBearing: 90,
            outfit: 90,
            beauty: 90,
            impact: 90
        }
    ]
}]

