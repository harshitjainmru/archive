import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { COMMON_MESSAGES, POPUP_MESSAGES } from "src/app/constants/messages";
import { IPopupData } from "src/app/models/popup";
import { UtilityService } from "src/app/services/utility.service";
import { JobListService } from "../job-list/job-list.service";
import { JobItem } from "src/app/models/jobs.interface";
import {
  DATE_FORMATS,
  JOB_PORTAL_TYPE,
  JOB_STATUS,
} from "src/app/constants/constant";
import {
  APPLICANT_LIST,
  JOB_ADD,
  JOB_EDIT,
  SEARCH_APPLICANT_LIST,
} from "src/app/constants/routes";
import { MatDialog } from "@angular/material/dialog";
import { ShiftPopupComponent } from "../job-list/shift-popup/shift-popup.component";
import { TranslateService } from "src/app/services/translate.service";
import { JOB_CANCEL_PAUSE, CONFIRM_MODAL_TYPE, JOB_STEP_NUMBER } from "src/app/constants/enums";
import * as moment from "moment";

@Component({
  selector: "app-job-card",
  templateUrl: "./job-card.component.html",
  styleUrls: ["./job-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCardComponent implements OnInit {
  jobStatus = JOB_STATUS;
  @Input() currentJob: any;
  @Input() copyJobStatus: any;
  dFormat = DATE_FORMATS;
  @Output() deletJobEvent = new EventEmitter();
  @Output() copyJobEvent: EventEmitter<any> = new EventEmitter<any>();

  pauseCanelEnum = JOB_CANCEL_PAUSE;
  jobStep=JOB_STEP_NUMBER
  today:Date=new Date(Date.now())
  enablePublishbtn:boolean=false;
  listItemToggle:boolean=false;
  jobSites:Array<any>=[]

  // @Input() JobType;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private utility: UtilityService,
    private jobListService: JobListService
  ) {
    
  }

  ngOnInit(): void {
    this.enablePublishBtn()
    this.jobSites=this.currentJob?.jobSite?.slice(0,2)||[];
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

  deleteJob(deleteId: any) {
    const { _id: jobId = "", title: jobTitle = "" } = this.currentJob;
    const msg = COMMON_MESSAGES.DELETED.confirm("job");
    const dialogData: IPopupData = {
      message: msg,
      hideConfirmButton: true,
      cancelButtonText: POPUP_MESSAGES.no,
      confirmButtonText: POPUP_MESSAGES.yes,
    };
    this.utility.openDialog(dialogData).subscribe((canBlock) => {
      if (!!canBlock) {
        this.jobListService.deleteJobRequest({ id: jobId }).then((data) => {
          this.utility.showAlert(data.message);
          this.deletJobEvent.emit(true);
        });
      }
    });
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
        this.copyJobEvent.emit(true);
        this.utility.setJobCopy({ jobCopyId: jobId, isCopyJob: true });
        setTimeout(() => {
          this.router.navigate([JOB_ADD.fullUrl]);
        }, 0);
      }
    });
  }

  openShiftPopup(shiftdata) {
    this.dialog.open(ShiftPopupComponent, {
      autoFocus: false,
      data: { timeslots: shiftdata, baseSalary: this.currentJob?.baseSalary },
    });
  }

  jobApplicant(jobId) {
    this.router.navigate([APPLICANT_LIST.fullUrl(jobId)]);
  }

  goTojobDetail(jobId) {
    this.router.navigate([`job/details/${jobId}`]);
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
            this.deletJobEvent.emit(true);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  searchCandidate(jobId) {
    this.router.navigate([SEARCH_APPLICANT_LIST.fullUrl(jobId)]);
  }

  // editJobDetail(jobId) {
  //   this.router.navigate([`job/edit/${jobId}`]);
  // }

  editJobDetail() {
    if (
      this.currentJob.timeline &&
      new Date(this.currentJob.timeline?.startDate) <= new Date() &&
      this.currentJob?.jobStatus !== this.jobStatus?.DRAFT
    ) {
      this.utility.showAlert(
        "Cannot edit this job as it has already started.",
        5000
      );
      return;
    }
    const { _id = "" } = this.currentJob;
    // event.stopPropagation();
    this.router.navigate([JOB_EDIT.fullUrl, _id]);
  }


  
  /**
   * directed to job preview
   * @returns 
   */
  publishJob(){
    // console.log(this.currentJob)
    if(this.enablePublishBtn){
      const { _id  } = this.currentJob;
      this.router.navigate([JOB_EDIT.fullUrl, _id],{queryParams:{currentTabIndex:4}});
    }
  }

  enablePublishBtn(){
    
    // console.log(this.currentJob)
    if(this.currentJob?.jobStep==this.jobStep.STEP_3 
      && moment().isBefore(this.currentJob?.timeline?.startDate)
      ){
        // console.log(moment().isBefore(this.currentJob?.timeline?.startDate))
        this.enablePublishbtn=true
      }
  }

  toggleList(){
    
    this.listItemToggle=!this.listItemToggle;
    this.jobSites=this.listItemToggle?[...this.currentJob?.jobSite]:this.currentJob?.jobSite.slice(0,2);
    console.log("list event");
  }
}
