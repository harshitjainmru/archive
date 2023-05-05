import { Component, OnInit, Inject } from '@angular/core';
import { ITime } from 'src/app/models/common.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { DIALOG_RESPONSE } from 'src/app/constants/enums';
import { TimesheetService } from '../../timesheet.service';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.scss']
})
export class EditTimesheetComponent implements OnInit {

  timesheetConfig: ITime;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditTimesheetComponent>,
    private timesheetService: TimesheetService
  ) { }

  ngOnInit(): void {
    console.log('ahhahhaa', this.data)
    this.timesheetConfig = {
      label: {
        startTime: 'Clock in time',
        endTime: 'Clock out time'
      },
      labelKeys: {
        startTime: 'CLOCKINTIME',
        endTime: 'CLOCKOUTTIME'
      },
      startTime: this.data.controls.startTime ? this.data.controls.startTime : '',
      endTime: this.data.controls.endTime ? this.data.controls.endTime : '',
      placeholder: {
        startTime: 'Enter clock in time',
        endTime: 'Enter clock out time'
      },
      maxLimtTime: moment(this.data.controls.startTime.value).endOf('day').toDate(),
      minLimitTime: moment(this.data.controls.startTime.value).startOf('day').toDate(),
      stepMinute: 1,

    }
  }


  cancel() {
    this.dialogRef.close()
  }

  async saveTimeSheet() {
    try {
      if (this.timesheetConfig.startTime.invalid || this.timesheetConfig.endTime.invalid) {
        this.timesheetConfig.startTime.markAsTouched();
        this.timesheetConfig.endTime.markAsTouched();
        return;
      }

      const shiftDate = this.data.itemData.shift.shiftDate;
      let startTime, endTime;
      if (moment(shiftDate).format('MM/DD/YYYY') != moment(this.timesheetConfig.startTime.value).format('MM/DD/YYYY')) {
        startTime = moment(shiftDate).startOf('day').add(moment(this.timesheetConfig.startTime.value).hours(), 'hours').add(moment(this.timesheetConfig.startTime.value).minutes(), 'minutes');
        endTime = moment(shiftDate).startOf('day').add(moment(this.timesheetConfig.endTime.value).hours(), 'hours').add(moment(this.timesheetConfig.endTime.value).minutes(), 'minutes');

      } else {
        startTime = this.timesheetConfig.startTime.value;
        endTime = this.timesheetConfig.endTime.value;
      }


      const duration = moment.duration(moment(endTime).diff(moment(startTime)));




      const reqBody = {
        shiftId: this.data.shiftId,
        clockIn: startTime,
        clockOut: endTime,
        totalWorkingHours: parseFloat(duration.asHours().toFixed(2))
      }

      const updateResponse = await this.timesheetService.updateClockTime({ ...reqBody }).toPromise();
      if (updateResponse.data) {
        this.dialogRef.close(DIALOG_RESPONSE.APPLY);
      }
    } catch (error) {

    }
  }

}
