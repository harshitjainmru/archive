import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimesheetService } from '../../timesheet.service';
import { FormGroup } from '@angular/forms';
import { ATTENDANCE_STATUS } from 'src/app/constants/enums';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-timesheet-attendance',
  templateUrl: './timesheet-attendance.component.html',
  styleUrls: ['./timesheet-attendance.component.scss']
})
export class TimesheetAttendanceComponent implements OnInit, OnDestroy {


  @Input() searchSortFilter:FormGroup;

  listenTimesheetFigures:Subscription;
  attendanceEnum = ATTENDANCE_STATUS;
  attendanceData= {};

  isDateLoaded:boolean = false;

  constructor(
    private timesheetService:TimesheetService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    if(this.searchSortFilter){
      const {fromDate,toDate,employeeId} = this.searchSortFilter.value;
      this.timesheetService.updateAttendanceStatus(this.utilityService.formatMomentData({fromDate,toDate,employeeId}));
    }

       
    this.listenTimesheetFigures = this.timesheetService.timesheetAttendance$.subscribe(data=>{
      const responseData:any = data;
      if(data){

        for(let type in responseData){
          this.attendanceData[type] = data[type];
        }
        this.isDateLoaded = true
      }
       
    })
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listenTimesheetFigures.unsubscribe()
  }

}
