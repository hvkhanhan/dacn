import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTimeComponent } from './assigned-time.component';

describe('AssignedTimeComponent', () => {
  let component: AssignedTimeComponent;
  let fixture: ComponentFixture<AssignedTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
