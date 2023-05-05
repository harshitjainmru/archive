import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSkillsComponent } from './search-skills.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';
import { SelectSearchModule } from '../select-search/select-search.module';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';



@NgModule({
  declarations: [SearchSkillsComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    SelectSearchModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule,
    SearchFilterModule,
    ValidationErrorPipeModule,
    SearchFilterModule,
    MatChipsModule,
  ],
  exports: [
    SearchSkillsComponent,
    MatSelectModule,
    SelectSearchModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule,
    SearchFilterModule,
    ValidationErrorPipeModule,
    SearchFilterModule,
    MatChipsModule,
  ]
})
export class SearchSkillsModule { }
