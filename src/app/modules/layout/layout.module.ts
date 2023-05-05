import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScheduleShiftPopupModule } from './header/popups/schedule-shift-popup/schedule-shift-popup.module';
import { MatDialogModule } from '@angular/material/dialog';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DateAgoModule } from 'src/app/pipes/date-ago/date-ago.module';
import { AdminNotificationPopupModule } from './header/popups/admin-notification-popup/admin-notification-popup.module';
import { JobActionPopupModule } from './header/popups/job-action-popup/job-action-popup.module';
import { UnverifiedPopupModule } from '../common/modules/unverified-popup/unverified-popup.module';
import { ImageFallbackModule } from 'src/app/directives/image-fallback/image-fallback.module';
import { QrCodeModule } from '../features/user/qr-code/qr-code.module';


const NOTIFICATION_POPUP=[AdminNotificationPopupModule,ScheduleShiftPopupModule,JobActionPopupModule]
@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MatMenuModule, 
    AbsoluteRoutingModule,
    MatTooltipModule,
    MatDialogModule,
    ScheduleShiftPopupModule,
    RouterModule,
    InfiniteScrollModule,
    DateAgoModule,
    UnverifiedPopupModule,
    ImageFallbackModule,
    QrCodeModule,
    ...NOTIFICATION_POPUP
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule { }
