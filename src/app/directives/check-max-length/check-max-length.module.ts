import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckMaxLengthDirective } from './check-max-length.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [CheckMaxLengthDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports:[CheckMaxLengthDirective]
})
export class CheckMaxLengthModule { }
 