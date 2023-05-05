import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckTimesheetEditPipe } from './check-timesheet-edit.pipe';



@NgModule({
  declarations: [CheckTimesheetEditPipe],
  imports: [
    CommonModule
  ],
  exports:[CheckTimesheetEditPipe]
})
export class CheckTimsheetEditModule { }
