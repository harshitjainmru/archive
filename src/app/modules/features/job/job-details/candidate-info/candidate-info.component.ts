import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobListService } from '../../job-list/job-list.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.scss']
})
export class CandidateInfoComponent implements OnInit {
  workerData: Array<any> = null;
  jobId;
  candidateList = [];
  limit;
  total;
  showCheckbox = false
  @Input() currentApplicant;
  @Input() activeTab;
  constructor(
    private route: ActivatedRoute,
    private jobListService: JobListService,
    private _utility: UtilityService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('jobId');
    this.actionHandling();
  }

  actionHandling() {
    this.jobListService.applicantActionEvent.subscribe(res => {
      this.showCheckbox = true;
      if (this.currentApplicant) {
        if (res === 'all') {
          this.currentApplicant.checked = true;
          // this.onSelectCandidate(true, this.currentApplicant['_id'])
        } else {
          this.currentApplicant.checked = false;
        }
      }
    })
  }

  fetchCandidateListing() {
    this.jobListService.getCandidateListing({ page: 1, limit: 10, jobId: this.jobId }).then(res => {
      const { data } = res;
      const { userData } = data;
      this.candidateList = userData['result'];
      this.limit = userData['limit'];
      this.total = userData['total'];
    })
  }

  bulkActionPerform(aId, steps) {
    const payload = { steps, jobId: this.jobId, applicantIds: [aId] }
    this.jobListService.applicantActionRequest(payload).then(res => {
      this._utility.showAlert(res.message);
      this.jobListService.applicantChageEvent.emit(true)
    })
  }

  viewCandidateDetail(jobId, uId) {
    this.router.navigate([`job/application-details/${jobId}/${uId}`]);
  }

  onSelectCandidate(checked, uId) {
    this.jobListService.selectCandidateEvent.emit({ checked, uId })
  }

}
