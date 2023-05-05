import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { JOB_PORTAL_TYPE } from "src/app/constants/constant";
import {
  DATETIME_TYPE,
  JOB_STEPS_NAME,
  JOB_STEP_NUMBER,
  PROFILE_STEPS,
} from "src/app/constants/enums";
import {
  cleanData,
  getISOString,
  getUnReferenced,
  updateTimeSlot,
} from "src/app/constants/helper-methods";
import { JOB_EDIT, USER_JOB, USER_JOB_LIST } from "src/app/constants/routes";
import { IPopupData } from "src/app/models/popup";
import { UtilityService } from "src/app/services/utility.service";
import { JobRequestRecievedPopupComponent } from "../popups/job-request-recieved-popup/job-request-recieved-popup.component";
import { JobStepFirstComponent } from "./job-step-first/job-step-first.component";
import { JobStepSecondComponent } from "./job-step-second/job-step-second.component";
import { JobStepThirdComponent } from "./job-step-third/job-step-third.component";
import { JobService } from "./service/job.service";
import { SuccessPopupComponent } from "src/app/modules/common/modules/success-popup/success-popup.component";
import * as moment from "moment";

@Component({
  selector: "app-add-job",
  templateUrl: "./add-job.component.html",
  styleUrls: ["./add-job.component.scss"],
})
export class AddJobComponent implements OnInit, OnDestroy {
  @ViewChild(JobStepFirstComponent) stepFirst: JobStepFirstComponent;
  @ViewChild(JobStepSecondComponent) stepSecond: JobStepSecondComponent;
  @ViewChild(JobStepThirdComponent) stepThree: JobStepThirdComponent;
  currentTabIndex: number = 1;
  isSaveAndExit: boolean = false;
  jobId: string;
  stepsName = JOB_STEPS_NAME;
  profileSteps = PROFILE_STEPS;
  secondStepForm: FormGroup;
  firstStepForm: FormGroup;
  thirdStepForm: FormGroup;
  isJobData: boolean = false;
  jobData: any = "";
  firstData: any = {};
  secondData: any = {};
  thirdData: any = {};
  constructor(
    private _location: Location,
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utility: UtilityService,
    public dialog: MatDialog
  ) {
    this.jobId = this.activatedRoute.snapshot.params.jobId;

  }

  ngOnInit(): void {
    this.jobService.creatForm();
    this.firstStepForm = this.jobService.firstStepForm;
    this.secondStepForm = this.jobService.secondStepForm;
    this.thirdStepForm = this.jobService.thirdStepForm;
    // FOR COPY JOB
    this.getJobDetails(this.utility.isJobCopy.value);
    // FOR EDIT JOB
    if (this.jobId) {
      this.jobService.jobId = this.jobId;
      this.getJobDetails(this.jobId); // for edit job
    }
  }

  ngOnDestroy() {
    this.clearData();
  }

  // If data has 'jobCopyId' key means hv to create a copy job
  // If data has 'isEdit' key true means hv to edit job
  getJobDetails(data: any) {
    if (data) {
      const jobsId = data.jobCopyId ? data.jobCopyId : data;
      this.isJobData = true;
      this.jobService.jobDetail(jobsId).then((response) => {
        delete response.data._id;
        this.utility.setJobCopy("");
        this.jobData = response.data;
        this.jobService.jobDetails = response.data;
        this.isJobData = false;
        if (this.jobId) {
          this.protectPublish();
        }
      });
    }
  }

  ckeckForPublish() {
    console.log(this.jobData, this.jobData?.jobStep == 3, moment().isBefore(this.jobData?.timeline?.startDate))
    if (this.jobData?.jobStep == 3
      && moment().isBefore(this.jobData?.timeline?.startDate)
    ) {
      return true;
    }
    return false;
  }

  protectPublish() {
    this.activatedRoute.queryParams.subscribe(({ currentTabIndex }) => {
      // this.currentTabIndex=currentTabIndex ?? 1;
      // console.log(currentTabIndex==4, this.ckeckForPublish())
      if (currentTabIndex) {
        if (currentTabIndex == 4 && this.ckeckForPublish())
          this.currentTabIndex = 4;
        else {
          // currentTabIndex=1;
          this.router.navigate([JOB_EDIT.fullUrl, this.jobId]);
        }
      }
    })
  }

  previousStep() {
    this.currentTabIndex = this.currentTabIndex - 1;
  }

  nextStep() {
    if (this.currentTabIndex < 5) {
      this.currentTabIndex = this.currentTabIndex + 1;
    }
  }

  get goBack() {
    return history.back();
  }

  onSubmitStepOne() {
    this.firstData = getUnReferenced(this.stepFirst.stepOneformData.value);
    this.nextStep();
  }

  onSubmitStepTwo() {
    this.secondData = getUnReferenced(this.stepSecond.stepTwoformData.value);
    this.onCreateJob({
      ...this.firstData,
      ...this.secondData,
      jobStep: JOB_STEP_NUMBER.STEP_2,
      jobStatus: JOB_PORTAL_TYPE.DRAFT,
    });
  }
  /* --- hv to submit step 3 means final step from job preview page --- */
  onSubmitStepThree() {
    this.thirdData = getUnReferenced(this.stepThree.stepThreeform.value);
    this.thirdData.jobSite.forEach((jobSite) => {
      jobSite.timeSlots.forEach((timeslot) => {
        if (
          !timeslot.additionalAllowance.salary ||
          timeslot.additionalAllowance.salary == ""
        )
          timeslot.additionalAllowance.salary = "0";
      });
    });
    this.thirdData.timeline.endDate = getISOString(
      this.thirdData.timeline.endDate
    );
    this.thirdData.timeline.startDate = getISOString(
      this.thirdData.timeline.startDate
    );
    this.jobService.jobDetails = {
      ...this.jobService.jobDetails,
      ...this.thirdData,
    };
    this.jobData ? (this.jobData = { ...this.jobData, ...this.thirdData }) : "";
    this.nextStep();
  }

  onCreateJob(body) {
    // if (body['jobStep'] == JOB_STEP_NUMBER.STEP_3) {
    //   body = getUnReferenced(body);
    //   // body.jobSite = updateTimeSlot(body.jobSite, DATETIME_TYPE.DATE_TO_TIME);
    // }
    console.log(body);
    this.jobService
      .createJob(body)
      .then((response) => {
        const data = response.data;
        if (
          data["jobStep"] == JOB_STEP_NUMBER.STEP_2 &&
          response.data.jobSite
        ) {
          delete response.data.jobSite;
        }
        this.jobService.jobDetails
          ? (this.jobService.jobDetails = {
            ...this.jobService.jobDetails,
            ...data,
          })
          : (this.jobService.jobDetails = data);
        this.jobData ? (this.jobData = { ...this.jobData, ...data }) : "";
        this.nextStep();
        if (
          (data["jobStatus"] == JOB_PORTAL_TYPE.PUBLISHED ||
            data["jobStatus"] == JOB_PORTAL_TYPE.DRAFT) &&
          data["jobStep"] == 3
        ) {
          this.clearData();
          this.successDialog(data);
        }
      })
      .catch((err) => {
        // console.log(err, "Error");
      });
  }

  onPublish() {
    const body = {
      ...this.thirdData,
      // ...this.jobService.jobDetails,
      jobStep: JOB_STEP_NUMBER.STEP_3,
      jobStatus: JOB_PORTAL_TYPE.DRAFT,
    };

    // ------------- IF PUBLISH JOB STATUS 'DRAFT' ----------- //
    if (this.jobService.isPublishStatus == JOB_PORTAL_TYPE.DRAFT) {
      let data: IPopupData = {
        message: "Are you sure you want to save this job as a draft?",
        hideConfirmButton: true,
        cancelButtonText: "Close",
        confirmButtonText: "Yes",
      };
      this.utility.openDialog(data).subscribe((resp) => {
        if (resp) {
          this.onCreateJob(body);
        }
      });
    }

    // ------------- IF PUBLISH JOB STATUS 'PUBLISHED' ----------- //
    if (this.jobService.isPublishStatus == JOB_PORTAL_TYPE.PUBLISHED) {
      let pdialogRef = this.dialog
        .open(JobRequestRecievedPopupComponent, {
          width: "652px",
          data: this.jobService.jobDetails,
        })
        .afterClosed()
        .subscribe((resp) => {
          if (resp) {
            body.jobStatus = JOB_PORTAL_TYPE.PUBLISHED;
            this.onCreateJob(body);
          }
        });
    }
  }

  successDialog(data) {
    const dialogRef = this.dialog.open(SuccessPopupComponent, {
      width: "400px",
      data: { parent:  data["jobStatus"], body: data},
    });
    dialogRef.afterClosed().subscribe((response) => {
      console.log(response);
      if (response) {
        if (data["jobStatus"] == JOB_PORTAL_TYPE.DRAFT) {
          this.router.navigate([`${USER_JOB_LIST.fullUrl}/3`], {
            queryParams: { page: 1, limit: 10, status: 3 },
          });
        }
        if (data["jobStatus"] == JOB_PORTAL_TYPE.PUBLISHED) {
          this.router.navigate([`${USER_JOB_LIST.fullUrl}/1`], {
            queryParams: { page: 1, limit: 10, status: 1 },
          });
        }
      }
    });
  }

  clearData() {
    this.jobService.jobDetails = "";
    this.jobData = "";
    this.jobService.jobId = "";
    this.firstStepForm.reset();
    this.secondStepForm.reset();
    this.thirdStepForm.reset();
    this.jobService.isBackClick = false;
  }

  // cancel or discard step
  onCancelStep() {
    let data: IPopupData = {
      message:
        "Are you sure you want to cancel. Your unsaved changes will be discarded.",
      hideConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    };
    this.utility.openDialog(data).subscribe((response) => {
      if (response) {
        this.firstStepForm.reset();
        this.secondStepForm.reset();
        this.thirdStepForm.reset();
        this.currentTabIndex = 1;
        this.jobService.jobDetails = {};
        console.log(this._location);

        this._location.back();
      }
    });
  }

  gotoTop() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  updatedStep(edata) {
    console.log(edata);
    if (edata.isBack) {
      this.currentTabIndex = edata.step;
      return;
    } // for step back
    if (edata.isCancel) {
      this.onCancelStep();
      return;
    } // for cancel step and discard changes
    switch (edata ? edata : edata.step) {
      case 1:
        this.onSubmitStepOne();
        break;
      case 2:
        this.onSubmitStepTwo();
        break;
      case 3:
        this.onSubmitStepThree();
        break;
      case 4:
        this.onPublish();
        break;
      default:
        break;
    }
  }
}
