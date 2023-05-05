import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./view/home.component";
import { CalendarViewModule } from "../../common/modules/calendar-view/calendar-view.module";
import { RecentActivityModule } from "../../common/modules/recent-activity/recent-activity.module";
import { HomeGraphViewModule } from "./home-graph-view/home-graph-view.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MultiLineGraphComponent } from "./multi-line-graph/multi-line-graph.component";
import { GroupedBarGraphComponent } from "./grouped-bar-graph/grouped-bar-graph.component";
import { HomeService } from "./home.service";
import { HomeStatsComponent } from "./home-stats/home-stats.component";
import { WeeklyCalendarSelectorModule } from "../../common/modules/weekly-calendar-selector/weekly-calendar-selector.module";
import { DisplayMonthModule } from "src/app/pipes/display-month/display-month.module";
import { WeeklyCalenderGraphModule } from "../../common/modules/weekly-calender-graph/weekly-calender-graph.module";
import { MonthlyCalenderGraphModule } from "../../common/modules/monthly-calender-graph/monthly-calender-graph.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";

@NgModule({
  declarations: [
    HomeComponent,
    MultiLineGraphComponent,
    GroupedBarGraphComponent,
    HomeStatsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CalendarViewModule,
    RecentActivityModule,
    HomeGraphViewModule,
    NgxChartsModule,
    WeeklyCalenderGraphModule,
    DisplayMonthModule,
    MonthlyCalenderGraphModule,
    MatProgressSpinnerModule,
    RouterModule,
    AbsoluteRoutingModule
  ],
  providers: [HomeService],
})
export class HomeModule {}
