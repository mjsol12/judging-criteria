import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageantApiService} from '../../shared/api/pss/pageant-api.service';
import {Score} from '../../shared/model/pp/score.model';
import {ToastrService} from 'ngx-toastr';
import {Gender} from '../../shared/model/pageant-procedure/candidate.model';

@Component({
  selector: 'app-final-question-and-answer',
  templateUrl: './final-question-and-answer.component.html',
  styleUrls: ['./final-question-and-answer.component.css']
})
export class FinalQuestionAndAnswerComponent implements OnInit, AfterViewInit, OnDestroy {
    nestedHeaders = finaleQATable.nestedHeaders ;
    scores: Score;

    judgeId: string;
    private sub: any;
    constructor(private route: ActivatedRoute, private toastr: ToastrService, private searchApi: PageantApiService) {
    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            this.judgeId = params['judge'];
        });

    }
    ngAfterViewInit() {
        this.searchApi.getScoreModule(this.judgeId).toPromise().then(score => {
            this.scores = score;
        });
    }

    async saveScore() {
        try {
            await this.searchApi.saveScoreModule(this.scores, this.judgeId).toPromise();
            this.toastr.success('Changes saved');
        } catch (e) {
            this.toastr.error(e);
        }
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}

// Format Preliminary sample
export const finaleQATable = {
    nestedHeaders: [
        [   'Category',
            '<span style="font-size: 10px">#</span>',
            'Conceptualization of Thoughts <br><span style="font-size: 10px;"> Delivery and Choice of Words - 50</span>',
            'Content <br> <span style="font-size: 10px">30</span>',
            'Impact <br> <spa style="font-size: 10px">20</spa>',
        ]
    ]
};