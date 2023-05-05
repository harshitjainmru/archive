import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarMaxRangeDirective } from './calendar-max-range.directive';



@NgModule({
  declarations: [CalendarMaxRangeDirective],
  imports: [
    CommonModule
  ],
  exports:[CalendarMaxRangeDirective]
})
export class CalendarMaxRangeModule { }
