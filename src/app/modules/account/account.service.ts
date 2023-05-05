import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';
import { HOME } from '../../constants/routes';
import {
  ACCOUNT_API_GROUP,
  CONFIRM_PASSWORD,
  DELETE_ACCOUNT,
  NOTIFICATION_ENABLE_DESABLE,
} from 'src/app/constants/urls';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../common/modules/firebase/firebase.service';

@Injectable()
export class AccountService {
  isProfileSetup = new BehaviorSubject<boolean>(false);

  constructor(
    private _http: HttpService,
    private _utility: UtilityService,
    private _router: Router,
    private firebaseService: FirebaseService
  ) {}

  //This will use loginwithphone
  async loginWithphone(data: any) {
    const response = await this._http
      .post(
        ACCOUNT_API_GROUP.LOGIN,
        { ...data, ...this._utility.countryId },
        { skipErrorPopup: true }
      )
      .toPromise();

    this.loginSuccess(response);
    return response;
  }

  //This will use api for send verification link
  resendVerificationLink(email) {
    try {
      return this._http
        .patch(`${ACCOUNT_API_GROUP.RESEND_EMAIL}/${email}`, {})
        .toPromise();
    } catch (error) {
      return null;
    }
  }

  // This will use api for resendOtp
  reSendOpt(data) {
    return this._http
      .post(ACCOUNT_API_GROUP.RESEND_OTP_OUT, {
        ...data,
        ...this._utility.countryId,
      })
      .toPromise();
  }

  // This will use api for send Otp
  sendOtp(data) {
    return this._http
      .put(
        ACCOUNT_API_GROUP.SEND_OTP,
        { ...data, ...this._utility.countryId },
        { skipErrorPopup: true }
      )
      .toPromise();
  }

  // This will use api  for forgot With Email
  forgotWithEmail(data) {
    console.log(data);

    return this._http
      .put(
        ACCOUNT_API_GROUP.FORGOT_WITH_EMAIL,
        { ...data, ...this._utility.countryId },
        { skipErrorPopup: true }
      )
      .toPromise();
  }

  // This will use api for send otp when edit phone no
  editPhoneSendOtp(data) {
    return this._http
      .put(ACCOUNT_API_GROUP.EDIT_PHONE_RESEND_OTP, data)
      .toPromise();
  }

  // this will use api for verify edit phone no Otp
  async verifyEditPhoneOtp(data) {
    const response = await this._http
      .put(ACCOUNT_API_GROUP.VERIFY_EDIT_PHONE_OTP, data)
      .toPromise();
    return response;
  }

  // This will for loginSucces
  loginSuccess(response) {
    this._utility.setToken(response.data.authToken);
    const fcmtkn = this._utility.getFCMToken();
    if (fcmtkn) {
      this.firebaseService.fcmTokenUpdate(fcmtkn);
    } else {
      this.firebaseService.requestPermission();
    }
    this._router.navigate([HOME.fullUrl]);
  }

  // This will use api for get Available Email
  async isEmailAvailable(params) {
    return this._http.get<any>(ACCOUNT_API_GROUP.CHECK_COWERKER_EMAIL, params);
  }

  // This will use api for validate Email
  validateEmail(params) {
    return this._http.get<any>(ACCOUNT_API_GROUP.CHECK_COWERKER_EMAIL, params);
  }

  // This will use for sigup
  signup(data) {
    const payload = JSON.parse(JSON.stringify(data));
    delete payload['recaptcha'];
    const countryData = { ...this._utility.countryPayload };
    delete countryData.currency;
    return this._http
      .post(
        ACCOUNT_API_GROUP.SIGNUP,
        { ...payload, ...countryData },
        { skipErrorPopup: true }
      )
      .toPromise();
  }

  // This will use api for forgot Password With Email
  forgotPasswordWithEmail(data) {
    return this._http
      .put(
        ACCOUNT_API_GROUP.FORGOT_WITH_EMAIL,
        { ...data, ...this._utility.countryId },
        { skipErrorPopup: true, showLoader: true }
      )
      .toPromise();
  }

  // This will use for reset password
  resetPassword(data) {
    return this._http.put(ACCOUNT_API_GROUP.RESET_PASSWORD, data).toPromise();
  }

  // This will use change Password
  changePassword(data) {
    return this._http
      .put(ACCOUNT_API_GROUP.CHANGE_PASSWORD, data, { showLoader: true })
      .toPromise();
  }

  // This will use verify Otp api
  async verifyOtp(data) {
    const response = await this._http
      .post(ACCOUNT_API_GROUP.VERIFY_OTP, data, { showLoader: true })
      .toPromise();
    return response;
  }

  // This  will use update verify Otp
  async updateVerifyOtp(data) {
    const response = await this._http
      .post(ACCOUNT_API_GROUP.UPDATE_VERIFY_OTP, data, { showLoader: true })
      .toPromise();
    return response;
  }

  // This will use api for verify Reset OTP
  async verifyResetOtp(data) {
    const response = await this._http
      .post(ACCOUNT_API_GROUP.VERIFY_RESET_OTP, data, { showLoader: true })
      .toPromise();
    this._utility.showAlert(response.message);
    return response;
  }

  // This will use api for resend Otp From Profile
  resendOtpFromProfile(data) {
    return this._http
      .post(ACCOUNT_API_GROUP.RESEND_OTP, data, { showLoader: true })
      .toPromise();
  }

  // This will use confirm password api
  confirmPassword(body) {
    return this._http
      .put(CONFIRM_PASSWORD, body, { showLoader: true })
      .toPromise();
  }

  // This will NotificationTogglen api
  onNotificationToggle(body) {
    return this._http.put(NOTIFICATION_ENABLE_DESABLE, body, {
      showLoader: true,
    });
  }

  // This will use for delete account api
  deleteAccount(body) {
    return this._http
      .put(DELETE_ACCOUNT, body, { showLoader: true })
      .toPromise();
  }
}
