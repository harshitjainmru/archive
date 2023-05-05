import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import * as moment from "moment";
import { JOB_PORTAL_TYPE } from "src/app/constants/constant";
import { JOB_STEP_NUMBER } from "src/app/constants/enums";
import { USER_JOB_LIST } from "src/app/constants/routes";
import { VALIDATION_CRITERIA } from "src/app/constants/validation-criteria";
import { IPopupData } from "src/app/models/popup";
import { RoleSalaryPipe } from "src/app/pipes/role-salary-pipe/role-salary.pipe";
import { UserProfileService } from "src/app/services/user-profile.service";
import { UtilityService } from "src/app/services/utility.service";
import { JobService } from "../service/job.service";

@Component({
  selector: "app-job-step-third",
  templateUrl: "./job-step-third.component.html",
  styleUrls: ["./job-step-third.component.scss"],
})
export class JobStepThirdComponent implements OnInit {
  maxTimeSlot = 4;
  maxJobSite = 15;
  isAddress: boolean = false;
  // ///////////////////////
  JOB_STEP_NUMBER = JOB_STEP_NUMBER;
  JOB_STATUS = JOB_PORTAL_TYPE;
  LIMIT = VALIDATION_CRITERIA;
  thirdStepForm: FormGroup;
  // DATE  ////////////////
  todayDate = new Date();
  nextDay = new Date();
  countryData: any = {};
  maxStartDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 2,
    new Date().getDate()
  );
  fromDate: any;
  maxFromDate: any;
  minEstimate: number = 0;
  maxEstimate: number = 0;
  selectedJobRole;
  startAt = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    9,
    0
  );

  endAt = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    14,
    0
  );
  oldJobData;
  @ViewChild("endtDate") endtDate: MatDatepicker<Date>;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirectiveOverride;
  @ViewChild("triggerSubmitRef") triggerSubmitRef: FormGroupDirective;
  @Output() step = new EventEmitter();
  @Input() set stepThreeData(data) {
    if (data) {
      // this.patchData(data);
      this.oldJobData = data;
    }
  }
  constructor(
    private jobService: JobService,
    private utility: UtilityService,
    private profileService: UserProfileService,
    private router: Router
  ) {
    this.selectedJobRole = this.jobService.selectedJobRole;
    this.nextDay.setDate(this.todayDate.getDate() + 1);
    const salaryPipe = new RoleSalaryPipe(utility);
    const minSalary = salaryPipe.transform(this.selectedJobRole, "min");
    // this.thirdStepForm = this.jobService.thirdStepForm;

    this.thirdStepForm = this.jobService.createThirdStepForm(minSalary);
    this.countryData = this.profileService.countryInfo;
    // console.log(this.countryData);
    this.calculateEstimate();
    // this.userId = this.jobService.jobDetails.user._id;
  }

  ngOnInit(): void {
    // this.thirdStepForm.patchValue({});
    if (this.oldJobData) {
      this.patchData(this.oldJobData);
    }
    // console.log(this.countryData);
  }

  calculateEstimate() {
    this.thirdStepForm.valueChanges.subscribe((data) => {
      // console.log(data);

      const { workingHours, baseSalary, jobSite } = data;
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

      // console.log(minAllowance, maxAllowance);

      // console.log(hours, basePay);

      this.minEstimate =
        hours * (basePay + minAllowance) +
        0.18 * (hours * (basePay + minAllowance));
      this.maxEstimate =
        hours * (basePay + maxAllowance) +
        0.18 * (hours * (basePay + maxAllowance));
    });
  }

  patchData(data: any) {
    if (this.jobService.isBackClick) {
      return;
    }

    for (let index = 0; index < data.jobSite.length - 1; index++) {
      this.jobSiteCtrl.push(this.jobService.createJobSite());
    }
    for (
      let jobSiteIndex = 0;
      jobSiteIndex < data.jobSite.length;
      jobSiteIndex++
    ) {
      // console.log("length", data.jobSite[jobSiteIndex].timeSlots.length);

      for (
        let index = 0;
        index < data.jobSite[jobSiteIndex].timeSlots.length - 1;
        index++
      ) {
        this.timeSlots(jobSiteIndex).push(this.jobService.createTimeSlot());
        // console.log("pushed", index);
      }
      this.jobSiteCtrl.at(jobSiteIndex).patchValue(data.jobSite[jobSiteIndex]);
    }
    // console.log("timeline", data.timeline);
    if (data.baseSalary && data.workingHours) {
      this.thirdStepForm.patchValue({
        baseSalary: data.baseSalary,
        workingHours: data.workingHours,
      });
      this.thirdStepForm.get("baseSalary").markAllAsTouched();
    }
    if (data.timeline) {
      // console.log("came", new Date(data.timeline.startDate));
      const startDate = new Date(data.timeline.startDate);
      const endDate = new Date(data.timeline.endDate);

      const tomorrow = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1,
        23,
        59,
        59,
        999
      );
      const dayAfterTomorrow = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 2,
        23,
        59,
        59,
        999
      );

      this.thirdStepForm.patchValue({
        timeline: {
          startDate: startDate < new Date() ? tomorrow : startDate,
          endDate: endDate < new Date() ? dayAfterTomorrow : endDate,
        },
      });
      this.thirdStepForm.get("timeline").markAllAsTouched();

      let minToDate = new Date(data.timeline.startDate);

      //min to date has passed
      if (minToDate < new Date()) {
        const today = new Date();
        this.fromDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1,
          23,
          59,
          59,
          999
        );
        console.log(minToDate, this.fromDate);

        this.maxFromDate = new Date(
          today.getFullYear(),
          today.getMonth() + 3,
          today.getDate(),
          23,
          59,
          59,
          999
        );
      } else {
        console.log("23321313");
        this.fromDate = new Date(
          minToDate.getFullYear(),
          minToDate.getMonth(),
          minToDate.getDate(),
          0,
          0,
          0,
          0
        );
        console.log(minToDate, this.fromDate);

        this.maxFromDate = new Date(
          minToDate.getFullYear(),
          minToDate.getMonth() + 3,
          minToDate.getDate(),
          23,
          59,
          59,
          999
        );
      }
      // console.log(this.thirdStepForm.value);
    }
    if(data.vacancies){
      this.thirdStepForm.patchValue({vacancies:data.vacancies})
      this.thirdStepForm.get("vacancies").markAllAsTouched();
    }
    setTimeout(() => {
      this.thirdStepForm.markAsDirty();
      this.thirdStepForm.markAsTouched();
    }, 1000);

    // this.timelineCtrl.controls.startDate.patchValue(

    // );
    // this.timelineCtrl.controls.endDate.patchValue(

    // );
    // if (data.timeline) {
    //   if (new Date(data.timeline.startDate) >= this.todayDate) {
    //     this.timelineCtrl.controls.startDate.patchValue(
    //       new Date(data.timeline.startDate)
    //     );
    //     this.timelineCtrl.controls.endDate.patchValue(
    //       new Date(data.timeline.endDate)
    //     );
    //   } else {
    //     this.timelineCtrl.controls.startDate.patchValue("");
    //     this.timelineCtrl.controls.endDate.patchValue("");
    //   }
    // }
  }

  // //////////// add job site /////////////
  get f() {
    return this.thirdStepForm.controls;
  }

  get getJobSites() {
    return this.thirdStepForm.get("jobSite") as FormArray;
  }

  addJobSite() {
    this.getJobSites.push(this.jobService.createJobSite());
  }

  removeJobSite(index) {
    const dialogData: IPopupData = {
      message: "Are you sure you want to remove this job site ?",
      hideConfirmButton: true,
    };
    this.utility.openDialog(dialogData).subscribe((data) => {
      if (data) {
        this.getJobSites.removeAt(index);
      }
    });
  }

  // //////////// add time slot /////////////

  timeSlots(index) {
    const jobSites = this.thirdStepForm.get("jobSite") as FormArray;
    return jobSites.at(index).get("timeSlots") as FormArray;
  }

  addTimeSlot(index) {
    this.timeSlots(index).push(this.jobService.createTimeSlot());
  }

  removeTimeSlot(jIndex: number, tIndex: number) {
    const dialogData: IPopupData = {
      message: "Are you sure you want to remove this timeslot ?",
      hideConfirmButton: true,
    };
    this.utility.openDialog(dialogData).subscribe((data) => {
      if (data) {
        this.timeSlots(jIndex).removeAt(tIndex);
      }
    });
  }

  // //////////// add time slot /////////////

  toDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log("date changed", event);

    let dateValue = event.value;
    let minToDate = new Date(dateValue);
    this.fromDate = new Date(
      minToDate.getFullYear(),
      minToDate.getMonth(),
      minToDate.getDate()
    );
    this.maxFromDate = new Date(
      minToDate.getFullYear(),
      minToDate.getMonth() + 3,
      minToDate.getDate()
    );
    this.endtDate.open();
  }

  // //////////// form controls ////////////////

  get timelineCtrl() {
    return this.thirdStepForm.get("timeline") as FormGroup;
  }

  get vacancyCtrl() {
    return this.thirdStepForm.get("vacancies") as FormControl;
  }

  get salaryCtrl() {
    return this.thirdStepForm.get("baseSalary") as FormGroup;
  }
  get jobSiteCtrl(): FormArray {
    return this.thirdStepForm.get("jobSite") as FormArray;
  }

  get workingHoursCtrl() {
    return this.thirdStepForm.get("workingHours") as FormGroup;
  }

  locationsByIndexSubControls(
    timeIndex: number,
    jobSiteIndex: number,
    ctr: any
  ): FormControl {
    const jobSites = this.thirdStepForm.get("jobSite") as FormArray;
    const timeslot = jobSites.at(jobSiteIndex).get("timeSlots") as FormArray;
    return timeslot.controls[timeIndex]["controls"][ctr];
  }

  jobSiteStartTimeChange(event: any, timeIndex, jobSiteIndex: any) {
    if (event) {
      let time = new Date(event.value);
      this.locationsByIndexSubControls(
        timeIndex,
        jobSiteIndex,
        "endTime"
      ).setValue(new Date(time.setMinutes(time.getMinutes() + 240)));
    }
  }
  // 900000 = 15 minutes; 900000*4*4 = 4 hours
  jobSiteEndTimeChange(
    event: any,
    startHour: any,
    timeIndex: number,
    jobSiteIndex: any
  ) {
    // console.log(startHour);
    if (+event.value - +startHour < 900000 * 4 * 4) {
      let time = new Date(
        this.locationsByIndexSubControls(
          timeIndex,
          jobSiteIndex,
          "startTime"
        ).value
      );
      this.locationsByIndexSubControls(
        timeIndex,
        jobSiteIndex,
        "endTime"
      ).setValue(new Date(time.setMinutes(time.getMinutes() + 240)));

      this.utility.showAlert(
        "Set 4 hour time interval from the start time.",
        5000
      );
      return;
    }
  }

  onSubmit() {
    // // console.log(this.thirdStepForm.value);
  }
  onBack() {
    this.jobService.isBackClick = true;

    this.step.emit({ step: JOB_STEP_NUMBER?.STEP_2, isBack: true });
  }
  onCancelStep() {
    // this.router.navigate([`${USER_JOB_LIST.fullUrl}/list/3`], {
    //   queryParams: { page: 1, limit: 10, status: 3 },
    // });
    this.step.emit({ step: this.JOB_STEP_NUMBER.STEP_3, isCancel: true });
  }

  get stepThreeform() {
    this.formGroupDirective.submitted = true;
    return this.thirdStepForm;
  }

  ////

  onNextSubmit() {
    const { jobSite }: { jobSite: Array<any> } = this.thirdStepForm.value;
    let count = 0;
    jobSite.forEach((site) => {
      count = count + parseInt(site.noOfWorkers);
    });
    // this.thirdStepForm.get("vacancies").setValue(count)
    // if (parseInt(this.jobService.jobDetails.vacancies) !== count) {
    //   this.utility.dialogAlert(
    //     `Total worker required on job sites should be equal to number of worker required in job i.e.

    //     ${this.jobService.jobDetails.vacancies}.`,
    //     false,
    //     "Error In Previewing Job"
    //   );

    //   return;
    // }
    if (parseInt(this.thirdStepForm.get("vacancies").value) !== count) {
      this.utility.dialogAlert(
        `Total worker required on job sites should be equal to number of worker required in job i.e.

        ${this.thirdStepForm.get("vacancies").value}.`,
        false,
        "Error In Previewing Job"
      );

      return;
    }
    // if (this.thirdStepForm.get("vacancies").value>99) {
    //   this.utility.dialogAlert(
    //     `Total worker required on job sites should be less then 
    //     100.`,
    //     false,
    //     "Error In Previewing Job"
    //   );

    //   return;
    // }
    this.triggerSubmitRef.onSubmit(undefined);
    // console.log(this.thirdStepForm.invalid);
    // console.log(this.thirdStepForm.value);
    if (this.thirdStepForm.invalid) {
      return;
    }

    this.jobService.isBackClick = false;
    this.step.emit(JOB_STEP_NUMBER.STEP_3);
  }

  printForm() {
    // console.log(this.thirdStepForm);
  }

  endDateChanged(event) {
    console.log(event);

    let dateValue: Date = event.value;

    dateValue.setHours(23);
    dateValue.setMinutes(59);
    dateValue.setSeconds(59);
    dateValue.setMilliseconds(999);
    this.thirdStepForm.get("timeline").get("endDate").setValue(dateValue);
    console.log(dateValue);
  }
} // end of job step third component

export class FormGroupDirectiveOverride extends FormGroupDirective {
  submitted: boolean;
}
