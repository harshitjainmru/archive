import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetDateRangeModule } from '../../timesheet/timesheet-date-range/timesheet-date-range.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NoRecordModule } from 'src/app/modules/common/modules/no-record/no-record.module';
import { DateRangeSelectionModule } from 'src/app/modules/common/modules/date-range-selection/date-range-selection.module';
import { ArrayOperatorModule } from 'src/app/pipes/array-operator/array-operator.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
const routes: Routes = [
  {
    path: "",
    component: InvoiceListComponent,
  },
];

const MATERIAL = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatTooltipModule,
];

const CUSTOM_MODULES=[
  NoRecordModule
]

const PIPES=[ArrayOperatorModule,CustomDatePipeModule]

@NgModule({
  declarations: [InvoiceListComponent],
  imports: [
    CommonModule,
    // TimesheetDateRangeModule,
    DateRangeSelectionModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    ...MATERIAL,
    ...CUSTOM_MODULES,
    ...PIPES
  ],
})
export class InvoiceListModule { }
