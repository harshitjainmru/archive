import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipSearchFormComponent } from './chip-search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const MATERIAL = [MatProgressSpinnerModule, MatTooltipModule]

@NgModule({
  declarations: [ChipSearchFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    SearchFilterModule,
    ...MATERIAL,
  ],
  exports: [ChipSearchFormComponent]
})
export class ChipSearchFormModule { }
