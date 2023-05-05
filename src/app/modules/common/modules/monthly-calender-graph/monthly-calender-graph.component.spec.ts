import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCalenderGraphComponent } from './monthly-calender-graph.component';

describe('MonthlyCalenderGraphComponent', () => {
  let component: MonthlyCalenderGraphComponent;
  let fixture: ComponentFixture<MonthlyCalenderGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyCalenderGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyCalenderGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
