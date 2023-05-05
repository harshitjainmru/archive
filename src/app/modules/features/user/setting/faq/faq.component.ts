import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../settings.service";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"],
})
export class FaqComponent implements OnInit {
  faqs = [];
  panelOpenState = false;
  constructor(private settings: SettingsService) {
    this.getFaqs();
  }

  ngOnInit(): void {}

  async getFaqs() {
    const { data } = await this.settings.getCmsData(2);
    this.faqs = [...data];
  }
}
