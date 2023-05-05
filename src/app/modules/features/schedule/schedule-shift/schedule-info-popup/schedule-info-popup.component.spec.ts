import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInfoPopupComponent } from './schedule-info-popup.component';

describe('ScheduleInfoPopupComponent', () => {
  let component: ScheduleInfoPopupComponent;
  let fixture: ComponentFixture<ScheduleInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
