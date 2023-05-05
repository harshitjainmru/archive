import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownFilterComponent } from './component/dropdown-filter.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [DropdownFilterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  exports: [DropdownFilterComponent]
})
export class DropdownFilterModule { }
