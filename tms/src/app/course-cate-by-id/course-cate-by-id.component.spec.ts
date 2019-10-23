import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCateByIdComponent } from './course-cate-by-id.component';

describe('CourseCateByIdComponent', () => {
  let component: CourseCateByIdComponent;
  let fixture: ComponentFixture<CourseCateByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCateByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCateByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
