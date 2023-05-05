import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchApplicantListComponent } from './search-applicant-list.component';

describe('SearchApplicantListComponent', () => {
  let component: SearchApplicantListComponent;
  let fixture: ComponentFixture<SearchApplicantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchApplicantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchApplicantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
