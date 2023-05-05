import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftComponent } from './shift.component';
import { Routes, RouterModule } from '@angular/router';
import { ADD_SHIFT, SHIFT_LIST } from 'src/app/constants/routes';


const routes: Routes = [
  {
    path: '',
    component: ShiftComponent,
    children: [
      { path: '', redirectTo: SHIFT_LIST.path, pathMatch: 'full' },

      {
        path: SHIFT_LIST.path,
        loadChildren: () =>
          import('./shift-list/shift-list.module').then(
            (m) => m.ShiftListModule
          ),
      },
      {
        path: ADD_SHIFT.path,
        loadChildren: () =>
          import('./add-shift/add-shift.module').then(
            (m) => m.AddShiftModule
          ),
      }     
    ],
  },
];


@NgModule({
  declarations: [ShiftComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShiftModule { }
