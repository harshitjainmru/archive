import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetFilterComponent } from './timesheet-filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipSearchFormModule } from 'src/app/modules/common/modules/chip-search-form/chip-search-form.module';
import { TimesheetService } from '../../timesheet.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomCheckboxModule } from 'src/app/modules/common/modules/custom-checkbox/custom-checkbox.module';
import { SelectJobareaModule } from 'src/app/modules/common/modules/select-jobarea/select-jobarea.module';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';


const MATERIAL = [MatDialogModule, FormsModule,ReactiveFormsModule, MatFormFieldModule,CustomCheckboxModule]

const CUSTOM_MODULES = [ChipSearchFormModule, SelectJobareaModule]
const PIPES = [GetControlModule]

@NgModule({
  declarations: [TimesheetFilterComponent],
  imports: [
    CommonModule,
    ...MATERIAL,
    ...CUSTOM_MODULES,
    ...PIPES
  ],
  exports:[TimesheetFilterComponent],
  providers:[TimesheetService]
})
export class TimesheetFilterModule { }
