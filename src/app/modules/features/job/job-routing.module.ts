import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  APPLICANT,
  APPLICANT_DETAILS,
  JOBS_DETAILS,
  JOB_ADD,
  JOB_EDIT,
  JOB_LIST,
  SEARCH_APPLICANT,
  SEARCH_APPLICANT_LIST,
} from 'src/app/constants/routes';
import { AddjobResolverService } from 'src/app/resolvers/addjob-resolver.service';
import { JobComponent } from './job.component';
import { JOBS_LIST_STATUS } from 'src/app/constants/enums';

// console.log('helloo lissy');

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
    children: [
      {
        path: '',
        redirectTo: `${JOB_LIST.path}/${JOBS_LIST_STATUS.MY_POSTING}`,
        pathMatch: 'full',
      },
      {
        path: `${JOB_LIST.path}/:status`,
        loadChildren: () =>
          import('./job-list/job-list.module').then((m) => m.JobListModule),
      },
      {
        path: JOB_ADD.path,
        loadChildren: () =>
          import('./add-job/add-job.module').then((m) => m.AddJobModule),
        // resolve: { jobData: AddjobResolverService },
      },
      {
        path: `${JOB_EDIT.path}/:jobId`,
        loadChildren: () =>
          import('./add-job/add-job.module').then((m) => m.AddJobModule),
        // resolve: { jobData: AddjobResolverService },
      },
      {
        path: `${JOBS_DETAILS.path}/:jobId`,
        loadChildren: () =>
          import('./job-details/job-details.module').then(
            (m) => m.JobDetailsModule
          ),
      },
      // {
      //   path: `${APPLICANT_LIST.path}/:jobId`,
      //   loadChildren: () => import('./applicant-list/applicant-list.module').then(m => m.ApplicantListModule),
      // },
      {
        path: `${APPLICANT.path}`,
        loadChildren: () =>
          import('./applicant/applicant.module').then((m) => m.ApplicantModule),
      },

      {
        path: `${APPLICANT.path}`,
        loadChildren: () =>
          import('./applicant/applicant.module').then((m) => m.ApplicantModule),
      },

      {
        path: `${SEARCH_APPLICANT.path}`,
        loadChildren: () =>
          import('./applicant/applicant.module').then((m) => m.ApplicantModule),
      },

      // {
      //   path: `${SEARCH_CANDIDATE.path}/:jobId`,
      //   loadChildren: () =>
      //     import('./search-candidate/search-candidate.module').then(
      //       (m) => m.SearchCandidateModule
      //     ),
      // },

      {
        path: `:jobId/${SEARCH_APPLICANT_LIST.path}`,
        loadChildren: () =>
          import(
            './search-applicant/search-applicant-list/search-applicant-list.module'
          ).then((m) => m.SearchApplicantListModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
