import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsoluteRoutingPipe } from './absolute-routing.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AbsoluteRoutingPipe],
  exports: [AbsoluteRoutingPipe]
})
export class AbsoluteRoutingModule { }
