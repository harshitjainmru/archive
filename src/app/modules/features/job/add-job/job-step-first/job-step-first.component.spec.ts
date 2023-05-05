import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStepFirstComponent } from './job-step-first.component';

describe('JobStepFirstComponent', () => {
  let component: JobStepFirstComponent;
  let fixture: ComponentFixture<JobStepFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobStepFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStepFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
