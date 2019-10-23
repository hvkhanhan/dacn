import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesBySkillComponent } from './courses-by-skill.component';

describe('CoursesBySkillComponent', () => {
  let component: CoursesBySkillComponent;
  let fixture: ComponentFixture<CoursesBySkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesBySkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesBySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
