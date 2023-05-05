import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobActionPopupComponent } from './job-action-popup.component';

describe('JobActionPopupComponent', () => {
  let component: JobActionPopupComponent;
  let fixture: ComponentFixture<JobActionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobActionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobActionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
