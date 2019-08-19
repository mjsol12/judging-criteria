import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalQuestionAndAnswerComponent } from './final-question-and-answer.component';

describe('FinalQuestionAndAnswerComponent', () => {
  let component: FinalQuestionAndAnswerComponent;
  let fixture: ComponentFixture<FinalQuestionAndAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalQuestionAndAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalQuestionAndAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
