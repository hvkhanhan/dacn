import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorEditProfileComponent } from './mentor-edit-profile.component';

describe('MentorEditProfileComponent', () => {
  let component: MentorEditProfileComponent;
  let fixture: ComponentFixture<MentorEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
