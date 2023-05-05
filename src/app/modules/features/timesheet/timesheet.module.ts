import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TimesheetRoutingModule } from "./timesheet-routing.module";
import { TimesheetComponent } from "./timesheet.component";
import { TimesheetService } from './timesheet.service';

@NgModule({
  declarations: [TimesheetComponent],
  imports: [CommonModule, TimesheetRoutingModule],
  providers:[TimesheetService]
})
export class TimesheetModule {}
