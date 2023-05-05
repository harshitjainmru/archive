import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TIMESHEET_LIST } from "src/app/constants/routes";

import { TimesheetComponent } from "./timesheet.component";
import { TIMESHEET_STATUS } from 'src/app/constants/enums';

const routes: Routes = [
  {
    path: "",
    component: TimesheetComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: `${TIMESHEET_LIST.path}/${TIMESHEET_STATUS.UNAPPROVED}`,
      },
      {
        path: `${TIMESHEET_LIST.path}/:status`,
        loadChildren: () =>
          import("./timesheet-list/timesheet-list.module").then(
            (m) => m.TimesheetListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimesheetRoutingModule {}
