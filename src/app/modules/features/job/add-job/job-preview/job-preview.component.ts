import { EventEmitter } from "@angular/core";
import { Component, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DATE_FORMATS, JOB_PORTAL_TYPE } from "src/app/constants/constant";
import {
  EXPERIENCE_TYPE,
  JOB_STEP_NUMBER,
  JOB_TYPE,
  PROFILE_STATUS,
} from "src/app/constants/enums";
import { JobService } from "../service/job.service";
import { UserProfileService } from "src/app/services/user-profile.service";

@Component({
  selector: "app-job-preview",
  templateUrl: "./job-preview.component.html",
  styleUrls: ["./job-preview.component.scss"],
})
export class JobPreviewComponent implements OnInit {
  activeJob;
  jobType = JOB_TYPE;
  JOB_STATUS = JOB_PORTAL_TYPE;
  JOB_STEP_NUMBER = JOB_STEP_NUMBER;
  experienceType = EXPERIENCE_TYPE;
  dFormat = DATE_FORMATS;
  // userData;
  minEstimate: number = 0;
  maxEstimate: number = 0;
  userDetails;
  profileUnverified: boolean = false;
  @Output() step = new EventEmitter();
  constructor(
    private jobService: JobService,
    private matDialog: MatDialog,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.activeJob = this.jobService.jobDetails;
    this.calculateEstimate();
    this.userDetails = this.userProfileService.profileData;
    if (
      !this.userDetails ||
      this.userDetails.profileStatus === PROFILE_STATUS.UNVERIFIED ||
      this.userDetails.profileStatus === PROFILE_STATUS.REJECTED
    ) {
      this.profileUnverified = true;
    }
  }

  calculateEstimate() {
    const { workingHours, baseSalary, jobSite } = this.jobService.jobDetails;
    const hours = +workingHours.hours;
    const basePay = +baseSalary.salary;
    let additionalAllowances = [];
    jobSite.forEach((element) => {
      additionalAllowances = [
        ...additionalAllowances,
        ...element.timeSlots.map(
          (item) => +item.additionalAllowance.salary ?? 0
        ),
      ];
    });

    const minAllowance = Math.min(...additionalAllowances);
    const maxAllowance = Math.max(...additionalAllowances);
    this.minEstimate =
      hours * (basePay + minAllowance) +
      0.18 * (hours * (basePay + minAllowance));
    this.maxEstimate =
      hours * (basePay + maxAllowance) +
      0.18 * (hours * (basePay + maxAllowance));
  }

  getPayTypeValue(job) {
    let paid;
    if (job && job.payForWorker === 1) {
      const min = job?.payHourlyRange?.min;
      const max = job?.payHourlyRange?.max;
      paid = `${min || 0}-${max || 0}/hr`;
    } else {
      const fix = job?.payFixed;
      paid = fix ? `${fix}` : 0;
    }
    return paid;
  }

  daysBetween(StartDate: string, EndDate: string) {
    // console.log('StartDate,EndDate', StartDate, EndDate);
    // The number of milliseconds in all UTC days (no DST)
    const startDateNew = new Date(StartDate);
    const endDateNew = new Date(EndDate);
    const oneDay = 1000 * 60 * 60 * 24;
    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC(
      endDateNew.getFullYear(),
      endDateNew.getMonth(),
      endDateNew.getDate()
    );
    const end = Date.UTC(
      startDateNew.getFullYear(),
      startDateNew.getMonth(),
      startDateNew.getDate()
    );
    // so it's safe to divide by 24 hours
    return 1 + (start - end) / oneDay;
  }

  // for edit detail again from step1
  onBack() {
    this.jobService.isBackClick = false;
    this.step.emit({ step: JOB_STEP_NUMBER?.STEP_1, isBack: true });
  }

  onNextSubmit(status: string = "") {
    if (this.profileUnverified && status == this.JOB_STATUS.PUBLISHED) {
      return;
    }
    this.jobService.isPublishStatus = status;
    this.step.emit(this.JOB_STEP_NUMBER.STEP_4);
  }

  onCancelStep() {
    this.step.emit({ step: this.JOB_STEP_NUMBER.STEP_4, isCancel: true });
  }
}
