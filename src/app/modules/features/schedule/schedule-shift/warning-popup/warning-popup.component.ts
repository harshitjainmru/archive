import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScheduleWarning } from 'src/app/models/schedule.interface';
import { CUSTOM_HANDLE_ERROR } from 'src/app/constants/enums';

@Component({
  selector: 'app-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.scss']
})
export class WarningPopupComponent implements OnInit {



  warningData:ScheduleWarning[] = []


  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private dialogRef:MatDialogRef<WarningPopupComponent>

  ) { 
    this.warningData = data;
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }

  continue(){
    this.dialogRef.close(CUSTOM_HANDLE_ERROR.CONTINUE);
  }

}
