import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckNullPipe } from './check-null.pipe';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    CheckNullPipe,
  ],
  exports: [
    CheckNullPipe,
    ReactiveFormsModule
  ]

})
export class CheckNullPipeModule { }
