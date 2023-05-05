import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerListComponent } from './worker-list.component';
import { Routes, RouterModule } from '@angular/router';
import { WorkerService } from '../service/worker.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WorkerCardModule } from '../worker-card/worker-card.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchWorkerModule } from '../search-worker/search-worker.module';


const routes: Routes = [
  {
    path: "",
    component: WorkerListComponent
  }
];



@NgModule({
  declarations: [WorkerListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    WorkerCardModule,
    MatChipsModule,
    MatPaginatorModule,
    SearchWorkerModule
  ],
  providers: [WorkerService]
})
export class WorkerListModule { }
