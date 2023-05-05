import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CONDITION_LINKS } from "src/app/constants/constant";
import { CreateRequestComponent } from "../../../user/request-module/create-request/create-request.component";
import { JobService } from "../../add-job/service/job.service";

@Component({
  selector: "app-job-request-recieved-popup",
  templateUrl: "./job-request-recieved-popup.component.html",
  styleUrls: ["./job-request-recieved-popup.component.scss"],
})
export class JobRequestRecievedPopupComponent implements OnInit {
  minRange: number = 0;
  maxRange: number = 0;
  agreeTnC: boolean = false;
  links = CONDITION_LINKS;
  constructor(
    private dialogRef: MatDialogRef<JobRequestRecievedPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobService: JobService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.calculateRanges();
    console.log(this.data, this.jobService.jobDetails);
  }

  onClick(status: boolean = false) {
    this.dialogRef.close(status);
  }

  openRequest() {
    const dialogRef = this.dialog.open(CreateRequestComponent, {
      width: "800px",
      autoFocus: false,
      disableClose: true,
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        // this.getRequestList();
      }
    });
  }

  calculateRanges() {
    const { workingHours, baseSalary, jobSite } = this.data;
    const hours = +workingHours.hours;
    const basePay = +baseSalary.salary;
    let additionalAllowances = [];
    jobSite.forEach((element) => {
      additionalAllowances = [
        ...element.timeSlots.map(
          (item) => +item.additionalAllowance.salary ?? 0
        ),
      ];
      let minAllowance = Math.min(...additionalAllowances);
      let maxAllowance = Math.max(...additionalAllowances);
      console.log(minAllowance, maxAllowance);

      this.minRange =
        this.minRange +
        hours * element.noOfWorkers * (basePay + minAllowance) +
        0.18 * (hours * element.noOfWorkers * (basePay + minAllowance));
      this.maxRange =
        this.maxRange +
        hours * element.noOfWorkers * (basePay + maxAllowance) +
        0.18 * (hours * element.noOfWorkers * (basePay + maxAllowance));
      console.log(this.minRange, this.maxRange);
    });

    // this.minEstimate =
    //   hours * (basePay + minAllowance) +
    //   0.18 * (hours * (basePay + minAllowance));
    // this.maxEstimate =
    //   hours * (basePay + maxAllowance) +
    //   0.18 * (hours * (basePay + maxAllowance));
  }
}
