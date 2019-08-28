import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageantApiService} from '../../shared/api/pss/pageant-api.service';
import {Score} from '../../shared/model/pp/score.model';
import {ToastrService} from 'ngx-toastr';
import {ScoringTabUI} from '../final-round/final-round.component';
import {Gender} from '../../shared/model/pageant-procedure/candidate.model';


@Component({
  selector: 'app-final-question-and-answer',
  templateUrl: './final-question-and-answer.component.html',
  styleUrls: ['./final-question-and-answer.component.css']
})
export class FinalQuestionAndAnswerComponent implements OnInit, AfterViewInit, OnDestroy {
    scoringTabUi: ScoringTabUI[];
    scores: Score;
    nestedHeaders = finaleQATable.nestedHeaders ;

    judgeId: string;
    private sub: any;
    constructor(private route: ActivatedRoute, private toastr: ToastrService, private searchApi: PageantApiService) {
    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            this.judgeId = params['judge'];
        });

    }
    async ngAfterViewInit() {
        this.initViews();
    }

    async initViews() {
        try {
            this.scores = await this.searchApi.getScoreModule(this.judgeId).toPromise();

            const category = this.groupBy(this.scores.contestants, 'CATEGORY');

            const female = this.returnTopRanks(category.female);
            const male = this.returnTopRanks(category.male);
            this.scoringTabUi = [
                new ScoringTabUI('Ms.', this.nestedHeaders, Gender.Female, female),
                new ScoringTabUI('Mr.', this.nestedHeaders, Gender.Female, male),
            ];
        } catch (e) {
            this.toastr.error(e, 'ERROR');
        }
    }

    returnTopRanks(arr) {
        return arr.filter((val) => {
            if (val.FINAL_ROUND_RANK <= 4 ) {
                return true;
            } else {
                return false;
            }
        });
    }

    groupBy(arr, property) {
        return arr.reduce((memo, x) => {
            if (!memo[x[property]]) { memo[x[property]] = []; }
            memo[x[property]].push(x);
            return memo;
        }, {});
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
        [
            'Candidate <br><span style="font-size: 10px">#</span></br>',
            'Intelligence <br><span style="font-size: 10px;">50</span>',
            'Beauty <br> <span style="font-size: 10px">50</span>'
        ]
    ]
};

