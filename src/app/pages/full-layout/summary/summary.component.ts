import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
    data: any[] = [
        ['Candidate 1', 98, 79, 80, 80, 90, 95],
        ['Candidate 2', 98, 79, 80, 80, 90, 95],
        ['Candidate 3', 98, 79, 80, 80, 90, 95],
        ['Candidate 4', 98, 79, 80, 80, 90, 95],
        ['Candidate 5', 98, 79, 80, 80, 90, 95]
    ];
    constructor() { }

    ngOnInit() {
    }

    scoreSummaryH(col) {
        switch (col) {
            case 0:
                return '<b>Candidates</b>';
            case 1:
                return '<b>Judge 1</b>';
            case 2:
                return '<b>Judge 2</b>';
            case 3:
                return '<b>Judge 3</b>';
            case 4:
                return '<b>Judge 4</b>';
            case 5:
                return '<b>Judge 5</b>';
            case 6:
                return '<b>Total Score</b>';
            default:
                return '';
        }
    }
}
