import { ValidationErrorPipe } from './validation-error.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ValidationErrorPipe,
  ],
  exports: [
    ValidationErrorPipe,
  ],
  providers:[]
})
export class ValidationErrorPipeModule { }
