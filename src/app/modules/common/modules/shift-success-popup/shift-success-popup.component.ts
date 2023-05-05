import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HOME, SHIFT } from 'src/app/constants/routes';

@Component({
  selector: 'app-shift-success-popup',
  templateUrl: './shift-success-popup.component.html',
  styleUrls: ['./shift-success-popup.component.scss'],
})
export class ShiftSuccessPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<ShiftSuccessPopupComponent>
  ) {}

  ngOnInit(): void {}

  // Close matdialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  // This will navigate home page
  goToDashboard() {
    this.onNoClick();
    this.router.navigate([HOME]);
  }

  // This will navigate Shift page
  goToShif() {
    this.onNoClick();
    this.router.navigate([SHIFT.fullUrl]);
  }
}
