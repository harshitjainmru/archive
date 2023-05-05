import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignContractRoutingModule } from './sign-contract-routing.module';
import { SignContractComponent } from './sign-contract.component';


@NgModule({
  declarations: [SignContractComponent],
  imports: [
    CommonModule,
    SignContractRoutingModule
  ]
})
export class SignContractModule { }
