import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDateRangeComponent } from './timesheet-date-range.component';

describe('TimesheetDateRangeComponent', () => {
  let component: TimesheetDateRangeComponent;
  let fixture: ComponentFixture<TimesheetDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetDateRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
