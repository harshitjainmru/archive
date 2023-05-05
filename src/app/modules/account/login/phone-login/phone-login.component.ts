import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AccountService } from '../../account.service';
import { LoginService } from '../service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_HANDLE_ERROR } from 'src/app/constants/enums';
@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss'],
})
export class PhoneLoginComponent implements OnInit {
  @Output() loginWithEmail = new EventEmitter();
  phoneLoginForm: FormGroup;
  rememberMeCtrl = new FormControl();
  showOtpScreen = false;
  hidePassword = true;
  attemptLeft;
  showError = false;
  showLoader = false;
  errorType: number;
  errormsg: string = null;

  signUpdata: any = null;
  otpData: any = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService,
    private _accountService: AccountService,
    private _utility: UtilityService,
    private _loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.rememberMeCtrl.setValue(this._utility.RememberMe);
    if (this.rememberMeCtrl.value) {
      this.phoneLoginForm.patchValue(this._utility.RememberMeData);
    }
  }

  createForm() {
    this.phoneLoginForm = this._formBuilder.group({
      phoneNo: this._formService.getControl('phone'),
      password: this._formService.getControl('password'),
      countryCode: this._formService.getControl('dropdown'),
    });
  }

  getUnReferenced(data) {
    return JSON.parse(JSON.stringify(data));
  }

  // This will send otp for account login
  async sendOtp() {
    try {
      if (this.phoneLoginForm.disabled || this.phoneLoginForm.invalid) {
        return;
      }
      this.phoneLoginForm.disable();
      let payload = { ...this.phoneLoginForm.value };
      let { phoneNo } = payload;
      payload = { ...payload, phoneNo: phoneNo.replace(/^0+/, '') };

      const res = await this._accountService.loginWithphone(payload);
      this._utility.setRememberMe(this.rememberMeCtrl.value);
      const data = this.getUnReferenced(this.phoneLoginForm.value);

      // delete data['password'];
      this._utility.setRememberMeData(data);
    } catch (error) {
      if (error && error instanceof HttpErrorResponse) {
        this.phoneLoginForm.enable();
        this.signUpdata = error.error.data;

        if (error.error.statusCode === CUSTOM_HANDLE_ERROR.PHONE_NOT_VERIFIED) {
          this.showOtpScreen = true;
          this.otpData = {
            countryCode: this.phoneLoginForm.value.countryCode,
            phoneNo: this.phoneLoginForm.value.phoneNo,
          };
        } else {
          this.errorType = this._loginService.getErrorType(error['error'].type);
          this.errormsg = error['error'].message;
        }
      }
    }
  }

  //This will verifyOtp
  async verifyOtp(otp) {
    try {
      const data = await this._accountService.verifyOtp({
        // ...this.phoneLoginForm.value,
        accessToken: this.signUpdata.authToken,
        otp,
        type: 'SIGNUP',
      });

      this._accountService.loginSuccess(data);

      // this._utility.userDetails = data;
    } catch (error) {
      console.log('hahahaahha', error);

      if (error.error.data.attemptCountLeft <= 0) {
        this.showOtpScreen = false;
      }
      this.attemptLeft =
        error.error.data.attemptCountLeft <= 0
          ? 0
          : error.error.data.attemptCountLeft;
    }
  }
}
