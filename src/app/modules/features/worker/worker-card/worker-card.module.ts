import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerCardComponent } from './worker-card.component';
import { RouterModule } from '@angular/router';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';



@NgModule({
  declarations: [WorkerCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    AbsoluteRoutingModule
  ],
  exports: [WorkerCardComponent]
})
export class WorkerCardModule { }
