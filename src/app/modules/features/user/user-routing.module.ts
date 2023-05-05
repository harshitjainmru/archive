import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { USER_PROFILE, USER_SETTING } from 'src/app/constants/routes';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      {
        path: '', redirectTo: USER_SETTING.path, pathMatch: 'full'
      },
      {
        path: USER_SETTING.path,
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
      },
      {
        path: USER_PROFILE.path,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
