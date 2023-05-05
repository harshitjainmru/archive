import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNotificationPopupComponent } from './admin-notification-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DateAgoModule } from 'src/app/pipes/date-ago/date-ago.module';



@NgModule({
  declarations: [AdminNotificationPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    DateAgoModule
  ],
  exports:[AdminNotificationPopupComponent]
})
export class AdminNotificationPopupModule { }
