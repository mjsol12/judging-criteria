import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageantApiService} from '../shared/api/pss/pageant-api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('summaryHotTable', {static: false})summaryHotTable;
    nestedHeaders = finalSummaryTable.nestedHeaders ;
    data: any[] = [];

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
    async ngAfterViewInit() {
      try {
          this.data = await this.getSummary();
      } catch (e) {
          this.toastr.error(e, 'Error Server');
      }
    }

    async getSummary() {
        if (this.adminId) {
            return this.searchApi.getSummary(this.adminId).toPromise();
        }
        return;
    }

    async saveChanges() {
        try {
            await this.searchApi.getSaveSummary(this.data, this.adminId).toPromise();
            this.toastr.success('Please reload the page', 'Saved Changes');
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
export const finalSummaryTable = {
    nestedHeaders: [
        [   '',
            {label: 'Preliminary Round', colspan: 5},
            {label: 'Final Round', colspan: 4},
            {label: 'Final Question And Answer', colspan: 4},
            ''
        ],
        [   'Candidate <br> <span style="font-size: 10px">#</span>',
            'Attendance <br> <span style="font-size: 10px">(Score) 20</span>',
            'Judge 1',
            'Judge 2',
            'Judge 3 ',
            'Rank',
            'Judge 1',
            'Judge 2',
            'Judge 3 ',
            'Rank ',
            'Judge 1',
            'Judge 2',
            'Judge 3 ',
            'Rank',
            ''
        ]
    ]
};
