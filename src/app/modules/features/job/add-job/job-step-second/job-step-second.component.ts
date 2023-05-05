import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective } from "@angular/forms";
import { EXPERIENCE_TYPE, JOB_STEP_NUMBER } from "src/app/constants/enums";
import { VALIDATION_CRITERIA } from "src/app/constants/validation-criteria";
import { IQuildConfig } from "src/app/models/common.interface";
import { UtilityService } from "src/app/services/utility.service";
import { JobService } from "../service/job.service";

@Component({
  selector: "app-job-step-second",
  templateUrl: "./job-step-second.component.html",
  styleUrls: ["./job-step-second.component.scss"],
})
export class JobStepSecondComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirectiveOverride;
  @ViewChild("triggerSubmitRef") triggerSubmitRef: FormGroupDirective;
  secondStepForm: FormGroup;
  LIMIT = VALIDATION_CRITERIA;
  ///
  @Output() step = new EventEmitter();
  JOB_STEP_NUMBER = JOB_STEP_NUMBER;
  // Experience data
  EXPERIENCE_TYPE = EXPERIENCE_TYPE;
  noExperience: boolean = false;
  yesExperience: boolean = false;
  isExperience: boolean = true;
  experienceData: Array<any> = ["", ""];
  skillData: Array<any> = [];
  selectedExperience = [];

  quillInputConfig:IQuildConfig

  @Input() set stepTwoData(data) {
    if (data) {
      this.patchData(data);
    }
  }
  constructor(private jobService: JobService, private utility: UtilityService) {
    this.secondStepForm = this.jobService.secondStepForm;
    // this.createQuillConfig()
    // console.log(this.secondStepForm,this.quillInputConfig)
  }

  createQuillConfig() {
    this.quillInputConfig = {
      control: this.secondStepForm.controls["description"] as FormControl,
      label: "",
    };
  }

  ngOnInit(): void {
    this.setExperience(this.secondStepForm.value.experienceType);
  }

  patchData(data: any) {
    if (this.jobService.isBackClick) {
      return;
    }
    this.jobService.secondStepForm.patchValue(data);
    if (data.experience) {
      this.setExperience(data.experience.type);
    }
    setTimeout(() => {
      this.secondStepForm.markAsDirty();
      this.secondStepForm.markAsTouched();
    }, 0);
  }

  get f() {
    return this.secondStepForm.controls;
  }

  // -----------  EXPERIENCE SECTION ------------ //
  // set experience data when back
  setExperience(data: any = []) {
    if (data) {
      this.experienceData = [];
      data.map((item) => this.experienceData.push(item));
      console.log(this.experienceData);
      this.experienceData[0]
        ? (this.noExperience = true)
        : (this.noExperience = false);
      this.experienceData[1]
        ? (this.yesExperience = true)
        : (this.yesExperience = false);
      this.checkExperience();
    }
  }

  onSelectExperience(event: any = "", type: string = "") {
    if (type === this.EXPERIENCE_TYPE.NO_EXP) {
      event.checked
        ? (this.experienceData[0] = type)
        : (this.experienceData[0] = "");
    }
    if (type === this.EXPERIENCE_TYPE.EXP) {
      event.checked
        ? (this.experienceData[1] = type)
        : (this.experienceData[1] = "");
    }
    this.checkExperience();
  }

  // for validation
  checkExperience() {
    let expnum = 0;
    this.experienceData.forEach((i) => {
      expnum += Number(i);
    });
    expnum == 0 ? (this.isExperience = true) : (this.isExperience = false);
  }
  // -----------  ENDS EXPERIENCE SECTION ------------ //

  // -----------  SKILLS SECTION ------------ //

  getSelectedSkills(item: any = []) {
    this.skillData = item;
  }

  updateSelectedSkills(item: any = []) {
    this.skillData = [];
    item.forEach(({ name, _id }, index, arr) => {
      arr[index] = { name, _id };
      this.skillData.push(arr[index]);
    });
  }

  onSubmit() {}

  onBack() {
    this.jobService.isBackClick = true;
    this.step.emit({ step: JOB_STEP_NUMBER?.STEP_1, isBack: true });
  }
  onCancelStep() {
    this.step.emit({ step: this.JOB_STEP_NUMBER.STEP_3, isCancel: true });
  }

  onNextSubmit() {
    this.triggerSubmitRef.onSubmit(undefined);
    if (this.secondStepForm.invalid) {
      return;
    }
    this.onSelectExperience();
    if (this.isExperience) {
      this.utility.showAlert("Experience is required");
      return;
    }
    const formData = this.secondStepForm.value;
    delete formData.skills;
    this.updateSelectedSkills(this.skillData);
    formData["skills"] = this.skillData;
    formData.experienceType = this.experienceData;
    this.jobService.isBackClick = false;
    this.step.emit(JOB_STEP_NUMBER.STEP_2);
  }

  get stepTwoformData() {
    this.formGroupDirective.submitted = true;
    return this.secondStepForm;
  }
}

export class FormGroupDirectiveOverride extends FormGroupDirective {
  submitted: boolean;
}
