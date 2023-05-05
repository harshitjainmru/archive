import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsComponent } from './jobs.component';

const routes: Routes = [
  { path: '', component: JobsComponent },
  {
    path: 'job-details',
    loadChildren: () => import('./job-details/job-details.module').then(m => m.JobDetailsModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
