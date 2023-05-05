import { Injectable } from '@angular/core';
import { ACCOUNT_API_GROUP, WORKER_API_GROUP } from 'src/app/constants/urls';
import { HttpService } from 'src/app/services/http.service';
import { ISkill } from '../worker.model';

@Injectable()

export class WorkerService {
  skillData: Array<ISkill> = [];
  constantsData: Array<any> = [];
  constructor(
    private httpService: HttpService,
  ) {
    this.skillLists();
    this.constantsLists();
  }

  workerLists(query) {
    return this.httpService.get(WORKER_API_GROUP.WORKER_LISTING, query, { showLoader: true }).toPromise();
  }

  workerDetails(workerId: string) {
    return this.httpService.get(`${WORKER_API_GROUP.WORKER_DETAILS}/${workerId}`, {}, { showLoader: true }).toPromise();
  }

  async skillLists(query = {}) {
    if (this.skillData.length) {
      return this.skillData;
    } else {
      const { data } = await this.httpService.get(ACCOUNT_API_GROUP.DROPDWON_SKILL, query).toPromise();
      this.skillData = data;
      return this.skillData;
    }
  }

  async constantsLists(query = {}) {
    if (this.constantsData.length) {
      return this.constantsData;
    } else {
      const { data } = await this.httpService.get(ACCOUNT_API_GROUP.DROPDWON_COMMON, query).toPromise();
      this.constantsData = data;
      return this.constantsData;
    }
  }
}
