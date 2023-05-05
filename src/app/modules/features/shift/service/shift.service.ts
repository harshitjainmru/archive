import { Injectable } from '@angular/core';
import { SHIFT_API_GROUP } from 'src/app/constants/urls';
import { HttpService } from '../../../../services/http.service';

@Injectable()
export class ShiftService {
  constructor(
    private _http: HttpService,
  ) { }

  createShift(body: any) {
    return this._http.post(SHIFT_API_GROUP.SHIFT, body, { showLoader: true }).toPromise();
  }

  updateShift(body: any) {
    return this._http.put(SHIFT_API_GROUP.SHIFT, body, { showLoader: true }).toPromise();
  }

  deleteShift(query: any) {
    return this._http.deleteWithQuery(SHIFT_API_GROUP.SHIFT, query, { showLoader: true }).toPromise();
  }

  shiftLists(body: any) {
    return this._http.get(SHIFT_API_GROUP.SHIFT_LISTING, body, { showLoader: true }).toPromise();
  }

  shiftAction(body: any) {
    return this._http.patch(SHIFT_API_GROUP.SHIFT_STATUS, body, { showLoader: true }).toPromise();
  }

}
