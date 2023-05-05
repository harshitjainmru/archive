import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-info-popup',
  templateUrl: './schedule-info-popup.component.html',
  styleUrls: ['./schedule-info-popup.component.scss']
})
export class ScheduleInfoPopupComponent implements OnInit {


  infoData;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private _dialogRef: MatDialogRef<ScheduleInfoPopupComponent>
  ) { 
    this.infoData = data;
    console.log(this.infoData)
  }

  ngOnInit(): void {
  }


  close(){
    this._dialogRef.close()
  }

}
