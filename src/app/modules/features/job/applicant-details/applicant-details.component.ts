import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DAY_NAME } from 'src/app/constants/constant';
import { MatDialog } from '@angular/material/dialog';
import { ProfileShortlistedComponent } from '../popups/profile-shortlisted/profile-shortlisted.component';
import { ScheduleInterviewComponent } from '../popups/schedule-interview/schedule-interview.component';
import { TimeOverlapPopupComponent } from '../popups/time-overlap-popup/time-overlap-popup.component';
import { WorkerService } from '../../worker/service/worker.service';
import { JobListService } from '../job-list/job-list.service';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit {
  jobId;
  userId;
  cApplicant
  days = DAY_NAME
  dayShow = false;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private jobListService: JobListService,
    private router: Router,
  ) {
    this.jobId = this.route.snapshot.paramMap.get('jobId');
    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  ngOnInit(): void {
    this.userId && this.jobId && this.getApplicantDetail();
  }

  getApplicantDetail() {
    this.jobListService.getApplicantDetail({ userId: this.userId, jobId: this.jobId }).then(({ data }) => {
      this.cApplicant = data
      this.checkActiveDays()
    })
  }

  checkActiveDays() {
    DAY_NAME.forEach(element => {
      if (this.cApplicant.locationAndTimeSlot.slots && this.cApplicant.locationAndTimeSlot.slots[element]) {
        this.dayShow = true;
      }
    });
  }

  checkActiveDay(day) {
    const flag = (this.cApplicant && this.cApplicant.locationAndTimeSlot &&
      this.cApplicant.locationAndTimeSlot.slots && this.cApplicant.locationAndTimeSlot.slots[day]) ? true : false
    return flag;
  }

  getDayKey(day) {
    return day
  }

  getDayValue(day) {
    const value = ( this.cApplicant && this.cApplicant.locationAndTimeSlot &&
      this.cApplicant.locationAndTimeSlot.slots && this.cApplicant.locationAndTimeSlot.slots[day])?
    this.cApplicant.locationAndTimeSlot.slots[day] : 'NA'
    return value;
  }

  jobApplicant() {
    this.router.navigate([`job/applicant-list/${this.jobId}`]);
  }

  openprofileshortlist(): void {
    const dialogRef = this.dialog.open(ProfileShortlistedComponent, {
      width: '400px',
    });
  }

  openscheduleinterview(): void {
    const dialogRef = this.dialog.open(ScheduleInterviewComponent, {
      width: '400px',
    });
  }

  opentimeoverlap(): void {
    const dialogRef = this.dialog.open(TimeOverlapPopupComponent, {
      width: '400px',
    });
  }
  

}
