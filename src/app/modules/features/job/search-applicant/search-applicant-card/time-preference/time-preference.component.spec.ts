import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePreferenceComponent } from './time-preference.component';

describe('TimePreferenceComponent', () => {
  let component: TimePreferenceComponent;
  let fixture: ComponentFixture<TimePreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePreferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
