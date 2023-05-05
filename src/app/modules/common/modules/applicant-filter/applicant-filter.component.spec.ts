import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantFilterComponent } from './applicant-filter.component';

describe('ApplicantFilterComponent', () => {
  let component: ApplicantFilterComponent;
  let fixture: ComponentFixture<ApplicantFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
