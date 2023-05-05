import { TestBed } from '@angular/core/testing';

import { SearchApplicantServiceService } from './search-applicant-service.service';

describe('SearchApplicantServiceService', () => {
  let service: SearchApplicantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchApplicantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
