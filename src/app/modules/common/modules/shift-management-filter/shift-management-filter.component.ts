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
  FULLDAY_DATA,
  USER_STATUS_LIST,
  SHIFT_STATUS_LIST,
  SHIFT_FULLDAY_DATA,
  ALL,
} from 'src/app/constants/constant';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shift-management-filter',
  templateUrl: './shift-management-filter.component.html',
  styleUrls: ['./shift-management-filter.component.scss'],
})
export class ShiftManagementFilterComponent implements OnInit {
  userFilterForm: FormGroup;
  activeData;
  fullDayData = SHIFT_FULLDAY_DATA;
  selectedDays = [];
  statusList = SHIFT_STATUS_LIST;
  selectedStatus = [];
  userFilterObject: any = null;

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
    this.userFilterObject = this.createFilterObject(this.userFilterForm);
    if (data) {
      this.activeData = data;
    }
    !this.activeData &&
      this.statusList.forEach((element) => {
        return (element.checked = false);
      });
    !this.activeData &&
      this.fullDayData.forEach((element) => {
        return (element.checked = false);
      });
  }

  // On init life cycle hook
  ngOnInit(): void {
    this.activeData && this.manageRefreshCase();
  }

  // This will manage refresh
  manageRefreshCase() {
    this.userFilterForm.patchValue(this.activeData);
    this.selectedDays = this.activeData.weekDays || [];
    this.selectedStatus = this.activeData.status || [];
  }

  // Create filter object
  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate,
      },
    };
  }

  // This will create userFilterForm group
  getFilterForm() {
    return this.fb.group({
      fromDate: this.formService.getControl('fromDate', false),
      toDate: this.formService.getControl('toDate', false),
      status: [],
      weekDays: [],
    });
  }

  // This will apply filter
  applyFilter() {
    let payload = JSON.parse(JSON.stringify(this.userFilterForm.value));
    if (
      payload &&
      payload.weekDays &&
      payload.weekDays.length &&
      payload.weekDays.length != 8
    ) {
      payload.weekDays = JSON.stringify(payload.weekDays);
    }
    if (
      (payload && payload.weekDays && payload.weekDays.length === 8) ||
      !payload.weekDays
    ) {
      delete payload.weekDays;
    }
    if (payload && payload.status && payload.status.length === 1) {
      payload.status = payload.status[0];
    } else {
      delete payload.status;
    }
    this.dialogRef.close({ payload, orgArr: this.userFilterForm.value });
  }

  // Close Dialog
  closeDialog() {
    this.userFilterForm.reset();
    this.statusCtrl.reset();
    this.daysCtrl.reset();
    this.activeData = null;
    this.dialogRef.close({ payload: null, orgArr: null });
  }

  // This will select Change event object emitted by MatCheckbox
  onSelectDays(event: MatCheckboxChange, index: number) {
    const value = event.source.value;
    if (value === 'all') {
      if (event.checked) {
        this.selectedDays = [];
        this.fullDayData.forEach((element) => {
          return (element.checked = true);
        });
        SHIFT_FULLDAY_DATA.forEach((element) => {
          this.selectedDays.push(element.value);
        });
      } else {
        this.fullDayData.forEach((element) => {
          return (element.checked = false);
        });
        this.selectedDays = [];
      }
    } else {
      if (event.checked) {
        this.fullDayData[index]['checked'] = true;
        this.selectedDays.push(value);
        if (this.selectedDays.length === 7) {
          this.selectedDays.push('all');
          this.fullDayData[0].checked = true;
        }
      } else {
        this.fullDayData[index]['checked'] = false;
        this.selectedDays.splice(this.selectedDays.indexOf(value), 1);
        this.fullDayData[0].checked = false;
        this.selectedDays.indexOf('all') >= 0 &&
          this.selectedDays.splice(this.selectedDays.indexOf('all'), 1);
      }
    }
    this.daysCtrl.setValue(this.selectedDays);
  }

  // This will select Change event object emitted by MatCheckbox.
  onSelectStatus(event: MatCheckboxChange, index: number) {
    const value = event.source.value;
    if (event.checked) {
      this.statusList[index]['checked'] = true;
      this.selectedStatus.push(value);
    } else {
      this.statusList[index]['checked'] = false;
      this.selectedStatus.splice(this.selectedStatus.indexOf(value), 1);
    }
    this.statusCtrl.setValue(this.selectedStatus);
  }

  // This will get status control
  get statusCtrl(): FormControl {
    return this.userFilterForm.get('status') as FormControl;
  }

  // This will get weekdays control
  get daysCtrl(): FormControl {
    return this.userFilterForm.get('weekDays') as FormControl;
  }
}
