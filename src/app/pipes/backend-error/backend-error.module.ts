import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorPipe } from './backend-error.pipe';



@NgModule({
  declarations: [BackendErrorPipe],
  imports: [
    CommonModule
  ],
  exports: [BackendErrorPipe]
})
export class BackendErrorModule { }
