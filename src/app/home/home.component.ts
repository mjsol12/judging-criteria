import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    urlSummary: string;
    JudgesFinalRound: any[];
    JudgesQARound: any[];
  constructor() { }

  ngOnInit() {
      const parsedUrl = new URL(window.location.href);
      const baseUrl = parsedUrl.origin;
      this.urlSummary = `${baseUrl}/summary?admin=admin`;
      this.JudgesFinalRound = [
          {
              id: 'judge1FR',
              url: `${baseUrl}/final-round?judge=judge_1`,
              name: 'Judge 1'
          },
          {
              id: 'judge2FR',
              url: `${baseUrl}/final-round?judge=judge_2`,
              name: 'Judge 2'
          },
          {
              id: 'judge3FR',
              url: `${baseUrl}/final-round?judge=judge_3`,
              name: 'Judge 3'
          },
          {
              id: 'judge4FR',
              url: `${baseUrl}/final-round?judge=judge_4`,
              name: 'Judge 4'
          },
          {
              id: 'judge5FR',
              url: `${baseUrl}/final-round?judge=judge_5`,
              name: 'Judge 5'
          }
      ];

      this.JudgesQARound = [
          {
              id: 'judge1FR',
              url: `${baseUrl}/question-and-answer?judge=judge_1`,
              name: 'Judge 1'
          },
          {
              id: 'judge2FR',
              url: `${baseUrl}/question-and-answer?judge=judge_2`,
              name: 'Judge 2'
          },
          {
              id: 'judge3FR',
              url: `${baseUrl}/question-and-answer?judge=judge_3`,
              name: 'Judge 3'
          },
          {
              id: 'judge4FR',
              url: `${baseUrl}/question-and-answer?judge=judge_4`,
              name: 'Judge 4'
          },
          {
              id: 'judge5FR',
              url: `${baseUrl}/question-and-answer?judge=judge_5`,
              name: 'Judge 5'
          }
      ];
  }

}
