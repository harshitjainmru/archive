import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayMonthPipe } from './display-month.pipe';



@NgModule({
  declarations: [DisplayMonthPipe],
  imports: [
    CommonModule
  ],
  exports:[DisplayMonthPipe]
})
export class DisplayMonthModule { }
