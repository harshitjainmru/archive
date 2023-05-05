import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CUSTOM_DATE_FORMATS, TIMESHEET_STATUS } from 'src/app/constants/enums';
import * as moment from 'moment';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { TIMESHEET_LIST } from 'src/app/constants/routes';
import { PAGE_OPTION_LIMIT } from 'src/app/constants/constant';

@Component({
  selector: 'app-calendar-info-popup',
  templateUrl: './calendar-info-popup.component.html',
  styleUrls: ['./calendar-info-popup.component.scss']
})
export class CalendarInfoPopupComponent implements OnInit {


  shiftsData;
  customFormat = CUSTOM_DATE_FORMATS;

  constructor(
    public dialogRef: MatDialogRef<CalendarInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private utilityService: UtilityService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.shiftsData = this.data;
    console.log('hahaha',this.shiftsData)
  }
  onNoClick(): void {
    
    this.dialogRef.close();
  }


  viewTimeSheet(shiftsData){
    
      if(shiftsData.date >= moment()){
        this.utilityService.showAlert('Sorry! timesheet is not available')
        return
      }
      this.dialogRef.close();
      this.router.navigate( [
        `${TIMESHEET_LIST.fullUrl}/${TIMESHEET_STATUS.UNAPPROVED}`
       ],{
         queryParams:{
          ...this.utilityService.formatMomentData({ type:TIMESHEET_STATUS.UNAPPROVED,
            fromDate:moment(shiftsData.date).startOf('day'),
            toDate:moment(shiftsData.date).endOf('day'),
            ...PAGE_OPTION_LIMIT(10)})
         }
       })
  }
}
