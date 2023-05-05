import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobListComponent } from "./job-list.component";
import { Routes, RouterModule } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";
import { JobCardModule } from "../job-card/job-card.module";
import { JobListService } from "./job-list.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JobManagementFilterModule } from "src/app/modules/common/modules/job-management-filter/job-management-filter.module";
import { CommonSearchModule } from "src/app/modules/common/modules/common-search/common-search.module";
import { NoRecordModule } from "src/app/modules/common/modules/no-record/no-record.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { AbsoluteRoutingModule } from "src/app/pipes/absolute-routing/absolute-routing.module";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { StylePaginatorModule } from "src/app/directives/style-paginator/style-paginator.module";
import { TabsModule } from "src/app/modules/common/components/tabs/tabs.module";
import { MatRadioModule } from "@angular/material/radio";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ShiftPopupModule } from "./shift-popup/shift-popup.module";
import { EmptyStatePipeModule } from "src/app/pipes/empty-state-pipe/empty-state-pipe.module";

const routes: Routes = [
  {
    path: "",
    component: JobListComponent,
  },
];

const CUSTOM_MODULES = [
  TabsModule,
  NoRecordModule,
  CommonSearchModule,
  TabsModule,
  ShiftPopupModule,
];

const MATERIAL = [
  MatSelectModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatTooltipModule,
];

const PIPES = [AbsoluteRoutingModule,EmptyStatePipeModule];

@NgModule({
  declarations: [JobListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    JobCardModule,
    ReactiveFormsModule,
    FormsModule,
    JobManagementFilterModule,
    StylePaginatorModule,
    ...MATERIAL,
    ...CUSTOM_MODULES,
    ...PIPES,
    StylePaginatorModule,
  ],
  providers: [JobListService],
})
export class JobListModule {}
