import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobManagementFilterComponent } from './job-management-filter.component';

describe('JobManagementFilterComponent', () => {
  let component: JobManagementFilterComponent;
  let fixture: ComponentFixture<JobManagementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobManagementFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobManagementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
