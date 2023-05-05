import { Injectable } from '@angular/core';
import { CANDIDATE_STATUS } from 'src/app/constants/enums';
import {
  APPLICANT_CONTRACT_URL_POST,
  APPLICANT_DETAILS_GET,
  APPLICANT_LIST_GET,
  APPLICANT_SEND_CONTRACT_POST,
  APPLICANT_SEND_OFFER_POST,
  APPLICANT_STATUS_POST,
  JOBS_API,
  SEARCH_APPLICANT_DETAIL,
  SEARCH_APPLICANT_LIST,
} from 'src/app/constants/urls';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class SearchApplicantService {
  constructor(private httpService: HttpService) {}
  applicantList: Array<any> = [];
  getApplicantList(query) {
    return this.httpService.get(SEARCH_APPLICANT_LIST, query, {
      showLoader: true,
    });
  }

  getApplicantDetails(query) {
    return this.httpService.get(
      SEARCH_APPLICANT_DETAIL,
      { ...query },
      {
        showLoader: true,
      }
    );
  }

  sendInite(payload) {
    return this.httpService
      .post(APPLICANT_SEND_OFFER_POST, payload, {
        showLoader: true,
      })
      .toPromise();
  }

  changeStatus(
    applyIds: Array<string>,
    status: CANDIDATE_STATUS,
    previousState: CANDIDATE_STATUS,
    jobId: string
  ) {
    return this.httpService
      .post(
        APPLICANT_STATUS_POST,
        { applyId: [...applyIds], status, previousState, jobId },
        { showLoader: true }
      )
      .toPromise();
  }

  getJobDetails(jobId) {
    return this.httpService
      .get(`${JOBS_API}/${jobId}`, {}, { showLoader: true })
      .toPromise();
  }

  sendContract(payload) {
    return this.httpService
      .post(APPLICANT_SEND_CONTRACT_POST, payload, {
        showLoader: true,
      })
      .toPromise();
  }

  createContractSignUrl(payload) {
    return this.httpService
      .post(APPLICANT_CONTRACT_URL_POST, payload, {
        showLoader: true,
      })
      .toPromise();
  }
}
