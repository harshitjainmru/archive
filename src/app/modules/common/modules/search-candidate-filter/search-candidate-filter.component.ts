import { Component, OnInit, Inject } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { JobListService } from 'src/app/modules/features/job/job-list/job-list.service';
import {
  APPLIED_ON_LIST,
  RATING_LIST,
  EXPERIENCE_LIST,
} from 'src/app/constants/constant';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-candidate-filter',
  templateUrl: './search-candidate-filter.component.html',
  styleUrls: ['./search-candidate-filter.component.scss'],
})
export class SearchCandidateFilterComponent implements OnInit {
  userFilterForm: FormGroup;
  appliedOnList = APPLIED_ON_LIST;
  ratingList = RATING_LIST;
  selectedRating = [];
  experienceList = EXPERIENCE_LIST;
  selectedExperience = [];
  skillList = [];
  jobId;
  activeData;

  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private utilityService: UtilityService,
    private _jobServiceService: JobListService,
    private route: ActivatedRoute
  ) {
    this.userFilterForm = this.getFilterForm();
    if (data) {
      this.activeData = data;
    }
    !this.activeData &&
      this.ratingList.forEach((element) => {
        return (element.isChecked = false);
      });
  }

  // On init life cycle hook
  ngOnInit(): void {
    this.fetchMetas();
  }

  // This will fetch job skill list
  async fetchMetas() {
    const [skills] = await Promise.all([
      this._jobServiceService.jobSkillListing(),
    ]);
    this.skillList = skills['data'];
    this.activeData && this.manageRefreshCase();
  }

  // This will manage when refresh
  manageRefreshCase() {
    this.userFilterForm.patchValue(this.activeData);
  }

  //
  onSkillSelection(event) {
    if (event.length) {
      this.skillCtrl.setValue(event);
    } else {
      this.skillCtrl.setValue(null);
    }
  }

  // Create userFilterForm form
  getFilterForm() {
    return this.fb.group({
      appliedOn: [],
      ratings: [],
      experience: [],
      skills: [],
      workExperience: [],
    });
  }

  // This wi;ll submit userFilterForm value
  applyFilter() {
    let payload = JSON.parse(JSON.stringify(this.userFilterForm.value));
    let temp = [];
    payload.skills &&
      payload.skills.forEach((element) => {
        temp.push(element._id);
      });
    payload.skills = (payload.skills && JSON.stringify(temp)) || null;
    payload.ratings = null;
    if (payload && payload.experience) {
      EXPERIENCE_LIST.forEach((element) => {
        if (payload.experience === element.value) {
          payload.workExperience = element.subValue;
        }
      });
    }
    this.dialogRef.close({ payload, orgArr: this.userFilterForm.value });
  }

  // This will use for close dialog
  closeDialog() {
    this.userFilterForm.reset();
    this.ratingCtrl.reset();
    this.activeData = null;
    this.dialogRef.close({ payload: null, orgArr: null });
  }

  // This will select rating
  onSelectRating(event: MatCheckboxChange, index: number) {
    const value = event.source.value;
    if (event.checked) {
      this.ratingList[index]['isChecked'] = true;
      this.selectedRating.push(value);
    } else {
      this.ratingList[index]['isChecked'] = false;
      this.selectedRating.splice(this.selectedRating.indexOf(value), 1);
    }
    this.ratingCtrl.setValue(this.selectedRating);
  }

  // This will set value in appliedOn
  radioChange(event) {
    this.userFilterForm.controls.appliedOn.setValue(event);
  }

  // This will set  in experience
  expRadioChange(event) {
    this.userFilterForm.controls.experience.setValue(event);
  }

  // This will get Control of ratings
  get ratingCtrl(): FormControl {
    return this.userFilterForm.get('ratings') as FormControl;
  }

  // This will get control of skills
  get skillCtrl(): FormControl {
    return this.userFilterForm.get('skills') as FormControl;
  }
}
