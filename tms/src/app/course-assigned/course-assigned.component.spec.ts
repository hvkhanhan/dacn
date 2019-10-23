import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAssignedComponent } from './course-assigned.component';

describe('CourseAssignedComponent', () => {
  let component: CourseAssignedComponent;
  let fixture: ComponentFixture<CourseAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
