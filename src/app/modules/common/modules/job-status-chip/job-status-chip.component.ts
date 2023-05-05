import { Component, Input, OnInit } from "@angular/core";
import { JOB_STATUS, JOB_STATUS_COLORS } from "src/app/constants/constant";

@Component({
  selector: "app-job-status-chip",
  templateUrl: "./job-status-chip.component.html",
  styleUrls: ["./job-status-chip.component.scss"],
})
export class JobStatusChipComponent implements OnInit {
  @Input() status;
  statusColors = JOB_STATUS_COLORS;
  constructor() {}

  ngOnInit(): void {}
}
