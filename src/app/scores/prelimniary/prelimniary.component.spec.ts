import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrelimniaryComponent } from './prelimniary.component';

describe('PrelimniaryComponent', () => {
  let component: PrelimniaryComponent;
  let fixture: ComponentFixture<PrelimniaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrelimniaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrelimniaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
