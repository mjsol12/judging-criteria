import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api/api.service';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
    nestedHeaders = table.nestedHeaders ;
    constructor(private api: ApiService) { }

    ngOnInit() {
    }

}
// Format sample
export const table = {
    nestedHeaders: [
        [   '',
            {label: 'Question And Answer - 50%', colspan: 3},
            {label: 'Production Outfit - 30%', colspan: 4},
            'Attendance - 20%'
        ],
        [   'Candidate <br> <span style="font-size: 10px">#</span>',
            'Content <br> <span style="font-size: 10px">Relevance - 50</span>',
            'Conceptualization of Thoughts <br><span style="font-size: 10px;"> Delivery and Choice of Words - 40</span>',
            'Impact <br> <spa style="font-size: 10px">10</spa>',
            'Poise and Bearing <br> <spa style="font-size: 10px">40</spa>',
            'Carriage <br> <spa style="font-size: 10px">30</spa>',
            'Beauty <br> <spa style="font-size: 10px">20</spa>',
            'Impact <br> <spa style="font-size: 10px">10</spa>',
            '<spa style="font-size: 10px">20</spa>',
        ]
    ]
};
