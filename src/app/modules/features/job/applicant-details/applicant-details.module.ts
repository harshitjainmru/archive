import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantDetailsComponent } from './applicant-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileShortlistedModule } from '../popups/profile-shortlisted/profile-shortlisted.module';
import { ScheduleInterviewModule } from '../popups/schedule-interview/schedule-interview.module';
import { TimeOverlapPopupModule } from '../popups/time-overlap-popup/time-overlap-popup.module';
import { WorkerService } from '../../worker/service/worker.service';
import { JobListService } from '../job-list/job-list.service';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';

const routes: Routes = [
  {
   path: "",
   component: ApplicantDetailsComponent 
  }
  ];
  

@NgModule({
  declarations: [ApplicantDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatMenuModule,
    AbsoluteRoutingModule,
    ProfileShortlistedModule,
    ScheduleInterviewModule,
    TimeOverlapPopupModule
  ],
  providers: [WorkerService, JobListService]
})
export class ApplicantDetailsModule { }
