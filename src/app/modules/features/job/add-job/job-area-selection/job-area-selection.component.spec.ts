import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAreaSelectionComponent } from './job-area-selection.component';

describe('JobAreaSelectionComponent', () => {
  let component: JobAreaSelectionComponent;
  let fixture: ComponentFixture<JobAreaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAreaSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAreaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
