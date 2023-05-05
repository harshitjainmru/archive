import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobManagementFilterComponent } from './job-management-filter.component';
// import { FormService } from 'src/app/modules/shared/services/form.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DateFilterModule } from '../date-filter/date-filter.module';
import { DropdownFilterModule } from '../dropdown-filter/dropdown-filter.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ChipSearchFormModule } from '../chip-search-form/chip-search-form.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JobService } from 'src/app/modules/features/job/add-job/service/job.service';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';
import { CustomCheckboxModule } from '../custom-checkbox/custom-checkbox.module';
import { RangeSliderModule } from '../range-slider/range-slider.module';
import { SelectJobareaModule } from '../select-jobarea/select-jobarea.module';


const CUSTOM_MODULES = [MatCheckboxModule, ChipSearchFormModule, DropdownFilterModule, SearchFilterModule ,DateFilterModule ,NgxSliderModule , CustomCheckboxModule, RangeSliderModule , SelectJobareaModule]

const PIPES = [ GetControlModule]

@NgModule({
  declarations: [
    JobManagementFilterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ...CUSTOM_MODULES,
    ...PIPES
  ],
  exports: [JobManagementFilterComponent],
  providers: [JobService]
})
export class JobManagementFilterModule { }
