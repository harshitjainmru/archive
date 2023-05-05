import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { ACCOUNT_API_GROUP, USER_API_GROUP } from '../constants/urls';
import { UtilityService } from './utility.service';
import { POPUP_MESSAGES } from '../constants/messages';
import { IPopupData } from '../models/popup';
import { HOME, WELCOME } from '../constants/routes';
import { environment } from 'src/environments/environment';
import { CUSTOM_HANDLE_ERROR } from '../constants/enums';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  breadCrumb$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  listenProfile = new BehaviorSubject<any>(null);
  profileData: any;
  countryInfo: any = {};
  constructor(
    private http: HttpService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.getCountryInfo();
  }

  // This will profile details of user
  async getProfileDetail(refresh = false) {
    const token = this.utilityService.getAuthToken();
    if (!token) {
      return null;
    }
    try {
      if (this.profileData && !refresh) {
        return this.profileData;
      }
      const response = await this.http
        .get(USER_API_GROUP.PROFILE_DETAIL)
        .toPromise();
      this.profileData = response.data;
      this.listenProfile.next({ ...this.profileData });
      return { ...this.profileData };
    } catch (error) {
      if (error.error.statusCode == 499) {
        this.navigateToWelcome();
      }

      return Promise.reject(error);
    }
  }

  // GET LOCALSTORGE COUNTRY INFO
  getCountryInfo() {
    try {
      this.countryInfo = localStorage.getItem(environment.countryKey);
      this.countryInfo = JSON.parse(this.countryInfo);
      if (this.countryInfo && this.countryInfo._id) {
        this.countryInfo.countryId = this.countryInfo._id;
      } else {
        throw { type: CUSTOM_HANDLE_ERROR.MISSING_LOCAL_COUNTRY };
      }
    } catch (error) {
      console.error(error);
      this.router.navigate([HOME.fullUrl]);
    }
  }

  // This will set breadCrumb
  setBreadCrumb(route, explicitSet, params) {
    const breadCrumbOptions = {
      route: route,
      explicitSet: explicitSet,
      options: params,
    };
    this.breadCrumb$.next(breadCrumbOptions);
  }

  // This will set profile data
  setProfileData(data: any) {
    this.profileData = data;
  }

  // This will use for logout me
  logOutMe() {
    let data: IPopupData = {
      title: POPUP_MESSAGES.confrim,
      message: POPUP_MESSAGES.logoutConfirmation,
      cancelButtonText: POPUP_MESSAGES.close,
      hideConfirmButton: true,
    };
    this.utilityService.openDialog(data).subscribe((resp) => {
      if (!!resp) {
        this.logOutAction();
      }
    });
  }

  // This will proform action when loutout and navigate welcome page
  async logOutAction() {
    try {
      await this.http
        .patch(ACCOUNT_API_GROUP.LOGOUT, {}, { showLoader: true })
        .toPromise();
      this.navigateToWelcome();
    } catch (error) {}
  }

  // This will navigate welcome page and clear local storage
  navigateToWelcome() {
    this.utilityService.clearStorage();
    this.profileData = null;
    this.listenProfile.next(null);
    this.router.navigate([WELCOME.fullUrl]);
    window.location.reload();
  }
}
