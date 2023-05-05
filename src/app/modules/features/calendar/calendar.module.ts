import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleCalenderModule } from './schedule-calender/schedule-calender.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShiftsSelectionModule } from './shifts-selection/shifts-selection.module';
import { CalendarService } from './calendar.service';
const routes:  Routes = [
  { path: '', component: CalendarComponent}

];


 const CUSTOM_MODULES = [ScheduleCalenderModule, ShiftsSelectionModule]

 const MATERIAL_MODULES = [MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,]

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ...CUSTOM_MODULES,
    ...MATERIAL_MODULES,
  ],
  providers:[CalendarService]

})
export class CalendarModule { }
