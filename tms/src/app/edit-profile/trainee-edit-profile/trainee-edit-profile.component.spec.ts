import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeEditProfileComponent } from './trainee-edit-profile.component';

describe('TraineeEditProfileComponent', () => {
  let component: TraineeEditProfileComponent;
  let fixture: ComponentFixture<TraineeEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
