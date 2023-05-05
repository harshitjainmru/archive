import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectScheduleDropdownComponent } from './select-schedule-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';

const CUSTOM_MODULES = [MatSelectModule, ReactiveFormsModule];

const PIPES = [CustomDatePipeModule, GetControlModule]
@NgModule({
  declarations: [SelectScheduleDropdownComponent],
  imports: [
    CommonModule,
    ...CUSTOM_MODULES,
    ...PIPES,
  ],
  exports:[SelectScheduleDropdownComponent]
})
export class SelectScheduleDropdownModule { }
