import { Injectable } from "@angular/core";
import {
  REQUEST_CREATE_GET,
  REQUEST_CREATE_POST,
} from "src/app/constants/urls";
import { HttpService } from "src/app/services/http.service";

@Injectable()
export class RequestService {
  constructor(private http: HttpService) {}

  createRequest(payload) {
    return this.http
      .post(REQUEST_CREATE_POST, payload, { showLoader: true })
      .toPromise();
  }
  requestList(payload) {
    return this.http
      .get(REQUEST_CREATE_GET, payload, { showLoader: true })
      .toPromise();
  }
}
