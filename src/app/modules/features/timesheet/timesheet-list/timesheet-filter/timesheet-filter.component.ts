import { Component, OnInit, Inject } from '@angular/core';
import { JOB_ROLES, JOBS_API } from 'src/app/constants/urls';
import { ISearchAutocomplete } from 'src/app/models/common.interface';
import { FormService } from 'src/app/services/form.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { TimesheetService } from '../../timesheet.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { SESSION_KEYS, ATTENDANCE_FILTER } from 'src/app/constants/constant';
import { FormUtils } from 'src/app/constants/form.util';
import { DIALOG_RESPONSE, DROPDOWN_TYPE } from 'src/app/constants/enums';

@Component({
  selector: 'app-timesheet-filter',
  templateUrl: './timesheet-filter.component.html',
  styleUrls: ['./timesheet-filter.component.scss']
})
export class TimesheetFilterComponent implements OnInit {

  jobRoleSearchConfig: ISearchAutocomplete = {
    url: JOB_ROLES,
    isPagination: true,
    // control:this.timesheetFilterForm.get('jobArea') as FormControl,
    viewKey: "name",
    valueKey: "_id",
    selectedValue: [],
    selectedViewValue: [],
    placeholder: "Search & select job role",
    localSave:true,
    limit:5,
    localSaveKey:"JOB_ROLE_FILTER"
  };

  jobType = DROPDOWN_TYPE.JOBNAME;
  jobSearchUrl = JOBS_API;

  attendanceStatusConfig = {};

  timesheetFilterForm:FormGroup;
  userDetails;
 

  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilityService: UtilityService,
    public timeSheetService: TimesheetService,
    private userProfileService: UserProfileService
  ) {
    this.timesheetFilterForm = this.getFilterForm();
   }

 
  ngOnInit(): void {
       
    if (this.data) {
      const filterData = {
        jobRole:
          this.data && this.data?.jobRole ? this.data?.jobRole.split(",") : [],
        jobSite: this.data && this.data?.jobSite ? this.data?.jobSite.split(",") : [],
        attendanceStatus: this.data && this.data?.attendanceStatus ? this.data?.attendanceStatus.split(",") : [],
        jobIds:this.data && this.data.jobIds ? this.data.jobIds :''

      };
      this.timesheetFilterForm.patchValue({ ...filterData });
    }

    let jobRoleSelectedValue,jobRoleSelctedView;
    if(this.data.jobRole){
       jobRoleSelectedValue = this.utilityService.getSessionStorage(
        SESSION_KEYS.JOB_ROLE_FILTER
      )?.selectedValue;
       jobRoleSelctedView = this.utilityService.getSessionStorage(
        SESSION_KEYS.JOB_ROLE_FILTER
      )?.selectedViewValue;

    }


    this.userDetails = this.userProfileService.profileData;

    this.jobRoleSearchConfig = {
      ...this.jobRoleSearchConfig,
      selectedControl: this.timesheetFilterForm.get("jobRole") as FormControl,
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
    this.attendanceStatusConfig = {
      list: ATTENDANCE_FILTER,
      control: this.timesheetFilterForm.get("attendanceStatus"),
      label: "Attendance  status",
      viewKey: "name",
      valueKey: "value",
    };


  }

  getFilterForm() {
    return this.fb.group({
      jobSite: this.formService.getControl('dropdown'),
      jobRole:this.formService.getControl('dropdown'),
      attendanceStatus:this.formService.getControl('dropdown'),
      jobIds:this.formService.getControl('dropdown')
    });
  }

  applyFilter() {
    try {
      let data = this.utilityService.formatData(this.timesheetFilterForm.value); 

      data = {...data, jobIds:data.jobIds._id}

      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.APPLY,
      });
      // this.dialogRef.close(FormUtils.parse(data));
    } catch (error) {}

    console.log("finalala", this.timesheetFilterForm);
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
      this.timesheetFilterForm.reset();
      this.utilityService.clearSessionStorage(SESSION_KEYS.JOB_FILTER_JOB_AREA);
      this.utilityService.clearSessionStorage(SESSION_KEYS.JOB_ROLE_FILTER);

      const data = this.utilityService.formatData(this.timesheetFilterForm.value);
      console.log("datata", FormUtils.parse(data));
      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.CANCEL,
      });
      // this.dialogRef.close(FormUtils.parse(data));
    } catch (error) {}
  }


}
