import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssignedComponent } from './update-assigned.component';

describe('UpdateAssignedComponent', () => {
  let component: UpdateAssignedComponent;
  let fixture: ComponentFixture<UpdateAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
