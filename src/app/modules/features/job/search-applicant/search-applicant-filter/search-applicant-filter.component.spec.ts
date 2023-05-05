import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchApplicantFilterComponent } from './search-applicant-filter.component';

describe('SearchApplicantFilterComponent', () => {
  let component: SearchApplicantFilterComponent;
  let fixture: ComponentFixture<SearchApplicantFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchApplicantFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchApplicantFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
