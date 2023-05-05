import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantFilterComponent } from './applicant-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateFilterModule } from '../date-filter/date-filter.module';
import { DropdownFilterModule } from '../dropdown-filter/dropdown-filter.module';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ChipSearchFormModule } from '../chip-search-form/chip-search-form.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [ApplicantFilterComponent],
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
    DateFilterModule,
    DropdownFilterModule,
    SearchFilterModule,
    NgxSliderModule,
    ChipSearchFormModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  exports: [ApplicantFilterComponent]
})
export class ApplicantFilterModule { }
