import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStepSecondComponent } from './job-step-second.component';

describe('JobStepSecondComponent', () => {
  let component: JobStepSecondComponent;
  let fixture: ComponentFixture<JobStepSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobStepSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStepSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
