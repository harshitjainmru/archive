import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { SUCCESS_PARENT_TYPE, USER_TYPE } from 'src/app/constants/enums';
import { LOGIN } from 'src/app/constants/routes';
import { SuccessPopupComponent } from 'src/app/modules/common/modules/success-popup/success-popup.component';
import { FormService } from 'src/app/services/form.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string;
  accountType: number;
  mobileToken: string;
  hidePassword = true;
  hideConfirmPassword = true;
  USER_TYPE = USER_TYPE;

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _utilityService: UtilityService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.token = this._route.snapshot.params.token;
    this.accountType = this._route.snapshot.params.accountType;
    console.log(this._route.snapshot.params);
    this.mobileToken = this._route.snapshot.params.mobiletoken;
    this.createForm();
  }

  // This will create form group
  createForm() {
    this.resetForm = this._formBuilder.group(
      {
        password: this._formService.getControl('passwordRule'),
        confirmPassword: this._formService.getControl('passwordRule'),
      },
      {
        validator: this._formService.matchPassword,
      }
    );
  }

  // This will reset password
  async resetPassword() {
    try {
      if (this.resetForm.disabled || this.resetForm.invalid) {
        return;
      }

      const data = { password: this.resetForm.value.password };

      if (this.mobileToken) {
        data['accessToken'] = this.mobileToken;
      } else {
        data['metaToken'] = this.token;
      }

      this.resetForm.disable();
      const response = await this._accountService.resetPassword(data);
      // this._utilityService.showAlert(response.message);
      // this._router.navigate([LOGIN.fullUrl]);
      this.onSucessDialog();
    } catch (error) {
      if (error.error && error.error.statusCode == 400) {
        this._router.navigate([LOGIN.fullUrl]);
      }
      this.resetForm.enable();
    }
  }

  // This will show success message for reset password
  onSucessDialog() {
    let dialogRef = this._dialog.open(SuccessPopupComponent, {
      width: '410px',
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: {
        parent: SUCCESS_PARENT_TYPE.RESET_PASSWORD,
        accountType: this.accountType,
      },
    });
  }
}
