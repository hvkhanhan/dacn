import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorsComponent } from './add-mentors.component';

describe('AddMentorsComponent', () => {
  let component: AddMentorsComponent;
  let fixture: ComponentFixture<AddMentorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
