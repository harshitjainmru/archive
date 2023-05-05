import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchJobRoleComponent } from './search-job-role.component';
import { SelectSearchModule } from '../select-search/select-search.module';
import { MatSelectModule } from '@angular/material/select';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';


@NgModule({
  declarations: [SearchJobRoleComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    SelectSearchModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule,
    ValidationErrorPipeModule,
    SearchFilterModule,
    MatChipsModule,
  ],
  exports: [
    SearchJobRoleComponent,
    MatSelectModule,
    SelectSearchModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule,
    ValidationErrorPipeModule,
    SearchFilterModule,
    MatChipsModule,

  ]
})
export class SearchJobRoleModule { }
