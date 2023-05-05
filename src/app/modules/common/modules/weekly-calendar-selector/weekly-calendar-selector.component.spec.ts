import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyCalendarSelectorComponent } from './weekly-calendar-selector.component';

describe('WeeklyCalendarSelectorComponent', () => {
  let component: WeeklyCalendarSelectorComponent;
  let fixture: ComponentFixture<WeeklyCalendarSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyCalendarSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyCalendarSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
