import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DATE_FORMATS, JOB_STATUS, PAGE_OPTION_LIMIT } from "src/app/constants/constant";
import { CANDIDATE_STATUS, JOB_CANCEL_PAUSE } from "src/app/constants/enums";
import { APPLICANT_DETAILS, SCHEDULE, SCHEDULE_SIFT } from "src/app/constants/routes";
import { IPopupData } from "src/app/models/popup";
import { RatingReviewPopupComponent } from "src/app/modules/common/modules/rating-review-popup/rating-review-popup.component";
import { CreateRequestComponent } from "src/app/modules/features/user/request-module/create-request/create-request.component";
import { UtilityService } from "src/app/services/utility.service";
import { ApplicantService } from "../../applicant.service";

@Component({
  selector: "app-applicant-card",
  templateUrl: "./applicant-card.component.html",
  styleUrls: ["./applicant-card.component.scss"],
})
export class ApplicantCardComponent implements OnInit {
  applicant = null;
  jobStatus = JOB_STATUS;
  ids: Array<any> = [];
  @Output() openJobOfferPopup = new EventEmitter<any>();
  @Output() updateCount = new EventEmitter<any>();
  @Output() changeStatus = new EventEmitter<any>();
  @Output() withdrawContract = new EventEmitter<any>();

  @Output() routeToDetails = new EventEmitter<any>();

  @Output() addRemove = new EventEmitter<boolean>();
  @Input() set applicantSet(data) {
    this.applicant = data;
  }
  @Output() refreshList = new EventEmitter<boolean>();
  dFormat = DATE_FORMATS;
  candidateStatus = CANDIDATE_STATUS;
  showCheckbox: boolean = false;
  checked: boolean = false;
  @Input() set showSelection(data) {
    this.showCheckbox = data;
  }

  @Input() set selectedIds(data) {
    this.ids = [...data];
  }

  @Input() jobDetails;

  pauseCancelEnum = JOB_STATUS;

  isChecked() {
    return this.ids.indexOf(this.applicant._id) != -1;
  }

  // @Input() set selected(data) {
  //   this.checked = data;
  // }
  constructor(
    private appplicantService: ApplicantService,
    private router: Router,
    private dialog: MatDialog,
    private uility: UtilityService
  ) {}

  ngOnInit(): void {}
  async changeStatusEmit(status: CANDIDATE_STATUS) {
    this.changeStatus.emit({
      ids: [this.applicant._id],
      status,
      previousState: this.applicant.currentApplicationStatus,
      jobId: this.applicant.job._id,
    });

    // this.refreshList.emit(true);
    // this.updateCount.emit(res.data);
  }

  handleCheckbox(event: MatCheckboxChange) {
    this.addRemove.emit(event.checked);
  }

  viewApplicantDetails() {
    if(this.applicant.applicant.status!='deleted'){
    this.routeToDetails.emit({
      applicantId: this.applicant.applicant._id,
      applyId: this.applicant._id,
    });
  }
  }

  updateStatus(status: CANDIDATE_STATUS) {
    const payload = {
      jobId: this.jobDetails._id,
      jobApplicationId: this.applicant._id,
      status: status,
      previousState: this.applicant.currentApplicationStatus,
    };

    const popupData: IPopupData = {
      title: "Are you sure ?",
      message:
        "By doing this action, the worker will no longer be able to see the contract received and the candidate profile goes back to the previous state.",
      confirmButtonText: "Yes",
      hideConfirmButton: true,
    };
    this.uility.openDialog(popupData).subscribe((data) => {
      console.log(data);
      if (data) {
        this.withdrawContract.emit(payload);
      }
    });
  }

  openRatingReviewPopup() {
    const data = { jobDetails: this.jobDetails, applicant: this.applicant };
    const dialogRef = this.dialog.open(RatingReviewPopupComponent, {
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.refreshList.emit(true);
      }
    });
  }

  reportCandidate() {
    const dialogRef = this.dialog.open(CreateRequestComponent, {
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: this.applicant,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // this.refreshList.emit(true);
      }
    });
  }

  viewSchedule(name){
    this.router.navigate([SCHEDULE_SIFT.fullUrl],{queryParams:{workerId:name, ...PAGE_OPTION_LIMIT(10),
      ...this.uility.formatMomentData(this.uility.getISOStartAndEndOfWeek()),}})
    
  }
}
