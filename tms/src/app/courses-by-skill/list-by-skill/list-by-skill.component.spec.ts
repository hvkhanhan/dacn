import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBySkillComponent } from './list-by-skill.component';

describe('ListBySkillComponent', () => {
  let component: ListBySkillComponent;
  let fixture: ComponentFixture<ListBySkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBySkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
