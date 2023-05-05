import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRequestRecievedPopupComponent } from './job-request-recieved-popup.component';

describe('JobRequestRecievedPopupComponent', () => {
  let component: JobRequestRecievedPopupComponent;
  let fixture: ComponentFixture<JobRequestRecievedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRequestRecievedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRequestRecievedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
