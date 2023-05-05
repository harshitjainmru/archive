import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftListComponent } from './shift-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ShiftCardModule } from '../shift-card/shift-card.module';
import { CommonSearchModule } from 'src/app/modules/common/modules/common-search/common-search.module';
import { MatTableModule } from '@angular/material/table';
import { ShiftService } from '../service/shift.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditShiftModule } from '../edit-shift/edit-shift.module';
import { ConstantParserModule } from 'src/app/pipes/constant-parser/constant-parser.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonFilterModule } from 'src/app/modules/common/modules/common-filter/common-filter.module';
import { StylePaginatorModule } from 'src/app/directives/style-paginator/style-paginator.module';
import { ShiftManagementFilterModule } from 'src/app/modules/common/modules/shift-management-filter/shift-management-filter.module';
import { JobListService } from '../../job/job-list/job-list.service';


const routes: Routes = [
  {
    path: "",
    component: ShiftListComponent
  }
];


@NgModule({
  declarations: [ShiftListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShiftCardModule,
    CommonSearchModule,
    MatTableModule,
    MatPaginatorModule,
    EditShiftModule,
    ConstantParserModule,
    MatTooltipModule,
    CommonFilterModule,
    StylePaginatorModule,
    ShiftManagementFilterModule
  ],
  providers: [ShiftService, JobListService]
})
export class ShiftListModule { }
