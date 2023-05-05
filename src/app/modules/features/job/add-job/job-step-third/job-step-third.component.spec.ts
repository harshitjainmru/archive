import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStepThirdComponent } from './job-step-third.component';

describe('JobStepThirdComponent', () => {
  let component: JobStepThirdComponent;
  let fixture: ComponentFixture<JobStepThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobStepThirdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStepThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
