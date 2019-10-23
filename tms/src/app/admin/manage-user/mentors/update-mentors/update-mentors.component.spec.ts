import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMentorsComponent } from './update-mentors.component';

describe('UpdateMentorsComponent', () => {
  let component: UpdateMentorsComponent;
  let fixture: ComponentFixture<UpdateMentorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMentorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
