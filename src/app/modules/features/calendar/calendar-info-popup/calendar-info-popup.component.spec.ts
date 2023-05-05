import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInfoPopupComponent } from './calendar-info-popup.component';

describe('CalendarInfoPopupComponent', () => {
  let component: CalendarInfoPopupComponent;
  let fixture: ComponentFixture<CalendarInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
