import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSliderComponent } from './range-slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NouisliderModule } from 'ng2-nouislider';



@NgModule({
  declarations: [RangeSliderComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NouisliderModule , MatFormFieldModule],
  exports: [RangeSliderComponent],
})
export class RangeSliderModule { }
