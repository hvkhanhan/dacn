import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignedListComponent } from './assigned-list.component';

describe('AdminAssignedListComponent', () => {
  let component: AdminAssignedListComponent;
  let fixture: ComponentFixture<AdminAssignedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAssignedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssignedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
