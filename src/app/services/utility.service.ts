import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPopupData, IPopupResponse } from '../models/popup';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ConfirmationModalComponent } from '../modules/common/components/confirmation-modal/confirmation-modal.component';
import { TranslateService } from './translate.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ICountry } from '../models/common.interface';
import * as moment from 'moment';
import { FormArray } from '@angular/forms';
import { CountrySelectionComponent } from '../modules/common/components/country-selection/country-selection.component';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isJobCopy: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  countryCode = new BehaviorSubject<string>('');
  sidepanel = new Subject<boolean>();

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  // This will set job copy
  setJobCopy(data: any = {}) {
    this.isJobCopy.next(data);
  }
  // This will get copy job show in the hiring component
  getJobCopy() {
    this.isJobCopy.subscribe((response) => {
      if (response) {
        console.log(response);
        return response;
      }
    });
  }

  // This will remove key from local storage
  clearStorage() {
    // localStorage.clear();
    localStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.FCM_KEY);
    // const currentLanguage = localStorage.getItem(environment.languageKey);
    // const rememberMe = localStorage.getItem("isRemember");
    // const country = localStorage.getItem(environment.countryKey);
    // localStorage.removeItem(environment.tokenKey);
    // localStorage.clear();
    // localStorage.setItem(environment.languageKey, currentLanguage);
    // if (country != "null") {
    //   localStorage.setItem(environment.countryKey, country);
    // }
    // this.setRememberMe(rememberMe);
  }

  // Get auth token from local storage
  getAuthToken() {
    return localStorage.getItem(environment.tokenKey);
  }

  // This will set token in local storage
  setToken(token) {
    localStorage.setItem(environment.tokenKey, token);
  }

  // This will get FCM key from local storage
  getFCMToken() {
    return localStorage.getItem(environment.FCM_KEY);
  }

  // This will set FCM key in local storage
  setFCMToken(token) {
    localStorage.setItem(environment.FCM_KEY, token);
  }

  // This will get current country from local storage
  get currentCountry(): ICountry {
    return JSON.parse(localStorage.getItem('country'));
  }

  // This will get country id from local storage
  get countryId() {
    return {
      countryId: (
        JSON.parse(localStorage.getItem(environment.countryKey)) as ICountry
      )?._id,
    };
  }

  // This will get countrykey in countryData from local storage
  get countryPayload() {
    const countryData = JSON.parse(
      localStorage.getItem(environment.countryKey)
    );
    return {
      countryName: countryData.name,
      countryId: countryData._id,
      currency: countryData.currency,
    };
  }

  // This will set flag in isRember key
  setRememberMe(flag: any) {
    localStorage.setItem('isRemember', flag);
  }

  // This will set country in local storage
  setCountryLocalStorage(country) {
    localStorage.setItem(environment.countryKey, JSON.stringify(country));
  }

  // This will get isRemember from localStorage
  get RememberMe() {
    if (localStorage.getItem('isRemember') == 'true') {
      return true;
    } else {
      return false;
    }
  }

  // This will set data in rembVal key in session storage
  setRememberMeData(data: any) {
    sessionStorage.setItem('rembVal', JSON.stringify(data));
  }

  // This will set Key and value in session storage
  setSessionStorage(key, value) {
    window.sessionStorage.setItem(key, value);
  }

  // This will get key from session storage
  getSessionStorage(key) {
    return JSON.parse(window.sessionStorage.getItem(key));
  }

  // Clear session storage
  clearSessionStorage(key) {
    window.sessionStorage.removeItem(key);
  }

  // This will get rembVal key value in sessionStorage
  get RememberMeData() {
    const data = JSON.parse(sessionStorage.getItem('rembVal'));
    if (data) {
      return data;
    } else {
      return {};
    }
  }

  // This will show alert message
  showAlert(message, duration = 1500) {
    this._snackBar.open(message, 'Close', {
      duration,
      panelClass: 'snackbar-toast',
    });
  }

  // This will show message
  showI18Msg(message) {
    this.showAlert(TranslateService.data[message]);
  }

  // This will Show Form Error
  showFormError(message = TranslateService.data['FORM_ERROR']) {
    this.showAlert(message);
  }

  // Trim srting data
  trim(data) {
    for (const item in data) {
      if (typeof data[item] === 'string') {
        data[item] = data[item].trim();
      }
    }
    return data;
  }

  // This will use for dialg alert
  dialogAlert(error, flag: boolean = false, title?) {
    let data: IPopupData = {
      message: error,
      cancelButtonText: 'Close',
      hideConfirmButton: flag,
      title,
    };
    this.openDialog(data).subscribe((success) => {});
  }

  // This will show error alert
  errorAlert(error, flag: boolean = false) {
    let data: IPopupData = {
      message:
        error && error.error && error.error.message
          ? error.error.message
          : TranslateService.data.SOMETHING_WENT_WRONG,
      cancelButtonText: 'Close',
      hideConfirmButton: flag,
    };
    this.openDialog(data).subscribe((success) => {});
  }

  // This will use for open Dialog
  openDialog(data: IPopupData): Observable<IPopupResponse> {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width: '500px',
      data,
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }

  // This will open dialog with CountrySelectionComponent
  openCountryDialog(): Observable<any> {
    const dialogRef = this._dialog.open(CountrySelectionComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((country) => {
      if (country) {
        this.countryCode.next(country.countryCode);
        this.setCountryLocalStorage(country);
      }
    });
    return dialogRef.afterClosed();
  }

  // This will save the state of an object in order
  serialize(obj) {
    const str =
      '?' +
      Object.keys(obj)
        .reduce(function (a, k) {
          a.push(k + '=' + encodeURIComponent(obj[k]));
          return a;
        }, [])
        .join('&');
    return str;
  }

  // This will find result
  findResult(results, name) {
    const result = results.find((obj) => name.includes(obj.types[0]));
    return result
      ? result.long_name || result.short_name
      : results.find((item) => item.types[0] === 'route').short_name;
  }

  // This will get current position
  getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getRequiredQueryParam() {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    tomorrow.setHours(23);
    tomorrow.setMinutes(59);
    tomorrow.setSeconds(59);
    const params = {
      fromDate: new Date().toISOString(),
      toDate: tomorrow.toISOString(),
    };
    return params;
  }

  // This will deflect lat and long
  deflectLatLong(list) {
    let lng_radius = 0.0000199999, // degrees of longitude separation
      lat_to_lng = 111.23 / 71.7, // lat to long proportion in Warsaw
      angle = 0.5, // starting angle, in radians
      loclen = list.length,
      step = (2 * Math.PI) / loclen,
      i,
      loc,
      lat_radius = lng_radius / lat_to_lng;
    for (i = 0; i < loclen; ++i) {
      // loc = loclist[i];
      list[i].lng = list[i].lng + Math.cos(angle) * lng_radius;
      list[i].lat = list[i].lat + Math.sin(angle) * lat_radius;
      angle += step;
    }
    return list;
  }

  // This will used for parse the value in standerd formate
  parseDateToTimeStamp(obj: any) {
    const newValueInstance = Object.assign({}, obj);
    (function isEmpty(data: any): boolean {
      if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            if (isEmpty(item)) {
              data.splice(index, 1);
            }
          });
        } else {
          Object.keys(data).forEach((key, index) => {
            // console.log(data[key] instanceof Date);
            if (data[key] instanceof Date) {
              data[key] = new Date(data[key]).toISOString();
            }
          });
        }
      }
      return data;
    })(newValueInstance);

    return newValueInstance;
  }

  /**
   * Formats data
   * @param data form value data
   * @returns  formatted data for dates
   */
  formatData(data) {
    // tslint:disable-next-line:forin
    for (const item in data) {
      if (data[item] instanceof Date) {
        data[item] = data[item].toISOString();
      }
      if (data[item] instanceof moment) {
        data[item] = moment(data[item]).startOf('day').toISOString();
      }
      if (Array.isArray(data[item])) {
        data[item] = data[item].join();
      }
    }
    return data;
  }

  /**
   * Formats data
   * @param data form value data
   * @returns  formatted data for dates
   */
  formatMomentData(data) {
    // tslint:disable-next-line:forin
    for (const item in data) {
      if (data[item] instanceof Date) {
        if (item === 'fromDate') {
          data[item] = moment(data[item]).startOf('day').toISOString();
        } else if (item === 'toDate') {
          data[item] = moment(data[item]).endOf('day').toISOString();
        } else {
          data[item] = moment(data[item]).toISOString();
        }
      }
      if (data[item] instanceof moment) {
        if (item === 'fromDate') {
          data[item] = moment(data[item]).startOf('day').toISOString();
        } else if (item === 'toDate') {
          data[item] = moment(data[item]).endOf('day').toISOString();
        } else {
          data[item] = moment(data[item]).toISOString();
        }
      }
      if (Array.isArray(data[item])) {
        data[item] = data[item].join();
      }
    }
    return data;
  }

  // This will get start and end of week
  getStartAndEndOfWeek() {
    const fromDate = moment().startOf('week').toDate();
    const toDate = moment().endOf('week').toDate();
    return {
      fromDate,
      toDate,
    };
  }

  //  This will get ISO Start And EndOfWeek
  getISOStartAndEndOfWeek() {
    const fromDate = moment().startOf('isoWeek').toDate();
    const toDate = moment().endOf('isoWeek').toDate();
    return {
      fromDate,
      toDate,
    };
  }

  // This will get start day
  getStartAndToday() {
    const fromDate = moment().startOf('week').toDate();
    const toDate = moment().endOf('day').toDate();
    return {
      fromDate,
      toDate,
    };
  }

  // This will get last count days
  getLastCountDays(days) {
    const fromDate = moment().subtract(days, 'day').toDate();
    const toDate = moment().toDate();
    return {
      fromDate,
      toDate,
    };
  }

  // This will remove form array value
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  // This will find dates with start and end date
  getDates(startDate, stopDate) {
    let dateArray = [];
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).startOf('day'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  // This will get total hours
  getTotalHours({ startTime, endTime }) {
    const duration = moment.duration(moment(endTime).diff(moment(startTime)));
    const hours = duration.asHours();
    return hours;
  }
}
