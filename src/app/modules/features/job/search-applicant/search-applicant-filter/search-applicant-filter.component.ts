import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SESSION_KEYS } from 'src/app/constants/constant';
import { DIALOG_RESPONSE, DROPDOWN_TYPE } from 'src/app/constants/enums';
import { FormUtils } from 'src/app/constants/form.util';
import { GET_JOB_SITES, JOB_SKILL } from 'src/app/constants/urls';
import { ISearchAutocomplete } from 'src/app/models/common.interface';
import { FormService } from 'src/app/services/form.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-search-applicant-filter',
  templateUrl: './search-applicant-filter.component.html',
  styleUrls: ['./search-applicant-filter.component.scss'],
})
export class SearchApplicantFilterComponent implements OnInit, OnDestroy {
  skillData: Array<any> = [];

  appliedOn = { day: 1, week: 2, month: 3 };
  rating = { one: 1, two: 2, three: 3 };
  experience = { two: 2, four: 4, six: 6, aboveSix: 7 };

  jobSiteSearchConfig: ISearchAutocomplete;
  stateSearchUrl = JOB_SKILL;
  stateType = DROPDOWN_TYPE.STATE;
  jobId: string;

  skillsSearchConfig: ISearchAutocomplete
  applicantFilterForm: FormGroup;
  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilityService: UtilityService,
    private userProfileService: UserProfileService,
    private route: ActivatedRoute
  ) {
    console.log(data);
    route.queryParams.subscribe(params => {
      this.jobId = params['jobId']
    })
    this.applicantFilterForm = this.createFilterForm();
    this.createjobSiteSearchConfig();
    this.createskillSearchConfig();
  }


  get f() {
    return this.applicantFilterForm.controls;
  }

  ngOnInit(): void {
    if (this.data) {
      const filterData = {
        skills: this.data?.skills,
        appliedOn: this.data.appliedOn ? +this.data.appliedOn : '',
        isPreviouslyHired: this.data.isPreviouslyHired ? !!this.data.isPreviouslyHired : '',
        experience: this.data.experience ? +this.data.experience : '',
        jobRole: this.data.jobRole ? !!this.data.jobRole : '',
        rating: this.data.rating ? +this.data.rating : '',
      };

      this.applicantFilterForm.patchValue({ ...filterData });
    }
    this.skillsSearchConfig = { ...this.skillsSearchConfig, ...this.getDataFromSessionStg(SESSION_KEYS.APPLICANT_FILTER_SKILLS, this.skillsSearchConfig) };
    this.jobSiteSearchConfig = { ...this.jobSiteSearchConfig, ...this.getDataFromSessionStg(SESSION_KEYS.JOB_SITE, this.jobSiteSearchConfig) };

  }

  createjobSiteSearchConfig() {
    this.jobSiteSearchConfig = {
      url: GET_JOB_SITES,
      isPagination: true,
      selectedControl: this.applicantFilterForm.get('jobSite') as FormControl,
      control: new FormControl(''),
      viewKey: 'name',
      valueKey: '_id',
      selectedValue: [],
      selectedViewValue: [],
      placeholder: 'Search job sites to select...',
      queryParams: { jobId: this.jobId }
    }
  }

  createskillSearchConfig() {
    this.skillsSearchConfig = {
      url: JOB_SKILL,
      isPagination: true,
      selectedControl: this.applicantFilterForm.get('skills') as FormControl,
      control: new FormControl(''),
      viewKey: 'name',
      valueKey: '_id',
      selectedValue: [],
      selectedViewValue: [],
      placeholder: 'Search skills to select...',
      queryParams: { jobId: this.jobId }
    }
  }

  createFilterForm() {
    return this.fb.group({
      skills: [''],
      appliedOn: [''],
      isPreviouslyHired: [''],
      rating: [''],
      experience: [''],
      jobSite: [''],
      jobRole: ['']
    });

  }

  closeDialog() {
    try {
      this.dialogRef.close({
        type: DIALOG_RESPONSE.CANCEL,
      });
    } catch (error) { }
  }

  applyFilter() {
    try {
      const data = this.utilityService.formatData(
        this.applicantFilterForm.value
      );
      console.log(data);
      this.utilityService.setSessionStorage(
        SESSION_KEYS.APPLICANT_FILTER_SKILLS,
        JSON.stringify({
          selectedValue: this.skillsSearchConfig.selectedValue,
          selectedViewValue: this.skillsSearchConfig.selectedViewValue,
        })
      );

      this.setKeyInSessionStg(SESSION_KEYS.JOB_SITE, this.jobSiteSearchConfig);

      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.APPLY,
      });
    } catch (error) { }
  }

  setKeyInSessionStg(key, config) {
    this.utilityService.setSessionStorage(
      key,
      JSON.stringify({
        selectedValue: config.selectedValue,
        selectedViewValue: config.selectedViewValue,
      })
    );
  }

  getDataFromSessionStg(key, config) {
    const value = this.utilityService.getSessionStorage(
      key
    )?.selectedValue;
    const view = this.utilityService.getSessionStorage(
      key
    )?.selectedViewValue;
    console.log(this.utilityService.getSessionStorage(
      key
    ))
    config['selectedValue'] = value?.length ? value : [];
    config['selectedViewValue'] = view?.length ? view : [];

    return config;
  }

  resetSessionStg() {
    this.utilityService.clearSessionStorage(
      SESSION_KEYS.APPLICANT_FILTER_SKILLS
    );
    this.utilityService.clearSessionStorage(
      SESSION_KEYS.JOB_SITE
    );
  }

  reset() {
    try {
      this.applicantFilterForm.reset();
      this.resetSessionStg();
      const data = this.utilityService.formatData(
        this.applicantFilterForm.value
      );
      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.DISMISS,
      });
    } catch (error) { }
  }

  ngOnDestroy(): void {
  }

  checkState(event, el) {
    event.preventDefault();
    el.checked = !el.checked;
    if (el.checked)
      this.applicantFilterForm.get('jobRole').setValue(el.checked);
    else
      this.applicantFilterForm.get('jobRole').reset();
  }

  checkPreviouslyHiredState(event, el) {
    event.preventDefault();
    el.checked = !el.checked;
    if (el.checked)
      this.applicantFilterForm.get('isPreviouslyHired').setValue(el.checked);
    else
      this.applicantFilterForm.get('isPreviouslyHired').reset();
  }
}
