import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOverlapPopupComponent } from './time-overlap-popup.component';

describe('TimeOverlapPopupComponent', () => {
  let component: TimeOverlapPopupComponent;
  let fixture: ComponentFixture<TimeOverlapPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOverlapPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOverlapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
