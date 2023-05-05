import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnverifiedPopupComponent } from './unverified-popup.component';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [UnverifiedPopupComponent],
  imports: [
    CommonModule,
    AbsoluteRoutingModule,
    RouterModule
  ],
  exports: [UnverifiedPopupComponent]
})
export class UnverifiedPopupModule { }
