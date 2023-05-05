import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { JOB_STATUS, SESSION_KEYS } from "src/app/constants/constant";
import { CANDIDATE_STATUS, DIALOG_RESPONSE, DROPDOWN_TYPE } from "src/app/constants/enums";
import { FormUtils } from "src/app/constants/form.util";
import { JOB_SKILL } from "src/app/constants/urls";
import { ISearchAutocomplete } from "src/app/models/common.interface";
import { FormService } from "src/app/services/form.service";
import { UserProfileService } from "src/app/services/user-profile.service";
import { UtilityService } from "src/app/services/utility.service";

@Component({
  selector: "app-applicant-filter",
  templateUrl: "./applicant-filter.component.html",
  styleUrls: ["./applicant-filter.component.scss"],
})
export class ApplicantFilterComponent implements OnInit {
  skillData: Array<any> = [];
  status=CANDIDATE_STATUS

  appliedOn = { day: 1, week: 2, month: 3 };
  rating = { one: 1, two: 2, three: 3 };
  experience = { two: 2, four: 4, six: 6, aboveSix: 7 };

  skillsSearchConfig: ISearchAutocomplete = {
    url: JOB_SKILL,
    isPagination: true,
    // control:this.userFilterForm.get('jobArea') as FormControl,
    viewKey: "name",
    valueKey: "_id",
    selectedValue: [],
    selectedViewValue: [],
    placeholder: "Search skills to select...",
  };
  stateSearchUrl = JOB_SKILL;
  stateType = DROPDOWN_TYPE.STATE;
  dialogData:any;

  applicantFilterForm: FormGroup;
  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilityService: UtilityService,
    // private _jobServiceService: JobListService,
    // public jobService: JobService,
    private userProfileService: UserProfileService
  ) {
    this.applicantFilterForm = this.createFilterForm();
    this.dialogData=data;
  }

  get f() {
    return this.applicantFilterForm.controls;
  }

  ngOnInit(): void {
    if (this.data) {
      const filterData = {
        skills: this.data?.skills,
        appliedOn: this.data.appliedOn ? +this.data.appliedOn : "",
        experience: this.data.experience ? +this.data.experience : "",

        rating: this.data.rating ? +this.data.rating : "",

      };

      this.applicantFilterForm.patchValue({ ...filterData });
    }

    let jobAreaSelectedValue,jobAreaSelctedView
    if(this.data.skills){
       jobAreaSelectedValue = this.utilityService.getSessionStorage(
        SESSION_KEYS.APPLICANT_FILTER_SKILLS
      )?.selectedValue;
       jobAreaSelctedView = this.utilityService.getSessionStorage(
        SESSION_KEYS.APPLICANT_FILTER_SKILLS
      )?.selectedViewValue;
    }

    this.skillsSearchConfig = {
      ...this.skillsSearchConfig,
      selectedControl: this.applicantFilterForm.get("skills") as FormControl,
      control: new FormControl(""),
      selectedValue:
        jobAreaSelectedValue && jobAreaSelectedValue.length
          ? jobAreaSelectedValue
          : [],
      selectedViewValue:
        jobAreaSelctedView && jobAreaSelctedView.length
          ? jobAreaSelctedView
          : [],
    };
  }

  createFilterForm() {
    return this.fb.group({
      skills: [""],
      appliedOn: [""],
      rating: [""],
      experience: [""],
    });
  }

  closeDialog() {
    try {
      this.dialogRef.close({
        type: DIALOG_RESPONSE.DISMISS,
      });
    } catch (error) {}
  }

  applyFilter() {
    try {
      const data = this.utilityService.formatData(
        this.applicantFilterForm.value
      );
      this.utilityService.setSessionStorage(
        SESSION_KEYS.APPLICANT_FILTER_SKILLS,
        JSON.stringify({
          selectedValue: this.skillsSearchConfig.selectedValue,
          selectedViewValue: this.skillsSearchConfig.selectedViewValue,
        })
      );

      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.APPLY,
      });
    } catch (error) {}

  }

  reset() {
    try {
      this.applicantFilterForm.reset();
      this.utilityService.clearSessionStorage(
        SESSION_KEYS.APPLICANT_FILTER_SKILLS
      );
      const data = this.utilityService.formatData(
        this.applicantFilterForm.value
      );
      this.dialogRef.close({
        data: FormUtils.parse(data),
        type: DIALOG_RESPONSE.CANCEL,
      });
    } catch (error) {}
  }
}
