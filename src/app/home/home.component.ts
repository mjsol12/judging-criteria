import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    urlSummary: string;
    judge1FR: string;
    judge2FR: string;
    judge3FR: string;
    judge1QA: string;
    judge2QA: string;
    judge3QA: string;
  constructor() { }

  ngOnInit() {
      const parsedUrl = new URL(window.location.href);
      const baseUrl = parsedUrl.origin;
      this.urlSummary = `${baseUrl}/summary?admin=admin`;
      this.judge1FR = `${baseUrl}/final-round?judge=judge_1`;
      this.judge2FR = `${baseUrl}/final-round?judge=judge_2`;
      this.judge3FR = `${baseUrl}/final-round?judge=judge_3`;
      this.judge1QA = `${baseUrl}/question-and-answer?judge=judge_1`;
      this.judge2QA = `${baseUrl}/question-and-answer?judge=judge_3`;
      this.judge3QA = `${baseUrl}/question-and-answer?judge=judge_2`;
  }

}
