import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Candidate} from '../../../shared/model/pageant-procedure/candidate.model';
import {PageantApiService} from '../../../shared/api/pss/pageant-api.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Procedure} from '../../../shared/model/pageant-procedure/procedure.model';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit, OnDestroy {
    candidate: Candidate;

    methodology: string;
    weight: number;

    candidateFormGroup: FormGroup;

    candidateSubscription: Subscription;
    constructor(private pageantApiService: PageantApiService, private fb: FormBuilder) { }

    ngOnInit() {
        this.candidateFormGroup = this.fb.group({
            fullname: null,
            candidateNumber: null,
            gender: null
        });
    }

    getProcedures() {
        this.pageantApiService.getProcedures().subscribe(val => {
            console.log(val);
        });
    }

    addNewProcedure() {
        debugger
        const method = new Procedure(this.methodology, this.weight);
        console.log(method)
    }

    saveCandidate() {
        const info = this.candidateFormGroup.getRawValue();
        const contestant = new Candidate(info.fullname, info.candidateNumber, info.gender);
        this.candidateSubscription = this.pageantApiService.saveCandidate(contestant).subscribe(val => {
            console.log(val);
        });
    }

    ngOnDestroy() {
        if (this.candidateSubscription) {
            this.candidateSubscription.unsubscribe();
        }
    }

}
