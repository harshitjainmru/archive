import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JOB_PORTAL_TYPE } from 'src/app/constants/constant';
import { SUCCESS_PARENT_TYPE, USER_TYPE } from 'src/app/constants/enums';
import {
  HOME,
  SEARCH_APPLICANT_LIST,
  USER_JOB,
} from 'src/app/constants/routes';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss'],
})
export class SuccessPopupComponent implements OnInit {
  parent: string = null;
  parentType = SUCCESS_PARENT_TYPE;
  jobStatus = JOB_PORTAL_TYPE;
  accountType: number = USER_TYPE.BUSINESS_CLIENT;
  USER_TYPE = USER_TYPE;
  body;
  constructor(
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _dialogRef: MatDialogRef<SuccessPopupComponent>
  ) {
    console.log(data);
  }

  // On init life cycle hook
  ngOnInit(): void {
    this.parent = this.data?.parent || this.data;
    if (this.data?.accountType) {
      this.accountType = this.data?.accountType;
    }
    if (this.data?.body) {
      this.body = this.data?.body;
    }
  }

  // Close dialog
  closeMe(isClick: boolean = false) {
    this._dialogRef.close(isClick);
  }

  // Navigate home page
  goToDashboard() {
    this._router.navigate([HOME.fullUrl]);
    this.closeMe();
    // window.location.reload();
  }

  // This will navigate job page
  goToJobs() {
    this._router.navigate([USER_JOB.fullUrl]);
    this.closeMe();
  }

  // Navigate search-candidate-list
  goToSearch() {
    this._router.navigate([SEARCH_APPLICANT_LIST.fullUrl(this.data.body._id)]);
    this.closeMe();
  }
}
