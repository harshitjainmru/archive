import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_DATE_FORMATS, DIALOG_RESPONSE, TIMESHEET_STATUS } from 'src/app/constants/enums';
import { Router } from '@angular/router';
import { TIMESHEET_LIST, APPLICANT_DETAILS } from 'src/app/constants/routes';
import { UtilityService } from 'src/app/services/utility.service';
import * as moment from 'moment';
import { PAGE_OPTION_LIMIT } from 'src/app/constants/constant';

@Component({
  selector: 'app-candidate-popup',
  templateUrl: './candidate-popup.component.html',
  styleUrls: ['./candidate-popup.component.scss']
})
export class CandidatePopupComponent implements OnInit {

  candidateData;
  customDateFormat = CUSTOM_DATE_FORMATS;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef:MatDialogRef<CandidatePopupComponent>,
    private router:Router,
    private utility:UtilityService
  ) { }

  ngOnInit(): void {
    this.candidateData = this.data.itemData;   
  }

  close(){
    this.dialogRef.close()
  }


  viewProfile(){
    this.router.navigate([APPLICANT_DETAILS.fullUrl(this.candidateData.jobData[0].jobId),],{
      queryParams:{
        applicantId:this.candidateData.jobData[0].userData._id ,
        applyId:this.candidateData.applyJobId
      }
    })
    this.dialogRef.close();
  }

  viewTimesheet(){
    this.dialogRef.close(DIALOG_RESPONSE.APPLY);
  }
}
