import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JOB_TYPE } from 'src/app/constants/enums';
import { COMMON_MESSAGES, POPUP_MESSAGES } from 'src/app/constants/messages';
import { IPopupData } from 'src/app/models/popup';
import { UtilityService } from 'src/app/services/utility.service';
import { JobListService } from '../../job-list/job-list.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {
  @Input() jobDetail;
  jobType = JOB_TYPE;

  constructor(
    private utility: UtilityService,
    private jobListService: JobListService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  editJobDetail(event) {
    const { _id = '' } = this.jobDetail;
    event.stopPropagation();
    this.router.navigate([`job/edit/${_id}`]);
  }

  deleteJob(event) {
    const { _id: jobId = '', title: jobTitle = '' } = this.jobDetail;
    event.stopPropagation();
    event.preventDefault();
    const msg = COMMON_MESSAGES.DELETED.confirm(jobTitle || '')
    const dialogData: IPopupData = {
      message: msg,
      hideConfirmButton: true,
      cancelButtonText: POPUP_MESSAGES.no,
      confirmButtonText: POPUP_MESSAGES.yes,
    };
    this.utility.openDialog(dialogData).subscribe((canBlock) => {
      if (!!canBlock) {
        this.jobListService.deleteJobRequest({ jobId: [jobId] }).then((data) => {
          this.utility.showAlert(data.message);
          this.router.navigate([`job/list`]);
        });
      }
    })
  }

  onCopyJob(jobId) {
    this.jobListService.copyJob(jobId).then(resp => {
      this.utility.showAlert(resp.message);
    })
  }

}
