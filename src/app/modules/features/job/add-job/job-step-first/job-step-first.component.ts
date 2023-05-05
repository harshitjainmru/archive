import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective } from "@angular/forms";
import { Router } from "@angular/router";
import { JOB_PORTAL_TYPE } from "src/app/constants/constant";
import { JOB_STEP_NUMBER } from "src/app/constants/enums";
import { JOB_LIST, USER_JOB, USER_JOB_LIST } from "src/app/constants/routes";
import { UtilityService } from "src/app/services/utility.service";
import { JobService } from "../service/job.service";

@Component({
  selector: "app-job-step-first",
  templateUrl: "./job-step-first.component.html",
  styleUrls: ["./job-step-first.component.scss"],
})
export class JobStepFirstComponent implements OnInit {
  JOB_STEP_NUMBER = JOB_STEP_NUMBER;
  JOB_STATUS = JOB_PORTAL_TYPE;
  totalJobs: number = 0;
  public firstStepForm: FormGroup;
  jobRoleFilter = {};
  @ViewChild("triggerSubmitRef") triggerSubmitRef: FormGroupDirective;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirectiveOverride;
  @Input() set stepOneData(data) {
    if (data) {
      this.patchData(data);
    }
  }
  @Output() step = new EventEmitter();
  public userData: any;
  public roleData: any;
  constructor(
    private jobService: JobService,
    private utility: UtilityService,
    private _route: Router
  ) {
    this.getTotalJobs();
  }

  ngOnInit(): void {
    this.firstStepForm = this.jobService.firstStepForm;
    this.userData = this.jobService.userData;
    this.jobRoleFilter = {
      businessCategoryId: this.userData.businessCategories[0]._id,
    };
  }
  async getTotalJobs() {
    const {
      data: { total },
    } = await this.jobService.jobListing({ page: 1, limit: 5 });
    this.totalJobs = total;
  }
  patchData(data: any) {
    if (this.jobService.isBackClick) {
      return;
    }
    if (data.jobRole) {
      this.jobService.firstStepForm.controls.jobRoleId.patchValue(
        data.jobRole._id
      );
      setTimeout(() => {
        this.firstStepForm.markAsDirty();
        this.firstStepForm.markAsTouched();
      }, 0);
    }
  }

  // FORM SHORT FUNCTION
  get f() {
    return this.firstStepForm.controls;
  }

  onSubmit() {}
  onCancelStep() {
    this.step.emit({ step: this.JOB_STEP_NUMBER.STEP_3, isCancel: true });
  }

  copyJob() {
    this.utility.setJobCopy({ jobCopyId: "", isCopyJob: true });
    this._route.navigate([`${USER_JOB_LIST.fullUrl}/1`], {
      queryParams: { page: 1, limit: 10, status: 1 },
    });
  }

  get stepOneformData() {
    this.formGroupDirective.submitted = true;
    return this.firstStepForm;
  }

  onNextSubmit() {
    this.triggerSubmitRef.onSubmit(undefined);
    if (this.firstStepForm.invalid) {
      return;
    }
    this.jobService.isBackClick = false;
    this.step.emit(JOB_STEP_NUMBER.STEP_1);
  }

  storeSelectedItem(item) {
    this.jobService.selectedJobRole = item;
    console.log(item);

    console.log(this.jobService.selectedJobRole);
  }
}

export class FormGroupDirectiveOverride extends FormGroupDirective {
  submitted: boolean;
}
