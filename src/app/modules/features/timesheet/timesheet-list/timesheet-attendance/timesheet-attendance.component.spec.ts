import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetAttendanceComponent } from './timesheet-attendance.component';

describe('TimesheetAttendanceComponent', () => {
  let component: TimesheetAttendanceComponent;
  let fixture: ComponentFixture<TimesheetAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
