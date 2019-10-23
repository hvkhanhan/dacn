import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainnesListComponent } from './trainnes-list.component';

describe('TrainnesListComponent', () => {
  let component: TrainnesListComponent;
  let fixture: ComponentFixture<TrainnesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainnesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainnesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
