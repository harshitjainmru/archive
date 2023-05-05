import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-time-overlap-popup',
  templateUrl: './time-overlap-popup.component.html',
  styleUrls: ['./time-overlap-popup.component.scss']
})
export class TimeOverlapPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimeOverlapPopupComponent>) { }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
