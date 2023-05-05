import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchApplicantCardComponent } from './search-applicant-card.component';

describe('SearchApplicantCardComponent', () => {
  let component: SearchApplicantCardComponent;
  let fixture: ComponentFixture<SearchApplicantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchApplicantCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchApplicantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
