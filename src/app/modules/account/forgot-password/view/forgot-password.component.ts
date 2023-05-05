import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RESET_WITH_MOBILE } from 'src/app/constants/routes';
import { OtpVerificationComponent } from 'src/app/modules/common/modules/otp-verification/otp-verification.component';
import { FormService } from 'src/app/services/form.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild(OtpVerificationComponent) otpComponent: OtpVerificationComponent;
  @Output() loginWithEmail = new EventEmitter();
  phoneLoginForm: FormGroup;
  showOtpScreen = false;
  attemptLeft;
  showError = false;
  showLoader = false;
  otpData: any = null;
  isSuccess: boolean = false;
  phoneForm: FormGroup;
  emialForm: FormGroup;
  typeCtrl = new FormControl('1');
  errorType: number;
  errormsg: string = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService,
    private _accountService: AccountService,
    private _utility: UtilityService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.emialForm = this._formBuilder.group({
      email: this._formService.getControl('email'),
    });

    this.phoneForm = this._formBuilder.group({
      phoneNo: this._formService.getControl('phone'),
      countryCode: this._formService.getControl('dropdown'),
    });
  }

  onChange(ev: any) {
    // console.log(ev, "evvvv");
  }

  // This will submit emialForm group data
  async onEmailSubmit() {
    try {
      if (this.emialForm.disabled || this.emialForm.invalid) {
        return;
      }
      this.emialForm.disable();
      const res = await this._accountService.forgotWithEmail(
        this.emialForm.value
      );
      if (res['statusCode'] == 200) {
        this.isSuccess = true;
      }
      // this._utility.showAlert(res.message);
      this.emialForm.enable();
    } catch (error) {
      this.showError = true;
      this.showLoader = false;
      this.errorType = this.getErrorType(error['error'].type);
      this.errormsg = error['error'].message;
      setTimeout(() => {
        this.showError = false;
      }, 2000);
      this.emialForm.enable();
    }
  }

  // This will submit phoneForm data
  async onPhoneSubmit() {
    try {
      if (this.phoneForm.disabled || this.phoneForm.invalid) {
        return;
      }
      this.phoneForm.disable();
      const res = await this._accountService.sendOtp(this.phoneForm.value);
      this.otpData = res.data;
      this._utility.showAlert(res.message);
      this.phoneForm.enable();
      this.showOtpScreen = true;
    } catch (error) {
      this.showError = true;
      this.showLoader = false;
      this.errorType = this.getErrorType(error['error'].type);
      this.errormsg = error['error'].message;
      // setTimeout(() => {
      //   this.showError = false;
      // }, 2000);
      this.phoneForm.enable();
    }
  }

  // This will verify Otp
  async verifyOtp(otp) {
    try {
      const data = await this._accountService.verifyOtp({
        accessToken: this.otpData.accessToken,
        type: 'FORGOT',
        otp,
      });
      if (data['statusCode'] == 200) {
        this._router.navigate([
          RESET_WITH_MOBILE.fullUrl,
          data['data'].accessToken,
        ]);
      }
    } catch (error) {
      if (error.error.data.attemptCountLeft <= 0) {
        this.showOtpScreen = false;
      }
      this.attemptLeft =
        error.error.data.attemptCountLeft <= 0
          ? 0
          : error.error.data.attemptCountLeft;
    }
  }

  // This wiil resend otp
  onCustomResend(event) {
    console.log(event);
    this._accountService
      .reSendOpt(this.phoneForm.value)
      .then((resp) => {
        this.otpData.accessToken = resp['data']['accessToken'];
        this.otpComponent.afterCustomResend(true);
      })
      .catch((err) => {
        this.otpComponent.afterCustomResend(false);
      });
  }

  /**
   *
   * @param type
   * @returns type
   */
  getErrorType(type: string) {
    switch (type) {
      case 'NO_INTERNET':
        return 0;
      case 'PHONE_NO_NOT_REGISTERED':
        return 1;
      case 'ACCOUNT_BLOCKED':
        return 2;
      case 'EMAIL_NOT_REGISTERED':
        return 3;
      default:
        return 9;
    }
  }
}
