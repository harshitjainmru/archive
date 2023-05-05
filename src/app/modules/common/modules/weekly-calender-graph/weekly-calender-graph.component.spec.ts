import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyCalenderGraphComponent } from './weekly-calender-graph.component';

describe('WeeklyCalenderGraphComponent', () => {
  let component: WeeklyCalenderGraphComponent;
  let fixture: ComponentFixture<WeeklyCalenderGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyCalenderGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyCalenderGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
