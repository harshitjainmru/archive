import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstantTransPipe } from './constant-trans.pipe';
import { ConstantDatePipe } from './constant-date.pipe';
import { TimeDurationPipe } from './time-duration.pipe';



@NgModule({
  declarations: [ConstantTransPipe, ConstantDatePipe, TimeDurationPipe],
  imports: [
    CommonModule
  ],
  exports: [ConstantTransPipe, ConstantDatePipe, TimeDurationPipe]
})
export class ConstantParserModule { }
