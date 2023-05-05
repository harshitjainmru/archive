import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCandidateFilterComponent } from './search-candidate-filter.component';

describe('SearchCandidateFilterComponent', () => {
  let component: SearchCandidateFilterComponent;
  let fixture: ComponentFixture<SearchCandidateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCandidateFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCandidateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
