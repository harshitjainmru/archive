import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentActivityComponent } from './recent-activity.component';



@NgModule({
  declarations: [RecentActivityComponent],
  imports: [
    CommonModule
  ],
  exports: [RecentActivityComponent]
})
export class RecentActivityModule { }
