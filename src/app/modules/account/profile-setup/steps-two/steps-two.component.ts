import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileSetupService } from '../profile-setup.service';

import { DROPDOWN_TYPE, PROFILE_STEPS } from 'src/app/constants/enums';
import { JOB_AREA, CITY_SEARCH } from 'src/app/constants/urls';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/app/models/common.interface';

@Component({
  selector: 'app-steps-two',
  templateUrl: './steps-two.component.html',
  styleUrls: ['./steps-two.component.scss'],
})
export class StepsTwoComponent implements OnInit {
  @Output() stepTwoData = new EventEmitter();
  secondStepForm: FormGroup;
  stateType = DROPDOWN_TYPE.STATE;
  cityType = DROPDOWN_TYPE.CITY;
  stateSearchUrl = JOB_AREA;
  citySearchUrl = CITY_SEARCH;

  constructor(
    private _setupService: ProfileSetupService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.secondStepForm = this._setupService.secondStepForm;
    if (this.userProfileService.profileData) {
      const profileDetail: UserProfile = this.userProfileService.profileData;
      delete profileDetail.location.type;

      if (profileDetail.profileSteps === PROFILE_STEPS.SECOND_STEP) {
        this.secondStepForm.patchValue({ ...profileDetail.location });

        this.secondStepForm
          .get('jobArea')
          .setValue({
            ...profileDetail.location,
            _id: profileDetail.location.stateId,
          });
      }
    }
  }

  // This will get control of jobarea
  get jobAreaCtrl() {
    return this.secondStepForm.get('jobArea') as FormControl;
  }

  // This  will submit secondStepForm data
  onSecondStepSubmit() {
    if (this.secondStepForm.invalid) {
      return;
    }
    // const {stateId, cityId , name} = this.secondStepForm.get('jobArea').value
    const payload = {
      ...this.secondStepForm.value,
      ...this.secondStepForm.value.jobArea,
    };

    console.log('&&&', payload);
    delete payload['jobArea'];
    delete payload['_id'];
    this.stepTwoData.emit({ location: payload, profileSteps: 2 });
  }
}
