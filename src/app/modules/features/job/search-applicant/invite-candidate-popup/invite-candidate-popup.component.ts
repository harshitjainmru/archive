import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APPLY_TYPE } from 'src/app/constants/enums';
import { VALIDATION_CRITERIA } from 'src/app/constants/validation-criteria';
import { FormService } from 'src/app/services/form.service';
import { UtilityService } from 'src/app/services/utility.service';
import { SearchApplicantService } from '../services/search-applicant-service.service';

@Component({
  selector: 'app-invite-candidate-popup',
  templateUrl: './invite-candidate-popup.component.html',
  styleUrls: ['./invite-candidate-popup.component.scss']
})
export class InviteCandidatePopupComponent implements OnInit {

  inviteForm:FormGroup;
  VALIDATION_CRITERIA=VALIDATION_CRITERIA
  constructor(
    private dialogRef: MatDialogRef<InviteCandidatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private searchApplicantService:SearchApplicantService,
    private formService:FormService,
    private utilityService:UtilityService
    ) { 
      this.createInviteForm();
    }

  ngOnInit(): void {
  }



  createInviteForm(){
    this.inviteForm=this.fb.group({
      title:this.formService.getControl('title'),
      message:this.formService.getControl('message')
    })
  }


  async sendInvites(){
    if(this.inviteForm.invalid){
      return;
    }
    try {
      const {userId,jobId}=this.data
      console.log({userId,jobId})
      const payload={
        userId,
        jobId,
        applyType:APPLY_TYPE.INVITATION,
        ...this.inviteForm.value
      }

      console.log(payload);
      return
      const resp= await  this.searchApplicantService.sendInite(payload);
      this.utilityService.showAlert(resp?.message);
    } catch (error) {
      
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
