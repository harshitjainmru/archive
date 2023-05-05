import { Component, OnInit } from "@angular/core";
import {
  USER_SETTING_CHANGE_PASSWORD,
  USER_SETTING_DELETE_ACCOUNT,
  USER_SETTING_FAQ,
  USER_SETTING_NOTIFICATION,
  USER_SETTING_PRIVACY_POLICY,
  USER_SETTING_TERMS_CONDITION,
} from "src/app/constants/routes";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"],
})
export class SettingComponent implements OnInit {
  navLinks = [];
  constructor() {}

  ngOnInit(): void {
    this.createNavLinks();
  }

  createNavLinks() {
    this.navLinks = [
      {
        link: `${USER_SETTING_CHANGE_PASSWORD.fullUrl}`,
        label: `Change Password`,
      },
      {
        link: `${USER_SETTING_FAQ.fullUrl}`,
        label: `FAQ's`,
      },
      {
        link: `${USER_SETTING_TERMS_CONDITION.fullUrl}`,
        label: `Terms & Conditions`,
      },
      {
        link: `${USER_SETTING_PRIVACY_POLICY.fullUrl}`,
        label: `Privacy Policy`,
      },
      {
        link: `${USER_SETTING_NOTIFICATION.fullUrl}`,
        label: `Notifications`,
      },
      {
        link: `${USER_SETTING_DELETE_ACCOUNT.fullUrl}`,
        label: `Delete Account`,
      },
    ];
  }
}
