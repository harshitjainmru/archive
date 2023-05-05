import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignContractComponent } from './sign-contract.component';

const routes: Routes = [{ path: '', component: SignContractComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignContractRoutingModule { }
