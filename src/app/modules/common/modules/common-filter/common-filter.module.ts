import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonFilterComponent } from './common-filter.component';
import { DropdownFilterModule } from '../dropdown-filter/dropdown-filter.module';
import { DateFilterModule } from '../date-filter/date-filter.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CommonFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownFilterModule,
    DateFilterModule,
  ],
  exports: [CommonFilterComponent]
})
export class CommonFilterModule { }
