import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageantApiService} from '../../shared/api/pss/pageant-api.service';
import 'rxjs/add/operator/filter';
import {Score} from '../../shared/model/pp/score.model';
import {ToastrService} from 'ngx-toastr';
@Component({
    selector: 'app-prelimniary',
    templateUrl: './prelimniary.component.html',
    styleUrls: ['./prelimniary.component.css']
})
export class PrelimniaryComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input('preliminaryHotTable')preliminaryHotTable;
    nestedHeaders = preliminaryTable.nestedHeaders ;
    data: Score;

    judgeId: string;
    private sub: any;
    constructor(private route: ActivatedRoute, private toastr: ToastrService, private searchApi: PageantApiService) { }

    ngOnInit() {
        // sample url
        // http://localhost:4200/preliminary?judge=judge_1

        this.sub = this.route.queryParams.subscribe(params => {
             this.judgeId = params['judge'];
        });
    }
    async ngAfterViewInit() {
        if (this.judgeId) {
            this.data = await this.searchApi.getScoreModule(this.judgeId).toPromise();
        }
    }

    async saveScore() {
        console.log(this.data)
        // try {
        //     await this.searchApi.saveScoreModule(this.data, this.judgeId).toPromise();
        //     this.toastr.success('Changes saved');
        // } catch (e) {
        //     this.toastr.error(e);
        // }
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
        [   '',
            {label: 'Question And Answer - 50%', colspan: 3},
            {label: 'Production Outfit - 30%', colspan: 4},
            'Attendance - 20%'
        ],
        [   'Candidate <br> <span style="font-size: 10px">#</span>',
            'Content <br> <span style="font-size: 10px">Relevance - 50</span>',
            'Conceptualization of Thoughts <br><span style="font-size: 10px;"> Delivery and Choice of Words - 40</span>',
            'Impact <br> <spa style="font-size: 10px">10</spa>',
            'Poise and Bearing <br> <spa style="font-size: 10px">40</spa>',
            'Carriage <br> <spa style="font-size: 10px">30</spa>',
            'Beauty <br> <spa style="font-size: 10px">20</spa>',
            'Impact <br> <spa style="font-size: 10px">10</spa>',
            '<spa style="font-size: 10px">20</spa>',
        ]
    ]
};