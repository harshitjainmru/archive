import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneFieldComponent } from './phone-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { TranslateModule } from '../../../../pipes/translate/translate.module';
import { ValidationErrorPipeModule } from '../../../../pipes/validation-error/validation-error-pipe.module';
import { GetControlModule } from '../../../../pipes/get-control/get-control.module';
import { NumberOnlyModule } from '../../../../directives/number-only/number-only.module';
import { CheckMaxLengthModule } from '../../../../directives/check-max-length/check-max-length.module';
import { SelectSearchModule } from '../select-search/select-search.module';
import { SearchModule } from '../../../../pipes/search/search.module';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';
import { CountryFilterModule } from 'src/app/pipes/country-filter/country-filter.module';
import { AutocompleteOffModule } from 'src/app/directives/autocomplete-off/autocomplete-off.module';


const DIRECTIVES = [AutocompleteOffModule,NumberOnlyModule,CheckMaxLengthModule];
const PIPES = [TranslateModule,ValidationErrorPipeModule,GetControlModule]

@NgModule({
  declarations: [PhoneFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    SelectSearchModule,
    SearchModule,
    CountryFilterModule,
    ...DIRECTIVES,
    ...PIPES
  ],
  exports: [PhoneFieldComponent]
})
export class PhoneFieldModule { }
