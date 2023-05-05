import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './time-picker.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';



@NgModule({
  declarations: [TimePickerComponent],
  imports: [
    CommonModule,
    NgxMaterialTimepickerModule
  ],
  exports: [TimePickerComponent]
})
export class TimePickerModule { }
