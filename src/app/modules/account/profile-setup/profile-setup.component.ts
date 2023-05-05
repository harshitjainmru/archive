import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  PROFILE_STEPS,
  PROFILE_STEPS_NAME,
  SUCCESS_PARENT_TYPE,
} from 'src/app/constants/enums';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UtilityService } from 'src/app/services/utility.service';
import { SuccessPopupComponent } from '../../common/modules/success-popup/success-popup.component';
import { AccountService } from '../account.service';
import { ProfileSetupService } from './profile-setup.service';
import { SESSION_KEYS } from 'src/app/constants/constant';
import { UserProfile } from 'src/app/models/common.interface';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss'],
})
export class ProfileSetupComponent implements OnInit, OnDestroy {
  profileSteps = PROFILE_STEPS;
  stepsName = PROFILE_STEPS_NAME;
  userData: any = null;
  currentTabIndex: number = 1;
  companyData: any = null;
  profileDetails: UserProfile;

  constructor(
    private utilityService: UtilityService,
    private profileSetupService: ProfileSetupService,
    private accountService: AccountService,
    private userProfileService: UserProfileService,
    private dialog: MatDialog
  ) {
    this.accountService.isProfileSetup.next(true);
  }

  ngOnInit(): void {
    const activeTab = this.profileSetupService.manageProfileStep;
    this.currentTabIndex = Number(activeTab) || 1;
    this.profileDetails = this.userProfileService.profileData;
  }

  // This will open SuccessPopupComponent with success message
  onSucessDialog() {
    let dialogRef = this.dialog.open(SuccessPopupComponent, {
      width: '410px',
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: { parent: SUCCESS_PARENT_TYPE.REGISTRATION },
    });
  }

  // This will send step one data
  onStepOneData(data: any) {
    this.onProfileSetup(data);
  }

  // This will send step two data
  onStepTwoData(data: any) {
    this.onProfileSetup(data);
  }

  // This will send step three data
  onStepThreeData(data: any) {
    this.onProfileSetup(data);
  }

  // This will profile setup
  onProfileSetup(body: any) {
    this.profileSetupService
      .profileSetup(body)
      .then(({ data }) => {
        if (data['isProfileCompleted']) {
          this.userProfileService.getProfileDetail(true);
          // this.utilityService.userDetails = data;
          this.utilityService.clearSessionStorage(
            SESSION_KEYS.BUSINESS_CATEGORIES
          );
          this.onSucessDialog();
        } else {
          this.userProfileService.setProfileData(data);
          this.nextStep();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // This will current page to previous
  previousStep() {
    this.currentTabIndex = this.currentTabIndex - 1;
  }

  // This will current page to next page
  nextStep() {
    this.currentTabIndex = this.currentTabIndex + 1;
  }

  // This will logout account
  onLogout() {
    this.profileSetupService.firstStepForm.reset();
    this.profileSetupService.secondStepForm.reset();
    this.profileSetupService.thirdStepForm.reset();
    this.profileSetupService.companyCertFile = null;
    this.profileSetupService.companyDocFile = null;
    this.profileSetupService.companyPhotoUrl = null;
    this.profileSetupService.companyLogoUrl = null;

    this.userProfileService.logOutMe();
    console.log('chekckc', this.profileSetupService);
  }

  ngOnDestroy() {
    this.accountService.isProfileSetup.next(false);
  }
}
