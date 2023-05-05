import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftManagementFilterComponent } from './shift-management-filter.component';

describe('ShiftManagementFilterComponent', () => {
  let component: ShiftManagementFilterComponent;
  let fixture: ComponentFixture<ShiftManagementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftManagementFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftManagementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
