import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { GetControlModule } from 'src/app/pipes/get-control/get-control.module';
import {OwlTimeComponent} from './owl-time.component';

const MODULES = [OwlDateTimeModule,
  OwlNativeDateTimeModule];
const MATERIAL = [ReactiveFormsModule,FormsModule, MatFormFieldModule,MatInputModule]

const PIPES = [ValidationErrorPipeModule,GetControlModule]

@NgModule({
  declarations: [OwlTimeComponent],
  imports: [
    CommonModule,
    ...MODULES,
    ...MATERIAL,
    ...PIPES
  ],
  exports:[OwlTimeComponent]
})
export class OwlTimeModule { }
