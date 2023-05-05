import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLoaderComponent } from './data-loader.component';

@NgModule({
  declarations: [DataLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [DataLoaderComponent]
})
export class DataLoaderModule { }
