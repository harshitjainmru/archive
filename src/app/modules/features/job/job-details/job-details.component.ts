import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JobListService } from "../job-list/job-list.service";
import { POPUP_MESSAGES } from "src/app/constants/messages";
import { UtilityService } from "src/app/services/utility.service";
import { DATE_FORMATS, JOB_PORTAL_TYPE } from "src/app/constants/constant";
import {
  CONFIRM_MODAL_TYPE,
  EXPERIENCE_TYPE,
  JOB_CANCEL_PAUSE,
} from "src/app/constants/enums";
import {
  APPLICANT,
  APPLICANT_LIST,
  JOB_ADD,
  JOB_EDIT,
} from "src/app/constants/routes";
import { TranslateService } from "src/app/services/translate.service";

import { IPopupData } from "src/app/models/popup";

@Component({
  selector: "app-job-details",
  templateUrl: "./job-details.component.html",
  styleUrls: ["./job-details.component.scss"],
})
export class JobDetailsComponent implements OnInit {
  jobId;

  activeJob;
  dFormat = DATE_FORMATS;
  experienceType = EXPERIENCE_TYPE;
  minEstimate: number = 0;
  maxEstimate: number = 0;
  jobStatus = JOB_PORTAL_TYPE;
  pauseCanelEnum = JOB_CANCEL_PAUSE;

  constructor(
    private route: ActivatedRoute,
    private jobListService: JobListService,
    private router: Router,
    private utility: UtilityService
  ) {
    this.jobId = this.route.snapshot.paramMap.get("jobId");
  }

  ngOnInit(): void {
    this.jobId && this.fetchJobDetail();
  }
  calculateEstimate() {
    const { workingHours, baseSalary, jobSite } = this.activeJob;
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

  fetchJobDetail() {
    this.jobListService.jobDetailRequest(this.jobId).then((res) => {
      const { data } = res;
      this.activeJob = data;
      this.calculateEstimate();
    });
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

  editJobDetail() {
    if (
      this.activeJob.timeline &&
      new Date(this.activeJob.timeline?.startDate) <= new Date()
    ) {
      this.utility.showAlert(
        "Cannot edit this job as it has already started.",
        5000
      );
      return;
    }
    const { _id = "" } = this.activeJob;
    // event.stopPropagation();
    this.router.navigate([JOB_EDIT.fullUrl, _id]);
  }

  jobApplicant(jobId) {
    this.router.navigate([APPLICANT_LIST.fullUrl(jobId)]);
  }

  copyJob(jobId) {
    let data: IPopupData = {
      message: "Are you sure you want to copy this job?",
      hideConfirmButton: true,
      cancelButtonText: "Close",
      confirmButtonText: "Yes",
    };
    this.utility.openDialog(data).subscribe((resp) => {
      if (resp) {
        // this.copyJobEvent.emit(true);
        this.utility.setJobCopy({ jobCopyId: jobId, isCopyJob: true });
        setTimeout(() => {
          this.router.navigate([JOB_ADD.fullUrl]);
        }, 0);
      }
    });
  }

  searchCandidate(jobId) {
    // this.router.navigate([`job/candidate-list/${jobId}`]);
  }

  updateCancelPause(jobId, type) {
    let data: IPopupData = {
      message: TranslateService.data.ARE_YOU_SURE,
      showTextBox: true,
      textBoxType: CONFIRM_MODAL_TYPE.PARAGRAPH,
      textBoxpara:
        this.pauseCanelEnum.CANCEL === type
          ? TranslateService.data.CANCEL_CONFIRM
          : TranslateService.data.PAUSE_CONFIRM,
      hideConfirmButton: true,
      cancelButtonText: "Close",
      confirmButtonText: "Yes",
    };
    try {
      this.utility.openDialog(data).subscribe(async (resp) => {
        if (resp) {
          const body = {
            jobId,
            type,
          };
          const resp = await this.jobListService.updateCancelPauseJob(body);
          if (resp.data) {
            this.utility.showAlert("Status updated successfully !");
            // this.deletJobEvent.emit(true);
            this.fetchJobDetail();
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
