import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobActionPopupComponent } from './job-action-popup.component';
import { DateAgoModule } from 'src/app/pipes/date-ago/date-ago.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';



@NgModule({
  declarations: [JobActionPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    DateAgoModule,
    CustomDatePipeModule
  ],
  exports:[JobActionPopupComponent]
})
export class JobActionPopupModule { }
