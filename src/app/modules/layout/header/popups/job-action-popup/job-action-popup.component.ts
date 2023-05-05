import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APPLICANT_LIST } from 'src/app/constants/routes';
import { CustomDatePipe } from 'src/app/pipes/custom-date/custom-date.pipe';

@Component({
  selector: 'app-job-action-popup',
  templateUrl: './job-action-popup.component.html',
  styleUrls: ['./job-action-popup.component.scss']
})
export class JobActionPopupComponent implements OnInit {

  notificationDetail:any
  detailIndexing:Array<any>=[];
  message:string;


  constructor(
    private dialogRef: MatDialogRef<JobActionPopupComponent>,
    private customDate :CustomDatePipe,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) private data: any
    ) {
      if (this.data) {
        // console.log(data);
        this.notificationDetail=data;
        console.log('----',this.notificationDetail);
        
        this.message=this.notificationDetail?.message.replaceAll(' \n','<br>');
        // console.log(this.message);
        

        // this.formatDetail()
      }
    }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  formatDetail(){
    console.log(this.notificationDetail);
    if(this.notificationDetail?.message){
      let content:string=this.notificationDetail.message
      this.detailIndexing=content.split(',');
      console.log(this.detailIndexing);
      if(this.detailIndexing[1] && this.detailIndexing[1].indexOf(':')){
        const date=this.detailIndexing[1].substring(this.detailIndexing[1].indexOf(':')+1);
        if(date){
          this.detailIndexing[1]=`Applied On: ${this.customDate.transform(date)}`
        }
      }
      
    }
  }




  jobApplicant(jobId) {
    if(!jobId){
      return
    }
    const queryParams={page:1,limit:10,sortKey:'createdAt',sortOrder:1,status:'APPLIED',jobId:jobId}
    this.router.navigate([APPLICANT_LIST.fullUrl(jobId)],{queryParams});
    this.onNoClick()
  }

}
