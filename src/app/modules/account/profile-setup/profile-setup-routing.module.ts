import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSetupComponent } from './profile-setup.component';

const routes: Routes = [{ path: '', component: ProfileSetupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSetupRoutingModule { }
