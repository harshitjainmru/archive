import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  DASHBOARD,
  SCHEDULE,
  SCHEDULE_SIFT,
  SHIFT,
  STAFFING,
  USER,
  USER_JOB,
  WORKER,
  CALENDAR,
  APPLICANT,
  TIMESHEET,
  INVOICE,
} from "src/app/constants/routes";
import { FeaturesComponent } from "./features.component";

const routes: Routes = [
  {
    path: "",
    component: FeaturesComponent,
    children: [
      {
        path: "",
        redirectTo: DASHBOARD.path,
        pathMatch: "full",
      },
      {
        path: DASHBOARD.path,
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomeModule),
      },
      {
        path: STAFFING.path,
        loadChildren: () =>
          import("./staffing/staffing.module").then((m) => m.StaffingModule),
      },
      {
        path: USER.path,
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
      },
      {
        path: USER_JOB.path,
        loadChildren: () => import("./job/job.module").then((m) => m.JobModule),
      },
      {
        path: SCHEDULE.path,
        loadChildren: () =>
          import("./schedule/schedule.module").then((m) => m.ScheduleModule),
      },
      {
        path: SHIFT.path,
        loadChildren: () =>
          import("./shift/shift.module").then((m) => m.ShiftModule),
      },

      {
        path: WORKER.path,
        loadChildren: () =>
          import("./worker/worker.module").then((m) => m.WorkerModule),
      },
      {
        path: CALENDAR.path,
        loadChildren: () =>
          import("./calendar/calendar.module").then((m) => m.CalendarModule),
      },
      {
        path: TIMESHEET.path,
        loadChildren: () =>
          import("./timesheet/timesheet.module").then((m) => m.TimesheetModule),
      },
      {
        path: INVOICE.path,
        loadChildren: () =>
          import("./invoice/invoice.module").then((m) => m.InvoiceModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
