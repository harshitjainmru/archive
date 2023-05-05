import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  JOBS_EXPERIENCE_TYPE,
  SALARY_RANGE_FILTERS,
  SESSION_KEYS,
} from 'src/app/constants/constant';
import { JobListService } from 'src/app/modules/features/job/job-list/job-list.service';
// import { JobServiceService } from 'src/app/modules/features/job-management/service/job-service.service';
import { FormService } from 'src/app/services/form.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { JobService } from 'src/app/modules/features/job/add-job/service/job.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import {
  UserProfile,
  ISearchAutocomplete,
  IRange,
} from 'src/app/models/common.interface';
import { JOB_AREA } from 'src/app/constants/urls';
import { FormUtils } from 'src/app/constants/form.util';
import { DIALOG_RESPONSE, DROPDOWN_TYPE } from 'src/app/constants/enums';

@Component({
  selector: 'app-job-management-filter',
  templateUrl: './job-management-filter.component.html',
  styleUrls: ['./job-management-filter.component.scss'],
})
export class JobManagementFilterComponent implements OnInit {
  userFilterForm: FormGroup;
  countryId;

  minRange: number = 100;
  maxRange: number = 700;
  options: Options = {
    floor: 10,
    ceil: 2000,
    translate: (value: number, label: LabelType): string => {
      return '$' + value;
    },
  };

  experienceData = JOBS_EXPERIENCE_TYPE;
  userDetails: UserProfile;
  jobAreaSearchConfig: ISearchAutocomplete = {
    url: JOB_AREA,
    isPagination: true,
    // control:this.userFilterForm.get('jobArea') as FormControl,
    viewKey: 'name',
    valueKey: '_id',
    selectedValue: [],
    selectedViewValue: [],
    placeholder: 'Search & select job area',
  };
  jobRoleConfig = {};
  rangeConfig: IRange;
  stateSearchUrl = JOB_AREA;
  stateType = DROPDOWN_TYPE.STATE;
  showRange = false;

  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilityService: UtilityService,
    private _jobServiceService: JobListService,
    public jobService: JobService,
    private userProfileService: UserProfileService
  ) {
    this.userFilterForm = this.getFilterForm();
  }

  // On init life cycle hook
  ngOnInit(): void {
    if (this.data) {
      const filterData = {
        jobRole:
          this.data && this.data?.jobRole ? this.data?.jobRole.split(',') : [],
        jobArea: this.data?.jobArea,
        minSalary: this.data?.minSalary ? this.data?.minSalary : '',
        maxSalary: this.data?.maxSalary ? this.data?.maxSalary : '',
      };
      this.userFilterForm.patchValue({ ...filterData });
    }

    let jobAreaSelectedValue, jobAreaSelctedView;
    if (this.data && this.data.jobArea) {
      jobAreaSelectedValue = this.utilityService.getSessionStorage(
        SESSION_KEYS.JOB_FILTER_JOB_AREA
      )?.selectedValue;
      jobAreaSelctedView = this.utilityService.getSessionStorage(
        SESSION_KEYS.JOB_FILTER_JOB_AREA
      )?.selectedViewValue;
    }

    this.userDetails = this.userProfileService.profileData;
    this.jobAreaSearchConfig = {
      ...this.jobAreaSearchConfig,
      selectedControl: this.userFilterForm.get('jobArea') as FormControl,
      searchQuery: { countryId: this.userDetails.countryId },
      control: new FormControl(''),
      selectedValue:
        jobAreaSelectedValue && jobAreaSelectedValue.length
          ? jobAreaSelectedValue
          : [],
      selectedViewValue:
        jobAreaSelctedView && jobAreaSelctedView.length
          ? jobAreaSelctedView
          : [],
    };
    this.jobRoleConfig = {
      list: this.experienceData,
      control: this.userFilterForm.get('jobRole'),
      label: 'Experience',
      viewKey: 'name',
      valueKey: 'value',
    };

    this.rangeConfig = {
      ...this.rangeConfig,
      label: 'Salary range (Hourly salary)',
      config: {
        step: 1,
        behaviour: 'drag',
        connect: true,
        range: {
          min: SALARY_RANGE_FILTERS[this.userDetails.countryName.toUpperCase()]
            .MIN, // pre selected min value
          max: SALARY_RANGE_FILTERS[this.userDetails.countryName.toUpperCase()]
            .MAX,
        },
        tooltips: [true, true],
      },
      selectedMin: this.userFilterForm.get('minSalary') as FormControl,
      selectedMax: this.userFilterForm.get('maxSalary') as FormControl,
      selectedRangeDefault: [
        this.userFilterForm.get('minSalary').value
          ? this.userFilterForm.get('minSalary').value
          : SALARY_RANGE_FILTERS[this.userDetails.countryName.toUpperCase()]
              .MIN,
        this.userFilterForm.get('maxSalary').value
          ? this.userFilterForm.get('maxSalary').value
          : SALARY_RANGE_FILTERS[this.userDetails.countryName.toUpperCase()]
              .MAX,
      ],
    };

    setTimeout(() => {
      this.showRange = true;
    }, 10);
  }

  // This will create userFilterForm froup
  getFilterForm() {
    return this.fb.group({
      jobArea: [''],
      type: [''],
      jobRole: [''],
      minSalary: [''],
      maxSalary: [''],
    });
  }

  // This will  apply filter with userFilterForm
  applyFilter() {
    try {
      const data = this.utilityService.formatData(this.userFilterForm.value);
      this.utilityService.setSessionStorage(
        SESSION_KEYS.JOB_FILTER_JOB_AREA,
        JSON.stringify({
          selectedValue: this.jobAreaSearchConfig.selectedValue,
          selectedViewValue: this.jobAreaSearchConfig.selectedViewValue,
        })
      );

      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.APPLY,
        prefectSelection: {
          jobArea: this.jobAreaSearchConfig.selectedValue,
        },
      });
      // this.dialogRef.close(FormUtils.parse(data));
    } catch (error) {}

    console.log('finalala', this.userFilterForm, this.jobAreaSearchConfig);
  }

  // This will trigger for close Dialog
  closeDialog() {
    try {
      this.dialogRef.close({
        type: DIALOG_RESPONSE.DISMISS,
      });
    } catch (error) {}
  }

  // This will reset the filter and close dialog
  reset() {
    try {
      this.userFilterForm.reset();
      this.utilityService.clearSessionStorage(SESSION_KEYS.JOB_FILTER_JOB_AREA);
      const data = this.utilityService.formatData(this.userFilterForm.value);
      console.log('datata', FormUtils.parse(data));
      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.CANCEL,
      });
      // this.dialogRef.close(FormUtils.parse(data));
    } catch (error) {}
  }
}
