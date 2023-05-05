import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { USER_TYPE, CUSTOM_HANDLE_ERROR } from 'src/app/constants/enums';
import { LOGIN, PROFILE_SETUP, HOME } from 'src/app/constants/routes';
import { OtpVerificationComponent } from 'src/app/modules/common/modules/otp-verification/otp-verification.component';
import { FormService } from 'src/app/services/form.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AccountService } from '../../account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseService } from 'src/app/modules/common/modules/firebase/firebase.service';
import { environment } from 'src/environments/environment';
import { CONDITION_LINKS } from 'src/app/constants/constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild(OtpVerificationComponent) otpComponent: OtpVerificationComponent;
  signupForm: FormGroup;
  sitekey = environment.v2RecaptchaKey;
  userType = USER_TYPE;
  showOtpScreen = false;
  showTermsErr = false;
  otpData: any = null;
  hidePassword = true;
  formSubmitted = false;
  attemptLeft;
  userEmail: any;
  isAgreed = new FormControl(false);
  signUpdata: any = null;
  errorType: number;
  errormsg: string = null;
  links = CONDITION_LINKS;
  constructor(
    public dialog: MatDialog,
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private accountService: AccountService,
    private _utilityService: UtilityService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getCountryLists();
    // this.signupForm.controls.accountType.setValue(this.userType.BUSINESS_CLIENT);
  }

  createForm() {
    this.signupForm = this._formBuilder.group({
      // accountType: this._formService.getControl("dropdown"),
      firstName: this._formService.getControl('name'),
      middleName: this._formService.getControl('middleName', false),
      lastName: this._formService.getControl('name'),
      email: this._formService.getControl('email'),
      password: this._formService.getControl('passwordRule'),
      countryCode: this._formService.getControl('dropdown'),
      phoneNo: this._formService.getControl('phone'),
      recaptcha: this._formService.getControl('dropdown'),
    });
  }

  // This will use for signup
  async signup() {
    this.formSubmitted = true;
    try {
      if (
        this.signupForm.disabled ||
        this.signupForm.invalid ||
        !this.isAgreed.value
      ) {
        this.showTermsErr = true;
        return;
      }
      this.signupForm.disable();
      console.log(this.signupForm.value);
      let payload = { ...this.signupForm.value };
      let { phoneNo } = payload;
      payload = { ...payload, phoneNo: phoneNo.replace(/^0+/, '') };
      const fcmtkn = this._utilityService.getFCMToken();
      if (fcmtkn) {
        this.firebaseService.fcmTokenUpdate(fcmtkn);
      } else {
        this.firebaseService.requestPermission();
      }
      const response = await this.accountService.signup(payload);
      this.otpData = {
        countryCode: this.signupForm.value.countryCode,
        phoneNo: payload.phoneNo,
      };
      this.signupForm.enable();
      this.signUpdata = response['data'];
      this._utilityService.showAlert(response.message);
      this.showOtpScreen = true;
    } catch (error) {
      if (error && error instanceof HttpErrorResponse) {
        if (
          error &&
          error.error.statusCode === CUSTOM_HANDLE_ERROR.DUBLICATE_USERS
        ) {
          this.errormsg = `Account exists! please login and continue`;
          this.errorType = this.getErrorType(error['error'].type);
          setTimeout(() => {
            this.router.navigate([LOGIN.fullUrl]);
          }, 1500);
        } else {
          this.signupForm.enable();
          this.errorType = this.getErrorType(error['error'].type);
          this.errormsg = error['error'].message;
        }
      }
    }
  }

  getCountryLists() {
    // this.accountService.countryDropDown().then(({ data }) => {
    //   console.log(data, "data");
    // })
  }

  // This will get verify Otp
  async verifyOtp(otp) {
    try {
      const data = await this.accountService.verifyOtp({
        accessToken: this.signUpdata.accessToken,
        type: 'SIGNUP',
        otp,
      });
      this.accountService.loginSuccess(data);
      setTimeout(() => {}, 200);
    } catch (error) {
      if (error.error.data.attemptCountLeft <= 0) {
        this.router.navigate([LOGIN.fullUrl]);
      }
      this.attemptLeft =
        error.error.data.attemptCountLeft <= 0
          ? 0
          : error.error.data.attemptCountLeft;
    }
  }

  // This will get resend otp
  onCustomResend(event) {
    console.log(event);
    this.accountService
      .reSendOpt(this.otpData)
      .then((resp) => {
        this.signUpdata.accessToken = resp['data']['accessToken'];
        this.otpComponent.afterCustomResend(true);
      })
      .catch((err) => {
        this.otpComponent.afterCustomResend(false);
      });
  }

  // This will get error message
  getErrorType(type: string) {
    switch (type) {
      case 'NO_INTERNET':
        return 0;
      case 'EMAIL_ALREADY_EXISTS':
        return 1;
      case 'PHONE_NO_ALREADY_EXISTS':
        return 2;
      case 'WORKER_EMAIL_EXIST':
        return 3;
      case 'CLIENT_EMAIL_EXIST':
        return 4;
      case 'WORKER_PHONE_NO_EXIST':
        return 5;
      case 'CLIENT_PHONE_NO_EXIST':
        return 6;
      case 'NOT_FOUND_USER':
      default:
        return 9;
    }
  }
}
