import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleShiftPopupComponent } from './schedule-shift-popup.component';

describe('ScheduleShiftPopupComponent', () => {
  let component: ScheduleShiftPopupComponent;
  let fixture: ComponentFixture<ScheduleShiftPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleShiftPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleShiftPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
