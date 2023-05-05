import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FORGOT_PASSWORD, LOGIN, PROFILE_SETUP, RESET_PASSWORD, RESET_WITH_MOBILE, SIGNUP } from 'src/app/constants/routes';
import { AccountGuard } from 'src/app/guards/account.guard';
import { ProfileGuard } from 'src/app/guards/profile.guard';
import { UserResolverService } from 'src/app/resolvers/user-resolver.service';
import { AccountComponent } from './account.component';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: '', redirectTo: LOGIN.path, pathMatch: 'full'
            },
            {
                path: LOGIN.path,
                loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
                canActivate: [AccountGuard], canLoad: [AccountGuard]
            },
            {
                path: SIGNUP.path,
                loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule),
                canActivate: [AccountGuard], canLoad: [AccountGuard]
            },
            {
                path: FORGOT_PASSWORD.path,
                loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
                canActivate: [AccountGuard], canLoad: [AccountGuard]
            },

            {
                path: `${RESET_PASSWORD.path}/:token/:accountType/:isSuccess`,
                loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule),
                canActivate: [AccountGuard], canLoad: [AccountGuard]
            },
            {
                path: `${RESET_WITH_MOBILE.path}/:mobiletoken`,
                loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule),
                canActivate: [AccountGuard], canLoad: [AccountGuard]
            },
            {
                path: PROFILE_SETUP.path,
                loadChildren: () => import('./profile-setup/profile-setup.module').then(m => m.ProfileSetupModule),
                resolve: { userData: UserResolverService },
                canActivate: [ProfileGuard],
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
