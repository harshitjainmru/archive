import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpDirective } from './otp.directive';



@NgModule({
  declarations: [OtpDirective],
  imports: [
    CommonModule
  ],
  exports: [OtpDirective]
})
export class OtpDirectiveModule { }
