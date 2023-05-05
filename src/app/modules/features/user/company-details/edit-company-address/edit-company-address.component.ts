import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { de } from "date-fns/locale";
import { CLIENT_PROFILE_STATUS, DROPDOWN_TYPE } from "src/app/constants/enums";
import { FormUtils } from "src/app/constants/form.util";
import { JOB_AREA } from "src/app/constants/urls";
import { ProfileSetupService } from "src/app/modules/account/profile-setup/profile-setup.service";
import { UserProfileService } from "src/app/services/user-profile.service";
import { CompanyDetailsSuccessPopupComponent } from "../../success-popup/success-popup.component";

@Component({
  selector: "app-edit-company-address",
  templateUrl: "./edit-company-address.component.html",
  styleUrls: ["./edit-company-address.component.scss"],
})
export class EditCompanyAddressComponent implements OnInit {
  secondStepForm: FormGroup;
  stateType = DROPDOWN_TYPE.STATE;
  stateSearchUrl = JOB_AREA;
  preSelected: any = null;
  profile: any;
  clientStatus = CLIENT_PROFILE_STATUS;

  constructor(
    private _setupService: ProfileSetupService,
    private userProfileService: UserProfileService,
    private dialogRef: MatDialogRef<EditCompanyAddressComponent>,
    private dialog: MatDialog
  ) {
    this.secondStepForm = this._setupService.secondStepForm;
    // this.secondStepForm.valueChanges.subscribe((data) => console.log(data));
    if (this.userProfileService.profileData) {
      const profileDetail = this.userProfileService.profileData;
      this.profile = profileDetail;

      delete profileDetail.location.type;
      this.preSelected = {
        cityId: profileDetail.location.cityId,
        countryId: profileDetail.location.countryId,
        name: profileDetail.location.name,
        stateId: profileDetail.location.stateId,
      };
      // if(profileDetail.profileSteps === PROFILE_STEPS.SECOND_STEP){
      this.secondStepForm.patchValue({ ...profileDetail.location });

      this.secondStepForm.get("jobArea").setValue({
        ...profileDetail.location,
        _id: profileDetail.location.stateId,
      });
      // }
    }
  }

  ngOnInit(): void {}

  get jobAreaCtrl() {
    return this.secondStepForm.get("jobArea") as FormControl;
  }

  async updateCompanyAddress() {
    const oldData = { ...this.secondStepForm.value.jobArea };
    delete oldData.postalCode;
    delete oldData.street;
    if (this.secondStepForm.valid) {
      const payload = {
        ...this.secondStepForm.value,
        ...oldData,
      };

      console.log(this.secondStepForm.value);
      console.log(this.secondStepForm.value.jobArea);

      // console.log('&&&',paylo)
      delete payload["jobArea"];
      delete payload["_id"];
      delete payload["coordinates"];
      const res = await this._setupService.updateCompanyDetailsRequest({
        location: FormUtils.parse(payload),
        steps: 2,
      });
      console.log(res.message);
      this.profile = res.data.data;

      this.dialogRef.close(this.profile);
      if (this.profile?.profileStatus !== this.clientStatus.VERIFIED) {
        this.dialog
          .open(CompanyDetailsSuccessPopupComponent, {
            width: "410px",
            autoFocus: false,
            disableClose: true,
            restoreFocus: false,
          })
          .afterClosed()
          .subscribe((data) => {
            console.log(data.data);
          });
      }
    }
  }

  close(refresh?) {
    this.dialogRef.close(refresh);
  }
}
