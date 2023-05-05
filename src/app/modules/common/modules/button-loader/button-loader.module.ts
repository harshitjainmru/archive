import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLoaderComponent } from './button-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


@NgModule({
  declarations: [ButtonLoaderComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [ButtonLoaderComponent]
})
export class ButtonLoaderModule { }
