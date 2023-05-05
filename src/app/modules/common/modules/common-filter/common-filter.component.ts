import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FULLDAY_DATA, USER_STATUS_LIST } from 'src/app/constants/constant';
import { FormService } from 'src/app/services/form.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.scss'],
})
export class CommonFilterComponent implements OnInit {
  fullDayData = FULLDAY_DATA;
  userFilterObject: any = null;
  dayFilterObject: any = null;
  userFilterForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private utilityService: UtilityService
  ) {
    this.userFilterForm = this.getFilterForm();
    this.userFilterObject = this.createFilterObject(this.userFilterForm);
    if (data) {
      this.userFilterForm.patchValue(data);
    }
  }
  /**
   * on init life cycle hook
   */
  ngOnInit() {}

  // Creating form group
  getFilterForm() {
    return this.fb.group({
      fromDate: this.formService.getControl('fromDate', false),
      toDate: this.formService.getControl('toDate', false),
      status: this.formService.getControl('status', false),
      weekDays: this.formService.getControl('weekDays', false),
    });
  }

  /*
   Creating Filter Object For All Filters
*/
  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate,
      },
      status: {
        label: 'Status',
        list: USER_STATUS_LIST,
        control: form.controls.status,
      },
      fullDaya: {
        label: 'Working Days',
        list: FULLDAY_DATA,
        control: form.controls.weekDays,
        multiple: true,
      },
    };
  }

  // This will submit user filter form value
  onApplyHandler() {
    if (this.userFilterForm.valid) {
      const filterData = { ...this.userFilterForm.value };
      this.dialogRef.close(
        this.utilityService.parseDateToTimeStamp(filterData)
      );
      this.userFilterForm.reset();
    }
  }

  // This will reset use filter for with close dialog
  resetFilter() {
    this.userFilterForm.reset();
    this.dialogRef.close({});
  }
}
