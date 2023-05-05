import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetListComponent } from './timesheet-list.component';

const routes: Routes = [{ path: '', component: TimesheetListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetListRoutingModule { }
