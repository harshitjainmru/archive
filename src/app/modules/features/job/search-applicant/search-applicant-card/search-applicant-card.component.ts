import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DATE_FORMATS, JOB_PORTAL_TYPE } from "src/app/constants/constant";
import { CANDIDATE_STATUS, JOB_CANCEL_PAUSE } from "src/app/constants/enums";
import { UtilityService } from "src/app/services/utility.service";
import { CreateRequestComponent } from "../../../user/request-module/create-request/create-request.component";
import { ApplicantService } from "../../applicant/applicant.service";

@Component({
  selector: "app-search-applicant-card",
  templateUrl: "./search-applicant-card.component.html",
  styleUrls: ["./search-applicant-card.component.scss"],
})
export class SearchApplicantCardComponent implements OnInit {
  applicant = null;
  ids: Array<any> = [];
  jobStatus = JOB_PORTAL_TYPE;
  @Output() openJobOfferPopup = new EventEmitter<any>();
  @Output() updateCount = new EventEmitter<any>();
  @Output() changeStatus = new EventEmitter<any>();
  @Output() routeToDetails = new EventEmitter<any>();
  @Output() invitePopup = new EventEmitter<any>();
  @Input() hideActions: boolean = false;
  @Output() addRemove = new EventEmitter<boolean>();
  @Input() set applicantSet(data) {
    // console.log(data);
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

  pauseCancelEnum = JOB_CANCEL_PAUSE;

  isChecked() {
    return this.ids.indexOf(this.applicant._id) != -1;
  }

  // @Input() set selected(data) {
  //   this.checked = data;
  // }
  constructor(
    private appplicantService: ApplicantService,
    private router: Router,
    private utility:UtilityService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  async changeStatusEmit(status: CANDIDATE_STATUS) {
    this.changeStatus.emit({
      ids: [this.applicant._id],
      status,
      previousState: this.candidateStatus.APPLIED,
      jobId: this.jobDetails._id,
    });
  }

  handleCheckbox(event: MatCheckboxChange) {
    this.addRemove.emit(event.checked);
  }

  viewApplicantDetails() {
    this.routeToDetails.emit({
      applicantId: this.applicant._id,
    });
  }

  emitInvitePopupEvent() {
    this.invitePopup.emit({});
  }
  downloadResume() {
    console.log(this.applicant)
    if (this.applicant?.resume) {
      window.open(this.applicant?.resume);
    } else {
      this.utility.showAlert("Resume not available.");
    }
  }

  reportCandidate() {
    const dialogRef = this.dialog.open(CreateRequestComponent, {
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      data: { applicant: this.applicant },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // this.refreshList.emit(true);
      }
    });
  }
}
