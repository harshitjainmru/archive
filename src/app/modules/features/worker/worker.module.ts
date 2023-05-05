import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerComponent } from './worker.component';
import { SEARCH_WORKER, WORKER_DETAILS, WORKER_LIST } from 'src/app/constants/routes';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WorkerComponent,
    children: [
      { path: '', redirectTo: WORKER_LIST.path, pathMatch: 'full' },

      {
        path: WORKER_LIST.path,
        loadChildren: () =>
          import('./worker-list/worker-list.module').then(
            (m) => m.WorkerListModule
          ),
      },
      {
        path: WORKER_DETAILS.path,
        loadChildren: () =>
          import('./worker-details/worker-details.module').then(
            (m) => m.WorkerDetailsModule
          ),
      },
      {
        path: SEARCH_WORKER.path,
        loadChildren: () =>
          import('./search-worker/search-worker.module').then(
            (m) => m.SearchWorkerModule
          ),
      },
     
    ],
  },
];


@NgModule({
  declarations: [WorkerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkerModule { }
