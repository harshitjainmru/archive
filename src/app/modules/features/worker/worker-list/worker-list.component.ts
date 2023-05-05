import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/constants/pagination';
import { WorkerService } from '../service/worker.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.scss']
})
export class WorkerListComponent extends Pagination implements OnInit {
  workerList: Array<any> = null;
  filterData = {};
  constructor(private workerService: WorkerService) {
    super();
  }

  ngOnInit(): void {
    // this.getWorkerLists()
  }

  getWorkerLists() {
    this.workerService.workerLists({ ...this.validPageOptions, ...this.filterData }).then(({ data: { result, page, limit, total } }) => {
      this.workerList = result;
      this.page = page;
      this.limit = limit;
      this.total = total;
    })
  }

  onPageHandler(data) {
    this.pageOptionsOnChange = data;
    this.getWorkerLists();
  }

  getFilterData(data) {
    if (data) {
      this.filterData = data;
      this.getWorkerLists()
    } else {
      this.workerList = null;
      this.resetPages();
    }
  }
}
