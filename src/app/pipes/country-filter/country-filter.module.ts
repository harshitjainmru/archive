import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryFilterPipe } from './country-filter.pipe';



@NgModule({
  declarations: [CountryFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [CountryFilterPipe]
})
export class CountryFilterModule { }
