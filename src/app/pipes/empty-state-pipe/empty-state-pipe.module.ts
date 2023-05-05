import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStatePipePipe } from './empty-state-pipe.pipe';



@NgModule({
  declarations: [EmptyStatePipePipe],
  imports: [
    CommonModule
  ],
  exports:[EmptyStatePipePipe]
})
export class EmptyStatePipeModule { }
