import { Injectable } from "@angular/core";
import { CMS_GET } from "src/app/constants/urls";
import { HttpService } from "src/app/services/http.service";

@Injectable()
export class SettingsService {
  constructor(private http: HttpService) {}
  getCmsData(type) {
    return this.http.get(CMS_GET(type), {}, { showLoader: true }).toPromise();
  }
}
