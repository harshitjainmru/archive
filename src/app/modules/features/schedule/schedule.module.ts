import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScheduleComponent } from "./schedule.component";
import { Router, RouterModule, Routes } from "@angular/router";
import { SCHEDULE_SIFT } from "src/app/constants/routes";

const routes: Routes = [
  {
    path: "",
    component: ScheduleComponent,
    children: [
      {
        path: "",
        redirectTo: SCHEDULE_SIFT.path,
        pathMatch: "full",
      },
      {
        path: SCHEDULE_SIFT.path,
        loadChildren: () =>
          import("./schedule-shift/schedule-shift.module").then(
            (m) => m.ScheduleShiftModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ScheduleComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ScheduleModule {}
