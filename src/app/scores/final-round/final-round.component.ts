import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageantApiService} from '../../shared/api/pss/pageant-api.service';
import {Score} from '../../shared/model/pp/score.model';

@Component({
  selector: 'app-final-round',
  templateUrl: './final-round.component.html',
  styleUrls: ['./final-round.component.css']
})
export class FinalRoundComponent implements OnInit, AfterViewInit, OnDestroy{

    @Input('finalRoundHotTable')preliminaryHotTable;
    nestedHeaders = finalRoundTable.nestedHeaders ;
    data: Score;

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
            this.searchApi.getScoreModule(this.judgeId).toPromise().then(score => {
                this.data = score;
            });
        }
    }

    async saveScore() {
        await this.searchApi.saveScoreModule(this.data, this.judgeId).toPromise();
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
        [   '',
            {label: 'School Uniform', colspan: 3},
            {label: 'Sports Wear', colspan: 4},
            {label: 'Creative Costume', colspan: 4}
        ],
        [   'Candidate <br> <span style="font-size: 10px">#</span>',

            'Personality <br> <spa style="font-size: 10px">50</spa>',
            'Poise and Bearing <br> <spa style="font-size: 10px">30</spa>',
            'Carriage <br> <spa style="font-size: 10px">20</spa>',

            'Poise and Bearing <br> <spa style="font-size: 10px">40</spa>',
            'Carriage <br> <spa style="font-size: 10px">30</spa>',
            'Figure <br> <spa style="font-size: 10px">20</spa>',
            'Sports Identity <br> <spa style="font-size: 10px">10</spa>',

            'Concept <br><span style="font-size: 10px;"> 40</span>',
            'Poise and Bearing <br> <spa style="font-size: 10px">25</spa>',
            'Carriage <br> <spa style="font-size: 10px">20</spa>',
            'Beauty <br> <spa style="font-size: 10px">15</spa>'
        ]
    ]
};