import { Component, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { AccountService } from "src/app/modules/account/account.service";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { OtpVerificationComponent } from "src/app/modules/common/modules/otp-verification/otp-verification.component";
import { FormService } from "src/app/services/form.service";
import { UtilityService } from "src/app/services/utility.service";
import { SuccessPopupComponent } from "src/app/modules/common/modules/success-popup/success-popup.component";
import { SUCCESS_PARENT_TYPE } from "src/app/constants/enums";
import { FormUtils } from "src/app/constants/form.util";
import { EditUserProfileSuccessComponent } from "./edit-user-profile-success/edit-user-profile-success.component";

@Component({
  selector: "app-edit-user-profile",
  templateUrl: "./edit-user-profile.component.html",
  styleUrls: ["./edit-user-profile.component.scss"],
})
export class EditUserProfileComponent implements OnInit, OnDestroy {
  @ViewChild(OtpVerificationComponent) otpComponent: OtpVerificationComponent;
  userForm: FormGroup;
  showOtpScreen = false;
  otpData: any = null;
  attemptLeft;
  errormsg: string = null;
  errorType: number;
  showLoader = false;
  message: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public detail: any,
    private _fb: FormBuilder,
    private _profileSetupService: ProfileSetupService,
    private _formService: FormService,
    private _accountService: AccountService,
    private _utility: UtilityService,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    console.log(this.detail);

    this.userForm.patchValue(this.detail);
  }
  ngOnDestroy() {
    this.userForm.reset();
  }

  get firstStepStatus() {
    return this.userForm.valid;
  }

  initForm() {
    this.userForm = this._fb.group({
      firstName: this._formService.getControl("name"),
      middleName: this._formService.getControl("middleName", false),
      lastName: this._formService.getControl("name"),
      email: this._formService.getControl("email"),
      phoneNo: this._formService.getControl("phone"),
      countryCode: [""],
    });
  }

  onSucessDialog(message) {
    let dialogRef = this.dialog.open(EditUserProfileSuccessComponent, {
      width: "410px",
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: message,
    });
  }

  updateProfileCriteria(reqData) {
    this._profileSetupService.updateProfileRequest(reqData).then((res) => {
      this.message = res["message"];
      if (
        res["type"] === "EMAIL_PHONE_UPDATED" ||
        res["type"] === "PHONE_UPDATED"
      ) {
        this.otpData = res["data"];
        this.showOtpScreen = true;
      }
      //one more type
      else if (res["type"] == "PROFILE_UPDATED") {
        this.dialogRef.close(res);
        this.onSucessDialog("");
      } else {
        // this._utility.showAlert(res.message);
        this.dialogRef.close(res);
        this.onSucessDialog(this.message);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getUnReferenced(data) {
    return JSON.parse(JSON.stringify(data));
  }

  onSubmitForm() {
    if (this.userForm.invalid) {
      return;
    }
    const data = this.getUnReferenced(this.userForm.value);
    this.updateProfileCriteria(FormUtils.parse(data));
  }

  async verifyOtp(otp) {
    try {
      const data = await this._accountService.updateVerifyOtp({
        accessToken: this.otpData.accessToken,
        otp,
        ...this.userForm.value,
      });
      if (data["statusCode"] == 200) {
        this.dialogRef.close(data);
        this.onSucessDialog(this.message);
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

  onCustomResend(event) {
    console.log(event);
    const payload = {
      newCountryCode: this.userForm.value.phoneNo,
      newPhoneNo: this.userForm.value.phoneNo,
    };
    this._accountService
      .resendOtpFromProfile(payload)
      .then((resp) => {
        this.otpComponent.afterCustomResend(true);
      })
      .catch((err) => {
        this.otpComponent.afterCustomResend(false);
      });
  }
}
