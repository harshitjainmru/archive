import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../settings.service";

@Component({
  selector: "app-term-condition",
  templateUrl: "./term-condition.component.html",
  styleUrls: ["./term-condition.component.scss"],
})
export class TermConditionComponent implements OnInit {
  tnc;
  constructor(private settings: SettingsService) {
    this.getPrivacyPolicy();
  }

  ngOnInit(): void {}

  async getPrivacyPolicy() {
    const {
      data: { data },
    } = await this.settings.getCmsData(1);
    console.log(data);

    this.tnc = data;
  }
}
