import { Injectable } from "@angular/core";
import { CANDIDATE_STATUS } from "src/app/constants/enums";
import {
  APPLICANT_CONTRACT_URL_POST,
  APPLICANT_DETAILS_GET,
  APPLICANT_LIST_GET,
  APPLICANT_SEND_CONTRACT_POST,
  APPLICANT_SEND_OFFER_POST,
  APPLICANT_STATUS_POST,
  CHECK_OFFER,
  GET_RATINGS_CANDIDATE,
  JOBS_API,
  RATE_CANDIDATE,
  REQUEST_CREATE_POST,
  SEARCH_APPLICANT_DETAIL,
  SEARCH_APPLICANT_LIST,
  SEARCH_APPLICANT_SEND_CONTRACT_POST,
  SEARCH_CANDIDATE_INVITE,
  UPDATE_CONTRACT_STATUS,
} from "src/app/constants/urls";
import { HttpService } from "src/app/services/http.service";

@Injectable({ providedIn: "root" })
export class ApplicantService {
  constructor(private httpService: HttpService) {}
  applicantList: Array<any> = [];
  getApplicantList(query) {
    return this.httpService.get(APPLICANT_LIST_GET, query, {
      showLoader: true,
    });
  }

  getApplicantListSearch(query) {
    return this.httpService.get(SEARCH_APPLICANT_LIST, query, {
      showLoader: true,
    });
  }

  getApplicantDetails(query) {
    let endPoint;
    if (query.applyId) {
      endPoint = APPLICANT_DETAILS_GET;
    } else {
      endPoint = SEARCH_APPLICANT_DETAIL;
    }
    return this.httpService.get(
      endPoint,
      { ...query },
      {
        showLoader: true,
      }
    );
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

  MakeOffer(payload) {

    return this.httpService
      .post(SEARCH_APPLICANT_SEND_CONTRACT_POST, payload, {
        showLoader: true,
      })
      .toPromise();
  }
  
  sendOffer(payload) {
    return this.httpService
      .post(APPLICANT_SEND_OFFER_POST, payload, {
        showLoader: true,
      })
      .toPromise();
  }

  
  /**
   * Checks if condidate already have offer for current job
   * @param {jobId,applicantId} 
   */
  checkOffer({jobId,userId}){
    return this.httpService.get(CHECK_OFFER,{jobId,userId})
  }


  sendInite(payload) {
    return this.httpService
      .post(SEARCH_CANDIDATE_INVITE, payload, {
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

  updateContractStatus(payload) {
    return this.httpService
      .put(UPDATE_CONTRACT_STATUS, payload, { showLoader: true })
      .toPromise();
  }

  rateCandidate(payload, edit: boolean = false) {
    if (edit) {
      return this.httpService
        .put(RATE_CANDIDATE, payload, { showLoader: true })
        .toPromise();
    }
    return this.httpService
      .post(RATE_CANDIDATE, payload, { showLoader: true })
      .toPromise();
  }

  reportCandidate(payload) {
    return this.httpService
      .post(REQUEST_CREATE_POST, payload, { showLoader: true })
      .toPromise();
  }

  getAllRatings(userId: string, query) {
    return this.httpService
      .get(GET_RATINGS_CANDIDATE(userId), query, { showLoader: true })
      .toPromise();
  }
}
