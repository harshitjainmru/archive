import { EventEmitter, Injectable, Output } from "@angular/core";
import { JOBS } from "src/app/constants/routes";
import {
  CANDIDATE_LISTING,
  DROPDOWN_API,
  JOB_ROLES,
  JOB_SKILL,
  ACCOUNT_API_GROUP,
  SEARCH_CANDIDATE_LISTING,
  JOB_AREA,
  JOBS_API,
  CANCEL_PAUSE_JOB,
  TOTAL_JOBS_GET,
} from "src/app/constants/urls";
import { HttpService } from "src/app/services/http.service";
import { UserProfileService } from "src/app/services/user-profile.service";

@Injectable()
export class JobListService {
  @Output() applicantChageEvent = new EventEmitter();
  @Output() filterQuery: EventEmitter<any> = new EventEmitter();
  @Output() applicantActionEvent = new EventEmitter();
  @Output() selectCandidateEvent = new EventEmitter();

  constructor(
    private httpService: HttpService,
    private userProfileService: UserProfileService
  ) {}

  jobListing(query) {
    return this.httpService.get(JOBS_API, query, { showLoader: true });
  }

  jobDetailRequest(jobId) {
    return this.httpService
      .get(`${JOBS_API}/${jobId}`, {}, { showLoader: true })
      .toPromise();
  }

  deleteJobRequest(body) {
    return this.httpService.delete(`${JOBS_API}/${body.id}`).toPromise();
    // return this.httpService.delete(JOBS_API, body).toPromise();
  }

  updateCancelPauseJob(body) {
    return this.httpService.put(CANCEL_PAUSE_JOB, body).toPromise();
  }

  jobRoleListing() {
    return this.httpService.get<any>(JOB_ROLES,{isClient : true}).toPromise();
  }

  jobSkillListing() {
    return this.httpService.get<any>(JOB_SKILL).toPromise();
  }

  countryDropDwon(query: any = {}) {
    return this.httpService
      .get(DROPDOWN_API.DROPDWON_COUNTRY, query)
      .toPromise();
  }

  stateDropDwon(query: any = {}, refresh: boolean = false) {
    return this.httpService.get(DROPDOWN_API.DROPDWON_STATE, query).toPromise();
  }

  cityDropDwon(query: any = {}, refresh: boolean = false) {
    return this.httpService.get(DROPDOWN_API.DROPDWON_CITY, query).toPromise();
  }

  stateCityDropDwon(query: any = {}, refresh: boolean = false) {
    return this.httpService.get(JOB_AREA, query).toPromise();
  }

  zipDropDwon(query: any = {}, refresh: boolean = false) {
    return this.httpService
      .get(DROPDOWN_API.DROPDWON_ZIPCODE, query)
      .toPromise();
  }

  fetchDropdownMeta(query: any = {}, refresh: boolean = false) {
    return this.httpService.get(DROPDOWN_API.DROPDWON_META, query).toPromise();
  }

  getShiftRequest() {
    return this.httpService.get(DROPDOWN_API.DROPDWON_SHIFT).toPromise();
  }

  getCandidateListing(query = {}) {
    return this.httpService
      .get(CANDIDATE_LISTING, query, { showLoader: true })
      .toPromise();
  }

  getSearchCandidateListing(query = {}) {
    return this.httpService
      .get(SEARCH_CANDIDATE_LISTING, query, { showLoader: true })
      .toPromise();
  }

  copyJob(id) {
    return this.httpService
      .post(JOBS, { jobId: id }, { showLoader: true })
      .toPromise();
  }

  applicantActionRequest(body) {
    return this.httpService
      .put(`${ACCOUNT_API_GROUP.HIRING}/actions`, body, { showLoader: true })
      .toPromise();
  }

  getApplicantDetail(query = {}) {
    return this.httpService
      .get(`${ACCOUNT_API_GROUP.HIRING}/candidate/detail`, query, {
        showLoader: true,
      })
      .toPromise();
  }

  getJobCounts() {
    return this.httpService
      .get(
        `${TOTAL_JOBS_GET}`,
        {},
        {
          showLoader: true,
        }
      )
      .toPromise();
  }
}
