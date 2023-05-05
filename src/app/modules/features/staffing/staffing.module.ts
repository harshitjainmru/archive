import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffingRoutingModule } from './staffing-routing.module';
import { StaffingComponent } from './staffing.component';


@NgModule({
  declarations: [StaffingComponent],
  imports: [
    CommonModule,
    StaffingRoutingModule
  ]
})
export class StaffingModule { }
