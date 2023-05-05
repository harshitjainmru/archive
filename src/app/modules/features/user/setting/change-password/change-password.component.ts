import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { AccountService } from 'src/app/modules/account/account.service';
import { UtilityService } from 'src/app/services/utility.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss', '../setting.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errorType: number;
  currentHidePassword = true;
  newHidePassword = true;
  confirmHidePassword = true;
  errormsg: string = null;
  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService,
    private _utility: UtilityService,
    private _accountService: AccountService,
    private _profileService:UserProfileService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  createForm() {
    this.changePasswordForm = this._formBuilder.group({
      oldPassword: this._formService.getControl('password'),
      newPassword: this._formService.getControl('passwordRule'),
      confirmNewPassword: this._formService.getControl('passwordRule'),
    },
      {
        validator: this._formService.MustMatch('newPassword', 'confirmNewPassword')
      }
    );
  }

  submitPasswordForm(formDirective: FormGroupDirective) {
    if (!this.changePasswordForm.valid) {
      return;
    }
    const formValue = this.changePasswordForm.value;
    const { oldPassword, newPassword } = formValue;
    this._accountService.changePassword({ oldPassword, newPassword }).then(res => {
      this.resetForm(formDirective)
      this._utility.showAlert(res.message);
    }, err => {
      console.log('errr');
    });

  }

  onCancel(formDirective: FormGroupDirective){
    this.resetForm(formDirective)
  }

  resetForm(formDirective: FormGroupDirective){
    formDirective.resetForm();
    this.changePasswordForm.reset();
  }

}
