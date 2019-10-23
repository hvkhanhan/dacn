import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTraineeComponent } from './reset-trainee.component';

describe('ResetTraineeComponent', () => {
  let component: ResetTraineeComponent;
  let fixture: ComponentFixture<ResetTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetTraineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
