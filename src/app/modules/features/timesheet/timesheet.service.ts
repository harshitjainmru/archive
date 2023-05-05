import { Injectable } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import {
  GET_PUT_TIMESHEET,
  UPDATE_CLOCK_TIME,
  ATTENDANCE_STATUS_COUNT,
  APPLICANT_DETAILS_GET,
  DOWNLOAD_TIMESHEET_GET,
} from "src/app/constants/urls";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class TimesheetService {
  timesheetAttendanceSubject$ = new Subject();
  readonly timesheetAttendance$ =
    this.timesheetAttendanceSubject$.asObservable();

  constructor(private httpService: HttpService, private http: HttpClient) {}

  timeSheetListing(query) {
    return this.httpService.get(GET_PUT_TIMESHEET, query, { showLoader: true });
  }

  bulkSelectionTimesheet(body) {
    return this.httpService.put(GET_PUT_TIMESHEET, body, { showLoader: false });
  }

  updateClockTime(body) {
    return this.httpService.put(UPDATE_CLOCK_TIME, body, { showLoader: false });
  }

  updateAttendanceStatus(query) {
    this.httpService
      .get(ATTENDANCE_STATUS_COUNT, query, { showLoader: false })
      .subscribe((data) => {
        if (data.data) {
          this.timesheetAttendanceSubject$.next(data.data);
        }
      });
  }

  applicationDetails(body) {
    return this.httpService.get(APPLICANT_DETAILS_GET, { ...body }).toPromise();
  }

  downloadTimesheet(query) {
    return this.http
      .get(environment.url + DOWNLOAD_TIMESHEET_GET, {
        responseType: "text",
        params: { ...query },
      })
      .toPromise();
  }
}
