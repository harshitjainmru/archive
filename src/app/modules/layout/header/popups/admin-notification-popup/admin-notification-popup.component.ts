import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PAGE_OPTION_LIMIT } from "src/app/constants/constant";
import { SCHEDULE_SIFT } from 'src/app/constants/routes';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-admin-notification-popup',
  templateUrl: './admin-notification-popup.component.html',
  styleUrls: ['./admin-notification-popup.component.scss']
})
export class AdminNotificationPopupComponent implements OnInit {

  notificationDetail:any;
  message:string
  workerId: string;
  constructor(
    private dialogRef: MatDialogRef<AdminNotificationPopupComponent>,
    private router:Router,
    private _utilityService:UtilityService,
    @Inject(MAT_DIALOG_DATA) private data: any
    ) {
      if (this.data) {
        console.log(data);
        this.notificationDetail=data;
        this.workerId= this.notificationDetail.senderId;
        this.message=this.notificationDetail?.message.replaceAll(' \n','<br>');
      }
    }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  checkSchedule(){
    this.router.navigate([SCHEDULE_SIFT.fullUrl],{queryParams:{workerId:this.workerId, ...PAGE_OPTION_LIMIT(10), editable:1,
      ...this._utilityService.formatMomentData(this._utilityService.getISOStartAndEndOfWeek()),}});
      this.onNoClick() 
  } 

}
