import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSearchModule } from '../select-search/select-search.module';
import { MatSelectModule } from '@angular/material/select';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';
import { SelectAddressComponent } from './select-address.component';
import { AddAddressModule } from 'src/app/modules/features/job/popups/add-adress/add-adress.module';


@NgModule({
  declarations: [SelectAddressComponent],
  imports: [
    CommonModule,
    AddAddressModule,
    SelectSearchModule,
    MatIconModule,
    MatFormFieldModule,
    ValidationErrorPipeModule,
    SearchFilterModule,
  ],
  exports: [
    SelectAddressComponent,
    AddAddressModule,
    MatSelectModule,
    SelectSearchModule,
    MatIconModule,
    MatFormFieldModule,
    ValidationErrorPipeModule,
    SearchFilterModule,

  ]
})
export class SelectAddressModule { }
