import {Component, OnDestroy, OnInit} from '@angular/core';
import {Candidate, Gender, RankingStage} from '../../../shared/model/pageant-procedure/candidate.model';
import {PageantApiService} from '../../../shared/api/pss/pageant-api.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

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

    gender = Gender;
    rankingStage = RankingStage;
    candidateSubscription: Subscription;
    constructor(private pageantApiService: PageantApiService, private toastrService: ToastrService , private fb: FormBuilder) { }

    ngOnInit() {
        this.candidateFormGroup = this.fb.group({
            fullname: null,
            candidateNumber: [null, Validators.required],
            gender: [null, Validators.required],
            rankingStage: [null, Validators.required]
        });
    }

    saveCandidate() {
        debugger
        if (this.candidateFormGroup.invalid) {
            return this.toastrService.error('Please fill up all input',  'Form Invalid');
        }
        const info = this.candidateFormGroup.getRawValue();
        const contestant = new Candidate(info.fullname, info.candidateNumber, info.gender, info.rankingStage);

        this.candidateSubscription = this.pageantApiService.registerPreliminaryCandidate(contestant).subscribe(val => {
            this.toastrService.success(`Successfull Added to ${info.rankingStage}`);
        }, error2 => {
            this.toastrService.error( error2.message , 'Failed Response Server');
        });
    }

    ngOnDestroy() {
        if (this.candidateSubscription) {
            this.candidateSubscription.unsubscribe();
        }
    }

}
