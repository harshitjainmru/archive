import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestDetailsComponent } from './request-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';


const MATERIAL_MODULES = [MatFormFieldModule]

@NgModule({
  declarations: [RequestDetailsComponent],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: [RequestDetailsComponent]
})
export class RequestDetailsModule { }
