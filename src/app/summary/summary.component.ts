import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageantApiService} from '../shared/api/pss/pageant-api.service';
import {ToastrService} from 'ngx-toastr';
import {Score} from '../shared/model/pp/score.model';
import {Gender} from '../shared/model/pageant-procedure/candidate.model';
export class ScoresTabUI {
    constructor(
        public tabName: string,
        public header: any[],
        public gender: Gender,
        public scores: Score[]
    ) {
    }
}
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('summaryHotTable', {static: false})summaryHotTable;

    nestedHeaders = finalSummaryTable.nestedHeaders ;
    finalRoundTabUI: ScoresTabUI[];

    nestedHeadersQuestionAnswer = qASummaryTable.nestedHeaders ;
    questionAndAnswerTabUi: ScoresTabUI[];

    data: any;

    adminId: string;
    private sub: any;
  constructor(private route: ActivatedRoute,
              private toastr: ToastrService,
              private searchApi: PageantApiService) {
  }

  ngOnInit() {
      // sample url
      // http://localhost:4200/preliminary?judge=judge_1

      this.sub = this.route.queryParams.subscribe(params => {
          this.adminId = params['admin'];
      });
  }

    scoreRenderer(instance, td, row, col, prop, value, cellProperties) {
        if (value != null || (value && value.trim &&  value.trim() !== '')) {
            td.style.fontWeight = 'bold';
            td.style.textAlign = 'center';
            td.innerText = `${value}`;
        } else {
            td.innerText = '';
        }
        return td;
    }

    candidateRenderer(instance, td, row, col, prop, value, cellProperties) {
        if (value != null || (value && value.trim &&  value.trim() !== '')) {
            td.style.fontWeight = 'bold';
            td.style.textAlign = 'center';
            td.style.fontSize = '16px';
            td.innerText = `${value}`;
        } else {
            td.innerText = '';
        }
        return td;
    }

    async ngAfterViewInit() {
        await this.initScores();
    }

    async initScores() {
        try {
            this.data = await this.getSummary();

            this.finalRoundTabUI = [
                new ScoresTabUI('Ms.', this.nestedHeaders, Gender.Female, this.data.finalMsRanks),
                new ScoresTabUI('Mr.', this.nestedHeaders,  Gender.Female, this.data.finalMrRanks),
            ];

            const female = this.returnTopRanks(this.data.finalMsRanks);
            const male = this.returnTopRanks(this.data.finalMrRanks);
            this.questionAndAnswerTabUi = [
                new ScoresTabUI('Ms.', this.nestedHeaders, Gender.Female, female),
                new ScoresTabUI('Mr.', this.nestedHeaders,  Gender.Female, male),

            ];

        } catch (e) {
            this.toastr.error(e, 'Error Server');
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

    async getSummary() {
        if (this.adminId) {
            return this.searchApi.getSummary(this.adminId).toPromise();
        }
        return;
    }

    updateForQA() {
      this.searchApi.saveSummary(this.data, this.adminId).subscribe(val => {
          this.toastr.success('saved to server', 'Succcess');
      });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
// Format Preliminary sample
export const finalSummaryTable = {
    nestedHeaders: [
        [   '',
            {label: 'School Uniform', colspan: 7},
            {label: 'Sports Wear', colspan: 7},
            {label: 'Creative Costume', colspan: 7},
            {label: 'Total Scores', colspan: 2},
            ''
        ],
        [   '',
            {label: 'Judge', colspan: 5},
            {label: 'Rank', colspan: 2},
            {label: 'Judge', colspan: 5},
            {label: 'Rank', colspan: 2},
            {label: 'Judge', colspan: 5},
            {label: 'Rank', colspan: 2},
            {label: 'Rank', colspan: 2},
            'Rank'
        ],
        [   'Candidate <br> <span style="font-size: 10px">#</span>',
            '1',
            '2',
            '3',
            '4',
            '5',
            'Score',
            '<b>#</b>',
            '1',
            '2',
            '3',
            '4',
            '5',
            'Score',
            '<b>#</b>',
            '1',
            '2',
            '3 ',
            '4',
            '5',
            'Score',
            '<b>#</b>',
            'Final Score',
            '<b>#</b>',
            ''
        ]
    ]
};
// Format Preliminary sample
export const qASummaryTable = {
    nestedHeaders: [
        [   '',
            {label: 'Judge', colspan: 5},
            {label: 'Rank', colspan: 1}
        ],
        [   'Candidate <br> <span style="font-size: 10px">#</span>',
            '1',
            '2',
            '3 ',
            '4 ',
            '5 ',
            'Final Score',
            ''
        ]
    ]
};
