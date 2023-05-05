import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HOME, SHIFT } from 'src/app/constants/routes';

@Component({
  selector: 'app-shift-success-popup',
  templateUrl: './shift-success-popup.component.html',
  styleUrls: ['./shift-success-popup.component.scss']
})
export class ShiftSuccessPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<ShiftSuccessPopupComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(isClick:boolean =  false): void {
    this.dialogRef.close(isClick);
  }

  goToDashboard() {
    this.onNoClick();
    this.router.navigate([HOME]);
  }

  goToShif() {
    this.onNoClick();
    this.router.navigate([SHIFT.fullUrl]);
  }

}
