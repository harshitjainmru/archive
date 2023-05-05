import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCheckboxComponent } from './custom-checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';


const MATERIAL = [MatCheckboxModule, FormsModule, MatFormFieldModule ]

const PIPES = [CustomDatePipeModule]

@NgModule({
  declarations: [CustomCheckboxComponent],
  imports: [
    CommonModule,
    ...MATERIAL,
    ...PIPES
  ],
  exports:[CustomCheckboxComponent]
})
export class CustomCheckboxModule { }
