import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyImagePipe } from './currency-image.pipe';



@NgModule({
  declarations: [CurrencyImagePipe],
  imports: [
    CommonModule
  ],
  exports:[CurrencyImagePipe]
})
export class CurrencyImageModule { }
