import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageantApiService} from '../../shared/api/pss/pageant-api.service';
import {Contestant, GENDER, Score} from '../../shared/model/pp/score.model';
import {ToastrService} from 'ngx-toastr';
import {Gender} from '../../shared/model/pageant-procedure/candidate.model';

export class ScoringTabUI {
    constructor(
        public tabName: string,
        public header: any[],
        public gender: Gender,
        public scores: Score[]
    ) {
    }
}

@Component({
  selector: 'app-final-round',
  templateUrl: './final-round.component.html',
  styleUrls: ['./final-round.component.css']
})
export class FinalRoundComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input('finalRoundHotTable')preliminaryHotTable;
    scoringTabUi: ScoringTabUI[];
    nestedHeaders = finalRoundTable.nestedHeaders ;
    dataScores: Score;

    judgeId: string;
    gender = Gender;
    private sub: any;

    contestantSample() {
        return new Contestant(null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    constructor(private route: ActivatedRoute, private searchApi: PageantApiService, private toastr: ToastrService) { }

  ngOnInit() {
      // sample url
      // http://localhost:4200/preliminary?judge=judge_1

      this.sub = this.route.queryParams.subscribe(params => {
          this.judgeId = params['judge'];
      });
  }
    async ngAfterViewInit() {
        await this.initScoring();

    }

    async initScoring() {
        if (!this.judgeId) {
            return;
        }
        try {
            this.dataScores = await this.searchApi.getScoreModule(this.judgeId).toPromise();

            const categorical = this.groupBy(this.dataScores.contestants, 'CATEGORY');

            this.scoringTabUi = [
                new ScoringTabUI('Ms.', this.nestedHeaders, Gender.Female, categorical.female ),
                new ScoringTabUI('Mr.', this.nestedHeaders, Gender.Female, categorical.male )
            ];
        } catch (e) {
            this.toastr.error(e, 'Error');
        }
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

    groupBy(arr, property) {
        return arr.reduce((memo, x) => {
            if (!memo[x[property]]) { memo[x[property]] = []; }
            memo[x[property]].push(x);
            return memo;
        }, {});
    }

    async saveScore() {
      try {

          await this.searchApi.saveScoreModule(this.dataScores, this.judgeId).toPromise();
          this.toastr.success('Saved Changes');
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

// Format final round sample
export const finalRoundTable = {
    nestedHeaders: [
        [   {label: '', colspan: 1},
            {label: 'School Uniform', colspan: 3},
            {label: 'Sports Wear', colspan: 4},
            {label: 'Creative Costume', colspan: 4},
            ''
        ],
        [
            'Candidate <br> <span style="font-size: 10px">#</span>',

            'Personality <br> <spa style="font-size: 10px">50</spa>',
            'Poise & Bearing <br> <spa style="font-size: 10px">30</spa>',
            'Carriage <br> <spa style="font-size: 10px">20</spa>',

            'Poise & Bearing <br> <spa style="font-size: 10px">40</spa>',
            'Carriage <br> <spa style="font-size: 10px">30</spa>',
            'Figure <br> <spa style="font-size: 10px">20</spa>',
            'Sports Identity <br> <spa style="font-size: 10px">10</spa>',

            'Concept <br><span style="font-size: 10px;"> 40</span>',
            'Poise & Bearing <br> <spa style="font-size: 10px">25</spa>',
            'Carriage <br> <spa style="font-size: 10px">20</spa>',
            'Beauty <br> <spa style="font-size: 10px">15</spa>',
            ''
        ]
    ]
};

