import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleInterviewComponent } from './schedule-interview.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateFnsDateAdapter, MAT_DATE_FNS_DATE_FORMATS } from 'src/app/services/date-fns-date-adapter.service';
import { TimePickerModule } from 'src/app/modules/common/modules/time-picker/time-picker.module';


@NgModule({
  declarations: [ScheduleInterviewComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TimePickerModule
  ],
  exports: [ScheduleInterviewComponent],
  providers: [
    {
      provide: DateAdapter,
      useClass: DateFnsDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_DATE_FNS_DATE_FORMATS
    },
  ]
})
export class ScheduleInterviewModule { }
