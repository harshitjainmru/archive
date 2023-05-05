import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlySelectionComponent } from './monthly-selection/monthly-selection.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULES = [MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, ReactiveFormsModule, MatInputModule]


@NgModule({
  declarations: [MonthlySelectionComponent],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports:[MonthlySelectionComponent]
})
export class MonthlySelectionModule { }
