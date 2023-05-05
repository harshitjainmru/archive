import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../settings.service";

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.scss"],
})
export class PrivacyPolicyComponent implements OnInit {
  privacyPolicy;
  constructor(private settings: SettingsService) {
    this.getPrivacyPolicy();
  }

  ngOnInit(): void {}

  async getPrivacyPolicy() {
    const {
      data: { data },
    } = await this.settings.getCmsData(0);
    console.log(data);

    this.privacyPolicy = data;
  }
}
