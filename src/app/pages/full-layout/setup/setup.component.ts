import { Component, OnInit } from '@angular/core';
import {Criteria} from '../../../shared/model/search-criteria/criteria.model';
import {Candidate} from '../../../shared/model/search-criteria/candidate.model';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

    criteria: Criteria;

    candidate: Candidate;

    constructor() { }

    ngOnInit() {
    }

}
