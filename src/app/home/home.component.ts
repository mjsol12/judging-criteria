import { Component, OnInit } from '@angular/core';
import {PageantApiService} from '../shared/api/pss/pageant-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private searchService: PageantApiService) { }

  ngOnInit() {
  }

}
