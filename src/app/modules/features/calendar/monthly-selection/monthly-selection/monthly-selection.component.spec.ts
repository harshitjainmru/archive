import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySelectionComponent } from './monthly-selection.component';

describe('MonthlySelectionComponent', () => {
  let component: MonthlySelectionComponent;
  let fixture: ComponentFixture<MonthlySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlySelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
