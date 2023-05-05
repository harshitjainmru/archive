import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DATE_FORMATS } from "src/app/constants/constant";
import { FormService } from "src/app/services/form.service";
import { UtilityService } from "src/app/services/utility.service";
import { ApplicantService } from "../../applicant.service";

@Component({
  selector: "app-create-contract-popup",
  templateUrl: "./create-contract-popup.component.html",
  styleUrls: ["./create-contract-popup.component.scss"],
})
export class CreateContractPopupComponent implements OnInit {
  panelOpenState = false;
  today = new Date();
  jobSites: Array<any> = [];
  dFormat = DATE_FORMATS;
  baseSalary;
  endDateString;
  contractForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,

    private applicantService: ApplicantService,
    private utilityService: UtilityService
  ) {
    this.today = new Date(this.data.jobDetails.timeline.startDate) < new Date() ? new Date(new Date().getTime() + (1000 * 60 * 60 * 24))  : new Date(this.data.jobDetails.timeline.startDate);
    this.baseSalary = this.data.jobDetails.baseSalary.salary;
    this.endDateString = this.data.jobDetails.timeline.endDate;
    this.contractForm = this.createContractForm();
    this.handleJobSites();
    console.log(new Date(this.data.jobDetails.timeline.startDate) < new Date(),new Date(this.data.jobDetails.timeline.startDate),new Date(new Date().getTime() + (1000 * 60 * 60 * 24)))
    this.contractForm.patchValue({
      // startDate: new Date(this.data.jobDetails.timeline.startDate) < new Date() ? new Date(new Date().getTime() + (1000 * 60 * 60 * 24))  : new Date(this.data.jobDetails.timeline.startDate),
      startDate: new Date(this.data.jobDetails.timeline.startDate)
    });
  }
  ngOnInit(): void {}

  handleJobSites() {
    if (this.data.applicant.preferredJobSite) {
      this.jobSites.push(this.data.applicant.preferredJobSite);
    }
    console.log(this.data.jobDetails);
    this.data.jobDetails.jobSite.forEach((element) => {
      this.jobSites.push(element);
    });

    // console.log(this.jobSites)

    this.jobSites = this.jobSites.reduce((unique, o) => {
      if (!unique.some((obj) => obj._id === o._id)) {
        unique.push(o);
      }
      return unique;
    }, []);

    // console.log(this.jobSites);
    let idx = this.jobSites.findIndex(
      (item) => item._id == this.data.applicant?.preferredJobSite?._id
    );
    if (idx >= 0) {
      this.jobSites[idx].address.preferred = true;
    }
  }

  createContractForm() {
    return this.fb.group({
      startDate: ["", [Validators.required]],
      jobSiteId: ["", [Validators.required]],
      // jobApplicationId: ["", [Validators.required]],
    });
  }

  get selectedJobSite() {
    return this.jobSites.find(
      (item) => item._id == this.contractForm.get("jobSiteId").value
    );
  }

  async sendContract() {
    console.log(this.data["applyId"]);
    // debugger
    const jobApplicationId = this.data["applyId"]
      ? this.data["applyId"]
      : this.data.applicant._id;
    if (this.contractForm.valid) {
      const payload = {
        ...this.contractForm.value,
        jobApplicationId: jobApplicationId,
        jobId: this.data.jobDetails._id,
        previousState:this.data.previousState
      };
      console.log(payload);
      // return;

      try {
        const { data } = await this.applicantService.sendContract(payload);
        this.utilityService.showAlert("Job offer sent successfully.", 4000);
        this.dialogRef.close(true);
      } catch (error) {}
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
