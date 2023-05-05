import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingComponent } from "./setting.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { FaqComponent } from "./faq/faq.component";
import { TermConditionComponent } from "./term-condition/term-condition.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { GetControlModule } from "src/app/pipes/get-control/get-control.module";
import { AccountService } from "src/app/modules/account/account.service";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { SettingsService } from "./settings.service";
import { SafeModule } from "src/app/pipes/safe/safe.module";
import { TabsModule } from "src/app/modules/common/components/tabs/tabs.module";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { USER_SETTING_CHANGE_PASSWORD, USER_SETTING_DELETE_ACCOUNT, USER_SETTING_FAQ, USER_SETTING_NOTIFICATION, USER_SETTING_PRIVACY_POLICY, USER_SETTING_TERMS_CONDITION } from "src/app/constants/routes";
import { NotificationsComponent } from './notifications/notifications.component';
import { DeleteAccountComponent } from "./delete-account/delete-account.component";

const routes: Routes = [
  { path: "", component: SettingComponent, children: [
    { path: "", redirectTo: USER_SETTING_CHANGE_PASSWORD.path, pathMatch: "full" },
    { path: USER_SETTING_CHANGE_PASSWORD.path, component: ChangePasswordComponent },
    { path: USER_SETTING_FAQ.path, component: FaqComponent },
    { path: USER_SETTING_TERMS_CONDITION.path, component: TermConditionComponent },
    { path: USER_SETTING_PRIVACY_POLICY.path, component: PrivacyPolicyComponent },
    { path: USER_SETTING_NOTIFICATION.path, component: NotificationsComponent },
    { path: USER_SETTING_DELETE_ACCOUNT.path, component: DeleteAccountComponent },
  ] },
 
];

@NgModule({
  declarations: [
    SettingComponent,
    FaqComponent,
    TermConditionComponent,
    PrivacyPolicyComponent,
    ChangePasswordComponent,
    NotificationsComponent,
    DeleteAccountComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatExpansionModule,
    ValidationErrorPipeModule,
    MatFormFieldModule,
    GetControlModule,
    MatSlideToggleModule,
    SafeModule,
  ],
  providers: [AccountService, SettingsService],
})
export class SettingModule {}
