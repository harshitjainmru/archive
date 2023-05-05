import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JOBS } from 'src/app/constants/routes';

import { StaffingComponent } from './staffing.component';

const routes: Routes = [
  {
    path: "",
    component: StaffingComponent,
    children: [
      // {
      //   path: '', redirectTo: 'jobs', pathMatch: 'full'
      // },
      // {
      //   path: JOBS.path,
      //   loadChildren: () => import("./jobs/jobs.module").then((m) => m.JobsModule),
      // },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffingRoutingModule { }
