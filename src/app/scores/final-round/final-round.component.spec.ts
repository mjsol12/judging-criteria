import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalRoundComponent } from './final-round.component';

describe('FinalRoundComponent', () => {
  let component: FinalRoundComponent;
  let fixture: ComponentFixture<FinalRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
