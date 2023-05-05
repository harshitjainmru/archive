import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DATE_FORMATS } from "src/app/constants/constant";
import { FormService } from "src/app/services/form.service";
import { UtilityService } from "src/app/services/utility.service";
import { ApplicantService } from "../../applicant/applicant.service";


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
    this.today = new Date(this.data.jobDetails.timeline.startDate) < new Date() ? new Date(new Date().getTime() + (1000 * 60 * 60 * 24)) : new Date(this.data.jobDetails.timeline.startDate);
    this.baseSalary = this.data.jobDetails.baseSalary.salary;
    this.endDateString = this.data.jobDetails.timeline.endDate;
    this.contractForm = this.createContractForm();
    this.handleJobSites();
    this.contractForm.patchValue({
      // startDate: new Date(this.data.jobDetails.timeline.startDate) < new Date() ? new Date(new Date().getTime() + (1000 * 60 * 60 * 24)) : new Date(this.data.jobDetails.timeline.startDate),
      startDate: new Date(this.data.jobDetails.timeline.startDate)
    });
  }
  ngOnInit(): void { }

  handleJobSites() {
    // if (this.data.applicant.preferredJobSite) {
    //   this.jobSites.push(this.data.applicant.preferredJobSite);
    // }
    if (this.data?.jobDetails?.jobSite) {
      this.jobSites.push(this.data.jobDetails);
      this.jobSites = [...this.data.jobDetails.jobSite]
    }
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
    if (this.contractForm.valid) {
      try {
        const applyIds = await this.sendOffer(this.data["userIdArray"]);
        if(applyIds){
          const payload = {
            ...this.contractForm.value,
            jobApplicationIds: applyIds,
            jobId: this.data.jobDetails._id,
            // previousState:this.data.previousState
          };
  
          if(this.data?.isFromInvite){
            payload['isFromInvite']=true;
          }
          
          console.log(payload);
  
  
          const { data } = await this.applicantService.MakeOffer(payload);
          this.utilityService.showAlert("Job offer sent successfully.", 4000);
          this.dialogRef.close(true);
        }
      } catch (error) { }
    }
  }

  async sendOffer(applicantIdArray) {
    try {
      const payload = {
        userId: applicantIdArray,
        jobId: this.data['jobDetails']._id,
      };
      const res = await this.applicantService.sendOffer(payload);
      return res?.data.reduce((acc, curr) => {
        acc.push(curr._id);
        return acc;
      }, []);
    } catch (error) { }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
