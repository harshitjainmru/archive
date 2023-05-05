import { Component, OnInit, Inject } from '@angular/core';
import { JOB_AREA, JOB_ROLES } from 'src/app/constants/urls';
import { ISearchAutocomplete } from 'src/app/models/common.interface';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { ScheduleService } from '../../schedule.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { SESSION_KEYS } from 'src/app/constants/constant';
import { FormService } from 'src/app/services/form.service';
import { FormUtils } from 'src/app/constants/form.util';
import { DIALOG_RESPONSE } from 'src/app/constants/enums';

@Component({
  selector: 'app-schedule-shift-filter',
  templateUrl: './schedule-shift-filter.component.html',
  styleUrls: ['./schedule-shift-filter.component.scss']
})
export class ScheduleShiftFilterComponent implements OnInit {

  jobAreaSearchConfig: ISearchAutocomplete = {
    url: JOB_AREA,
    isPagination: true,
    // control:this.scheduleFilterForm.get('jobArea') as FormControl,
    viewKey: "name",
    valueKey: "_id",
    selectedValue: [],
    selectedViewValue: [],
    placeholder: "Search & select job site",
    localSave:true,
    limit:5,
    localSaveKey:"JOB_FILTER_JOB_AREA"
  };

  jobRoleSearchConfig: ISearchAutocomplete = {
    url: JOB_ROLES,
    isPagination: true,
    // control:this.scheduleFilterForm.get('jobArea') as FormControl,
    viewKey: "name",
    valueKey: "_id",
    selectedValue: [],
    selectedViewValue: [],
    placeholder: "Search & select job role",
    localSave:true,
    limit:5,
    localSaveKey:"JOB_ROLE_FILTER"
  };

  scheduleFilterForm:FormGroup;  
  userDetails;
  
  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilityService: UtilityService,
    public scheduleService: ScheduleService,
    private userProfileService: UserProfileService
  ) {
    this.scheduleFilterForm = this.getFilterForm();

   }

  ngOnInit(): void {
    if (this.data) {
      console.log("waoaoaoa", this.data);
      const filterData = {
        jobRole:
          this.data && this.data?.jobRole ? this.data?.jobRole.split(",") : [],
        jobSite: this.data && this.data?.jobSite ? this.data?.jobSite.split(",") : [],

      };
      this.scheduleFilterForm.patchValue({ ...filterData });
    }

    let jobAreaSelectedValue, jobAreaSelctedView;
    if(this.data && this.data.jobSite){
       jobAreaSelectedValue = this.utilityService.getSessionStorage(
        SESSION_KEYS.JOB_FILTER_JOB_AREA
      )?.selectedValue;
       jobAreaSelctedView = this.utilityService.getSessionStorage(
        SESSION_KEYS.JOB_FILTER_JOB_AREA
      )?.selectedViewValue;

    }

    let jobRoleSelectedValue, jobRoleSelctedView;
    if(this.data && this.data.jobRole){
       jobRoleSelectedValue = this.utilityService.getSessionStorage(
        SESSION_KEYS.JOB_ROLE_FILTER
      )?.selectedValue;
       jobRoleSelctedView = this.utilityService.getSessionStorage(
        SESSION_KEYS.JOB_ROLE_FILTER
      )?.selectedViewValue;
    }


    this.userDetails = this.userProfileService.profileData;
    this.jobAreaSearchConfig = {
      ...this.jobAreaSearchConfig,
      selectedControl: this.scheduleFilterForm.get("jobSite") as FormControl,
      searchQuery: { countryId: this.userDetails.countryId },
      control: new FormControl(""),
      selectedValue:
        jobAreaSelectedValue && jobAreaSelectedValue.length
          ? jobAreaSelectedValue
          : [],
      selectedViewValue:
        jobAreaSelctedView && jobAreaSelctedView.length
          ? jobAreaSelctedView
          : [],
    };
    this.jobRoleSearchConfig = {
      ...this.jobRoleSearchConfig,
      selectedControl: this.scheduleFilterForm.get("jobRole") as FormControl,
      control: new FormControl(""),
      selectedValue:
        jobRoleSelectedValue && jobRoleSelectedValue.length
          ? jobRoleSelectedValue
          : [],
      selectedViewValue:
        jobRoleSelctedView && jobRoleSelctedView.length
          ? jobRoleSelctedView
          : [],
    };


  }

  getFilterForm() {
    return this.fb.group({
      jobSite: this.formService.getControl('dropdown'),
      jobRole:this.formService.getControl('dropdown')
    });
  }

  applyFilter() {
    try {
      const data = this.utilityService.formatData(this.scheduleFilterForm.value);
     

      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.APPLY,
      });
      // this.dialogRef.close(FormUtils.parse(data));
    } catch (error) {}

    console.log("finalala", this.scheduleFilterForm, this.jobAreaSearchConfig);
  }

  closeDialog() {
    try {
      this.dialogRef.close({
        type: DIALOG_RESPONSE.DISMISS,
      });
    } catch (error) {}
  }

  reset() {
    try {
      this.scheduleFilterForm.reset();
      this.utilityService.clearSessionStorage(SESSION_KEYS.JOB_FILTER_JOB_AREA);
      this.utilityService.clearSessionStorage(SESSION_KEYS.JOB_ROLE_FILTER);

      const data = this.utilityService.formatData(this.scheduleFilterForm.value);
      console.log("datata", FormUtils.parse(data));
      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.CANCEL,
      });
      // this.dialogRef.close(FormUtils.parse(data));
    } catch (error) {}
  }

}
