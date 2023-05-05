import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeSelectionComponent } from './date-range-selection.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CalendarMaxRangeModule } from 'src/app/directives/calendar-max-range/calendar-max-range.module';
import { MaxRangeModule } from 'src/app/directives/maxDateRange/max-range.module';

const MATERIAL_MODULES = [MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, ReactiveFormsModule, MatInputModule]
const DIRECTIVES = [CalendarMaxRangeModule]

@NgModule({
  declarations: [DateRangeSelectionComponent],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    ...DIRECTIVES,
    MaxRangeModule
  ],
  exports:[DateRangeSelectionComponent]
})
export class DateRangeSelectionModule { }
