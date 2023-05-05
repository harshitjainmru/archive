import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleCalenderComponent } from './schedule-calender.component';
import { CalendarInfoPopupModule } from '../calendar-info-popup/calendar-info-popup.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MonthlySelectionModule } from '../monthly-selection/monthly-selection.module';

const CUSTOM_MODULES = [CalendarInfoPopupModule, MonthlySelectionModule]

@NgModule({
  declarations: [ScheduleCalenderComponent],
  imports: [
    CommonModule,
    CalendarInfoPopupModule,
    MatDialogModule,
    ...CUSTOM_MODULES,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
      
    })
  ],
  exports:[ScheduleCalenderComponent]
})
export class ScheduleCalenderModule { }
