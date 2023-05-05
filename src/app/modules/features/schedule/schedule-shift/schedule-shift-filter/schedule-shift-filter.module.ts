import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleShiftFilterComponent } from './schedule-shift-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ChipSearchFormModule } from 'src/app/modules/common/modules/chip-search-form/chip-search-form.module';
import { ScheduleService } from '../../schedule.service';


const CUSTOM_MODULES = [ChipSearchFormModule]

@NgModule({
  declarations: [ScheduleShiftFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ...CUSTOM_MODULES
  ],
  providers:[ScheduleService],
  exports:[ScheduleShiftFilterComponent]
})
export class ScheduleShiftFilterModule { }
