import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchApplicantFilterComponent } from './search-applicant-filter.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipSearchFormModule } from 'src/app/modules/common/modules/chip-search-form/chip-search-form.module';

const MATERIAL=[MatRadioModule,MatInputModule]

@NgModule({
  declarations: [SearchApplicantFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ChipSearchFormModule,
    ...MATERIAL
  ],
  exports:[SearchApplicantFilterComponent]
})
export class SearchApplicantFilterModule { }
