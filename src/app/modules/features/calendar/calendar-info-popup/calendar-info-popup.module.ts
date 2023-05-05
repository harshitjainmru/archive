import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarInfoPopupComponent } from './calendar-info-popup.component';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';


const PIPES = [CustomDatePipeModule]

@NgModule({
  declarations: [CalendarInfoPopupComponent],
  imports: [
    CommonModule,
    ...PIPES
  ],
  exports: [CalendarInfoPopupComponent],
  entryComponents: [CalendarInfoPopupComponent],
})
export class CalendarInfoPopupModule { }
