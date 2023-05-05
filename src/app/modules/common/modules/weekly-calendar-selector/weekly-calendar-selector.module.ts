import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyCalendarSelectorComponent } from './weekly-calendar-selector.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';



const MATERIAL_MODULES = [MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, ReactiveFormsModule]

@NgModule({
  declarations: [WeeklyCalendarSelectorComponent],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports:[WeeklyCalendarSelectorComponent]
})
export class WeeklyCalendarSelectorModule { }
