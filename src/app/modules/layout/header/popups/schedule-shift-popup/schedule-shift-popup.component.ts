import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { PAGE_OPTION_LIMIT } from "src/app/constants/constant";
import { SCHEDULE, SCHEDULE_SIFT } from "src/app/constants/routes";
import { UtilityService } from "src/app/services/utility.service";

@Component({
  selector: "app-schedule-shift-popup",
  templateUrl: "./schedule-shift-popup.component.html",
  styleUrls: ["./schedule-shift-popup.component.scss"],
})
export class ScheduleShiftPopupComponent implements OnInit {
  notificationDetail:any
  detailIndexing:Array<any>=[];
  message:string;
  workerId:string;


  constructor(
    private dialogRef: MatDialogRef<ScheduleShiftPopupComponent>,
    private router:Router,
    private _utilityService:UtilityService,
    @Inject(MAT_DIALOG_DATA) private data: any
    ) {
      if (this.data) {
        // console.log(data);
        this.notificationDetail=data;
        this.workerId= this.notificationDetail.senderId;
        this.message=this.notificationDetail?.message.replaceAll(' \n','<br>');
        // console.log(this.message);
        

        // this.formatDetail()
      }
    }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  




  // jobApplicant(jobId) {
  //   const queryParams={page:1,limit:10,sortKey:'createdAt',sortOrder:1,status:'APPLIED',jobId:jobId}
  //   this.router.navigate([APPLICANT_LIST.fullUrl(jobId)],{queryParams});
  //   this.onNoClick()
  // }


  navigateToSchedule(){
    const queryParams=this._utilityService.formatMomentData({
      ...this._utilityService.getISOStartAndEndOfWeek(),...PAGE_OPTION_LIMIT(10),
      workerId: this.workerId, editable:1
    })
    this.router.navigate([SCHEDULE.fullUrl],{queryParams});
    this.onNoClick()
    
  }

  checkSchedule(){
    this.router.navigate([SCHEDULE_SIFT.fullUrl],{queryParams:{workerId:this.workerId, ...PAGE_OPTION_LIMIT(10),
      ...this._utilityService.formatMomentData(this._utilityService.getISOStartAndEndOfWeek()),}});
      this.onNoClick() 
  }
}
