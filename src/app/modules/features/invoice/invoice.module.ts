import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { INVOICE_LIST } from 'src/app/constants/routes';
import { TimesheetService } from '../timesheet/timesheet.service';

const routes: Routes = [
  {
    path: "",
    component: InvoiceComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: `${INVOICE_LIST.path}`,
      },
      {
        path: `${INVOICE_LIST.path}`,
        loadChildren: () =>
          import("./invoice-list/invoice-list.module").then(
            (m) => m.InvoiceListModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers:[TimesheetService]
})
export class InvoiceModule { }
