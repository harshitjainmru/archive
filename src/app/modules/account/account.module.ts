import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { ProfileGuard } from 'src/app/guards/profile.guard';
import { AccountService } from './account.service';



@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AbsoluteRoutingModule,
  ],
  providers:[ProfileGuard, AccountService]
})
export class AccountModule { }
