import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageantApiService} from '../../shared/api/pss/pageant-api.service';

@Component({
  selector: 'app-final-question-and-answer',
  templateUrl: './final-question-and-answer.component.html',
  styleUrls: ['./final-question-and-answer.component.css']
})
export class FinalQuestionAndAnswerComponent implements OnInit, AfterViewInit, OnDestroy {
    nestedHeaders = preliminaryTable.nestedHeaders ;
    data: any ;

    judgeId: string;
    private sub: any;
    constructor(private route: ActivatedRoute, private searchApi: PageantApiService) { }

    ngOnInit() {
        // sample url
        // http://localhost:4200/preliminary?judge=judge_1

        this.sub = this.route.queryParams.subscribe(params => {
            this.judgeId = params['judge'];
        });
    }
    ngAfterViewInit() {
        if (this.judgeId) {
            this.searchApi.getScoreModule(this.judgeId).toPromise().then(value => {
                this.data = value.contestants;
            });
        }
    }

    async saveScore() {
        console.log(this.data);
        // await this.searchApi.saveScoreModule(this.data, this.judgeId).toPromise();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}

// Format Preliminary sample
export const preliminaryTable = {
    nestedHeaders: [
        [   'Candidate <br> <span style="font-size: 10px">#</span>',
            'Conceptualization of Thoughts <br><span style="font-size: 10px;"> Delivery and Choice of Words - 50</span>',
            'Content <br> <span style="font-size: 10px">30</span>',
            'Impact <br> <spa style="font-size: 10px">20</spa>',
        ]
    ]
};