import { Injectable } from "@angular/core";
import { DASHBOARD_GET, DASHBOARD_SHIFT_GET } from "src/app/constants/urls";
import { HttpService } from "src/app/services/http.service";

@Injectable()
export class HomeService {
  constructor(private httpService: HttpService) {}

  getDashboardStats(query) {
    return this.httpService.get(DASHBOARD_GET, query).toPromise();
  }

  getScheduleData(query) {
    return this.httpService.get(DASHBOARD_SHIFT_GET, query).toPromise();
  }
}
