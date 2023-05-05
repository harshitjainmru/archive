import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylePaginationDirective } from './style-pagination.directive';



@NgModule({
  declarations: [StylePaginationDirective],
  imports: [
    CommonModule
  ],
  exports: [StylePaginationDirective]
})
export class StylePaginatorModule { }
