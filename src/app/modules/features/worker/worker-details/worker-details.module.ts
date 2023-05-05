import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerDetailsComponent } from './worker-details.component';
import { Routes, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';


const routes: Routes = [
  {
   path: "",
   component: WorkerDetailsComponent 
  }
  ];
  

@NgModule({
  declarations: [WorkerDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatMenuModule
  ]
})
export class WorkerDetailsModule { }
