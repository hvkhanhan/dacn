import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAcceptComponent } from './course-accept.component';

describe('CourseAcceptComponent', () => {
  let component: CourseAcceptComponent;
  let fixture: ComponentFixture<CourseAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
