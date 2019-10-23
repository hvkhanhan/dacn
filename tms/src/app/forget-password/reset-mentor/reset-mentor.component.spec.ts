import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetMentorComponent } from './reset-mentor.component';

describe('ResetMentorComponent', () => {
  let component: ResetMentorComponent;
  let fixture: ComponentFixture<ResetMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
