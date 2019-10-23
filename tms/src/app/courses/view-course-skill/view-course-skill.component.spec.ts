import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseSkillComponent } from './view-course-skill.component';

describe('ViewCourseSkillComponent', () => {
  let component: ViewCourseSkillComponent;
  let fixture: ComponentFixture<ViewCourseSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCourseSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
