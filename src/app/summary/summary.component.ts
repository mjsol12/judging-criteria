import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageantApiService} from '../shared/api/pss/pageant-api.service';
import {preliminaryTable} from '../scores/prelimniary/prelimniary.component';
import {Score} from '../shared/model/pp/score.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input('preliminaryHotTable')preliminaryHotTable;
    nestedHeaders = finalSummaryTable.nestedHeaders ;
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
            this.searchApi.getSummary(this.judgeId).toPromise().then(score => {
                this.data = score;
            });
        }
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
            {label: 'Preliminary Round', colspan: 3},
            {label: 'Final Round', colspan: 3},
            {label: 'Final Question And Answer', colspan: 3},
        ],
        [   'Candidate <br> <span style="font-size: 10px">#</span>',
            'Judge 1',
            'Judge 2',
            'Judge 3 ',
            'Judge 1',
            'Judge 2',
            'Judge 3 ',
            'Judge 1',
            'Judge 2',
            'Judge 3 '
        ]
    ]
};
