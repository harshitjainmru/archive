import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimesheetService } from '../../timesheet.service';
import { BULK_SELECTION_TIMESHEET, DIALOG_RESPONSE, TIMESHEET_STATUS } from 'src/app/constants/enums';
import { CONDITION_LINKS, TIMESHEET_BULK_TYPE } from 'src/app/constants/constant';
import { UtilityService } from 'src/app/services/utility.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-approve-popup',
  templateUrl: './approve-popup.component.html',
  styleUrls: ['./approve-popup.component.scss']
})
export class ApprovePopupComponent implements OnInit {

  recordsType = TIMESHEET_BULK_TYPE;
  recordsTypeEnum = BULK_SELECTION_TIMESHEET;
  links = CONDITION_LINKS;
  recordsData ={
  }
  recordDataIds={}

  timeSheetStatus = TIMESHEET_STATUS;



  @ViewChild('cleanSelectionRef')  cleanSelectionRef:MatCheckbox;
  @ViewChild('improperSelectionRef')  improperSelectionRef:MatCheckbox;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<ApprovePopupComponent>,
    private timesheetService: TimesheetService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    const timesheetList = this.data.timesheetList;
    for(let record of this.recordsType){
      this.recordsData[record.type] = 0;
      this.recordDataIds[record.type] = [];
    }
    for(let i=0; i< timesheetList.length;i++){
      const timesheetData = timesheetList[i];
      if(timesheetData.shift.isLateIn){
         this.recordDataIds[this.recordsTypeEnum.LATEIN].push({...timesheetData});
        this.recordsData[this.recordsTypeEnum.LATEIN] = this.recordsData[this.recordsTypeEnum.LATEIN] ? this.recordsData[this.recordsTypeEnum.LATEIN] +1 : 1 
      }else if(timesheetData.shift.isEarlyOut){
        this.recordDataIds[this.recordsTypeEnum.EARLYOUT].push({...timesheetData});
        this.recordsData[this.recordsTypeEnum.EARLYOUT] = this.recordsData[this.recordsTypeEnum.EARLYOUT] ? this.recordsData[this.recordsTypeEnum.EARLYOUT] +1 : 1 
      }else if(!timesheetData.shift.clockIn || !timesheetData.shift.clockOut ){
       this.recordDataIds[this.recordsTypeEnum.MISSED].push({...timesheetData});
        this.recordsData[this.recordsTypeEnum.MISSED] = this.recordsData[this.recordsTypeEnum.MISSED] ? this.recordsData[this.recordsTypeEnum.MISSED] +1 : 1 
      }else{
       this.recordDataIds[this.recordsTypeEnum.CLEAN].push({...timesheetData});
        this.recordsData[this.recordsTypeEnum.CLEAN] = this.recordsData[this.recordsTypeEnum.CLEAN] ? this.recordsData[this.recordsTypeEnum.CLEAN] +1 : 1 
      }
    }
  }

  cancel(){
    this.dialogRef.close()
  }

  changeSelection(){
  }
  
  async confirm(){
    try{
      if(!this.cleanSelectionRef.checked && !this.improperSelectionRef.checked){
        this.utilityService.showAlert('Please chose any selection to perform action !');
        return;
      }
      
      let selectedIds;
      if(this.cleanSelectionRef.checked && this.improperSelectionRef.checked){
        selectedIds = (this.data.timesheetList.map(items => items.shift._id)).join(",")
      }else if(this.cleanSelectionRef.checked){
        selectedIds = this.recordDataIds[this.recordsTypeEnum.CLEAN].map(items => items.shift._id).join(",")
      }else{
        selectedIds = [...this.recordDataIds[this.recordsTypeEnum.MISSED],...this.recordDataIds[this.recordsTypeEnum.EARLYOUT],...this.recordDataIds[this.recordsTypeEnum.LATEIN]].map(items => items.shift._id).join(",")
      }

      // console.log('waoaoaoa',selectedIds)

      const body = {
        type:this.data.type,
        shiftIds:selectedIds
      }
    const response = await this.timesheetService.bulkSelectionTimesheet({...body}).toPromise();
    if(response.data){
        this.dialogRef.close(DIALOG_RESPONSE.APPLY)
    }
   }catch(error){

   }
  }
}
