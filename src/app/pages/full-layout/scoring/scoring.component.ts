import { Component, OnInit } from '@angular/core';

import Handsontable from 'handsontable';

@Component({
    selector: 'app-scoring',
    templateUrl: './scoring.component.html',
    styleUrls: ['./scoring.component.css']
})
export class ScoringComponent implements OnInit {
    hotSettings: Handsontable.GridSettings = {
        rowHeaders: true,
        contextMenu: true,
    };

    dataTable = dataTable;
    constructor() { }

    ngOnInit() {
        this.hotSettings.colHeaders =  this.dataTable[0].columnHeaders.map(value => {
            return value.headerName;
        });

        this.hotSettings.data = this.dataTable[0].candidates;
    }
    scoreBoardH(col) {
        switch (col) {
            case 0:
                return '<b>Candidate</b>';
            case 1:
                return '<b>Criteria 1 (20%)</b>';
            case 2:
                return '<b>Criteria 2 (20%)</b>';
            case 3:
                return '<b>Criteria 3 (20%)</b>';
            case 4:
                return '<b>Criteria 4 (20%)</b>';
            case 5:
                return '<b>Criteria 5 (20%)</b>';
            case 6:
                return '<b>Criteria 6 (20%)</b>';
        }
    }
}




export const dataTable: any[] = [
    {
        columnHeaders : [
            {
                id: 'candidate',
                headerName: 'Candidate'
            },
            {
                id: 'firstCriteria',
                headerName: 'Pose (20%)',
            },
            {
                id: 'secondCriteria',
                headerName: 'Sports (20%)',
            },
            {
                id: 'secondCriteria',
                headerName: 'Evening Attire (20%)',
            },
            {
                id: 'thirdCriteria',
                headerName: 'Sports (20%)',
            },
        ],
        candidates: [
            {
                candidate: '#1',
                firstCriteria: '80',
                secondCriteria: '90',
                thirdCriteria: '90',
                fourthCriteria: '90',
                fifthCriteria: '90',
                sixthCriteria: '90',
                seventhCriteria: '90',
                eightCriteria: '90',
                ninthCriteria: '90',
                tenthCriteria: '90',
            },
            {
                data: '',
                candidate: '#2',
                firstCriteria: '80',
                secondCriteria: '90',
                thirdCriteria: '90',
                fourthCriteria: '90',
                fifthCriteria: '90',
                sixthCriteria: '90',
                seventhCriteria: '90',
                eightCriteria: '90',
                ninthCriteria: '90',
                tenthCriteria: '90',
            },
            {
                data: '',
                candidate: '#3',
                firstCriteria: '80',
                secondCriteria: '90',
                thirdCriteria: '90',
                fourthCriteria: '90',
                fifthCriteria: '90',
                sixthCriteria: '90',
                seventhCriteria: '90',
                eightCriteria: '90',
                ninthCriteria: '90',
                tenthCriteria: '90',
            },
        ]
    }
]