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
import { SelectJobareaComponent } from './select-jobarea.component';
import { JobService } from 'src/app/modules/features/job/add-job/service/job.service';


@NgModule({
  declarations: [SelectJobareaComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    SelectSearchModule,
    MatIconModule,
    MatFormFieldModule,
    ValidationErrorPipeModule,
  ],
  exports: [
    SelectJobareaComponent,
    MatSelectModule,
    SelectSearchModule,
    MatIconModule,
    MatFormFieldModule,
    ValidationErrorPipeModule,
  ],
  providers:[JobService]
})
export class SelectJobareaModule { }
